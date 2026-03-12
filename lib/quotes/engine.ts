/**
 * Config-driven quote calculation engine.
 * Pure function — no DB calls inside. Caller loads rules + config and passes them in.
 */
import type { PricingRule } from "@prisma/client";

export interface QuoteInput {
  serviceItemId:      string;
  serviceItemName:    string;
  quantity:           number;
  urgencyKey:         string;   // e.g. "standard", "same_day", "emergency"
  requestedAt:        Date;
  customerSupplied:   boolean;
  quoteType:          "fixed" | "estimate" | "inspection_first";
  accessDifficulty?:  "easy" | "moderate" | "difficult";
}

export interface LineItem {
  description: string;
  quantity:    number;
  unitPrice:   number;
  lineTotal:   number;
  lineType:    "labour" | "materials" | "callout" | "surcharge" | "discount" | "inspection";
  isOptional:  boolean;
  sortOrder:   number;
}

export interface QuoteOutput {
  lineItems:        LineItem[];
  subtotal:         number;
  calloutFee:       number;
  urgencySurcharge: number;
  vatAmount:        number;
  total:            number;
  isEstimate:       boolean;
  validUntilHours:  number;
}

type RuleCondition = {
  dayOfWeek?:  number[];   // 0=Sun, 6=Sat
  afterHour?:  number;
  beforeHour?: number;
  urgencyKey?: string[];
  minQuantity?: number;
};

function evaluateCondition(conditions: unknown, ctx: { requestedAt: Date; urgencyKey: string; quantity: number }): boolean {
  if (!conditions || typeof conditions !== "object") return true;
  const c = conditions as RuleCondition;

  if (c.dayOfWeek !== undefined) {
    const day = ctx.requestedAt.getDay();
    if (!c.dayOfWeek.includes(day)) return false;
  }
  if (c.afterHour !== undefined) {
    if (ctx.requestedAt.getHours() < c.afterHour) return false;
  }
  if (c.beforeHour !== undefined) {
    if (ctx.requestedAt.getHours() >= c.beforeHour) return false;
  }
  if (c.urgencyKey !== undefined) {
    if (!c.urgencyKey.includes(ctx.urgencyKey)) return false;
  }
  if (c.minQuantity !== undefined) {
    if (ctx.quantity < c.minQuantity) return false;
  }
  return true;
}

function toNum(v: unknown): number {
  if (v === null || v === undefined) return 0;
  return parseFloat(String(v)) || 0;
}

export function calculateQuote(
  input: QuoteInput,
  rules: PricingRule[],
  validHours: number,
  vatRate: number,
): QuoteOutput {
  const ctx = { requestedAt: input.requestedAt, urgencyKey: input.urgencyKey, quantity: input.quantity };
  const lineItems: LineItem[] = [];
  let baseLabour = 0;
  let baseMaterials = 0;
  let calloutFee = 0;
  let multiplier = 1;
  let eveningSurcharge = 0;
  let weekendSurcharge = 0;
  let customerDiscount = 0;
  let minJobValue = 0;
  let sortIdx = 0;

  // Sort rules by sortOrder
  const sorted = [...rules].sort((a, b) => a.sortOrder - b.sortOrder);

  for (const rule of sorted) {
    if (!rule.isActive) continue;
    if (!evaluateCondition(rule.conditions, ctx)) continue;

    const val = toNum(rule.value);

    switch (rule.ruleType) {
      case "base_labour":
        baseLabour = val * input.quantity;
        lineItems.push({
          description: `Labour — ${input.serviceItemName}${input.quantity > 1 ? ` ×${input.quantity}` : ""}`,
          quantity:    input.quantity,
          unitPrice:   val,
          lineTotal:   baseLabour,
          lineType:    "labour",
          isOptional:  false,
          sortOrder:   sortIdx++,
        });
        break;

      case "base_materials":
        baseMaterials = val * input.quantity;
        lineItems.push({
          description: `Parts & materials`,
          quantity:    input.quantity,
          unitPrice:   val,
          lineTotal:   baseMaterials,
          lineType:    "materials",
          isOptional:  false,
          sortOrder:   sortIdx++,
        });
        break;

      case "callout_fee":
        calloutFee = val;
        lineItems.push({
          description: rule.label,
          quantity:    1,
          unitPrice:   val,
          lineTotal:   val,
          lineType:    "callout",
          isOptional:  false,
          sortOrder:   sortIdx++,
        });
        break;

      case "urgency_multiplier":
        multiplier = val; // applied after base
        break;

      case "evening_surcharge":
        eveningSurcharge = val;
        lineItems.push({
          description: rule.label,
          quantity:    1,
          unitPrice:   val,
          lineTotal:   val,
          lineType:    "surcharge",
          isOptional:  false,
          sortOrder:   sortIdx++,
        });
        break;

      case "weekend_surcharge":
        weekendSurcharge = val;
        lineItems.push({
          description: rule.label,
          quantity:    1,
          unitPrice:   val,
          lineTotal:   val,
          lineType:    "surcharge",
          isOptional:  false,
          sortOrder:   sortIdx++,
        });
        break;

      case "customer_supplied_discount":
        if (input.customerSupplied) {
          customerDiscount = val;
          lineItems.push({
            description: "Customer-supplied parts (discount)",
            quantity:    1,
            unitPrice:   -val,
            lineTotal:   -val,
            lineType:    "discount",
            isOptional:  false,
            sortOrder:   sortIdx++,
          });
        }
        break;

      case "inspection_fee":
        if (input.quoteType === "inspection_first") {
          lineItems.push({
            description: rule.label,
            quantity:    1,
            unitPrice:   val,
            lineTotal:   val,
            lineType:    "inspection",
            isOptional:  false,
            sortOrder:   sortIdx++,
          });
        }
        break;

      case "min_job_value":
        minJobValue = val;
        break;
    }
  }

  // Apply urgency multiplier to base labour + materials only
  if (multiplier !== 1 && multiplier > 0) {
    const base = baseLabour + baseMaterials;
    const surchargeAmt = parseFloat(((base * multiplier) - base).toFixed(2));
    if (surchargeAmt > 0) {
      lineItems.push({
        description: `Urgency surcharge (×${multiplier})`,
        quantity:    1,
        unitPrice:   surchargeAmt,
        lineTotal:   surchargeAmt,
        lineType:    "surcharge",
        isOptional:  false,
        sortOrder:   sortIdx++,
      });
    }
    const urgencySurcharge = surchargeAmt;
    const subtotal = lineItems.reduce((s, l) => s + l.lineTotal, 0);
    const enforced = Math.max(subtotal, minJobValue);
    const vatAmount = parseFloat((enforced * (vatRate / 100)).toFixed(2));
    return {
      lineItems,
      subtotal: enforced,
      calloutFee,
      urgencySurcharge,
      vatAmount,
      total: parseFloat((enforced + vatAmount).toFixed(2)),
      isEstimate: input.quoteType === "estimate",
      validUntilHours: validHours,
    };
  }

  const urgencySurcharge = 0;
  let subtotal = lineItems.reduce((s, l) => s + l.lineTotal, 0);
  subtotal = Math.max(subtotal, minJobValue);
  const vatAmount = parseFloat((subtotal * (vatRate / 100)).toFixed(2));

  return {
    lineItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    calloutFee,
    urgencySurcharge,
    vatAmount,
    total: parseFloat((subtotal + vatAmount).toFixed(2)),
    isEstimate: input.quoteType === "estimate",
    validUntilHours: validHours,
  };
}
