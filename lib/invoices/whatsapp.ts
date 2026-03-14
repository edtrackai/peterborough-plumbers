import { getSiteSettings } from "@/lib/db/content";

function formatGBP(n: number): string {
  return n.toFixed(2);
}

function groupLines(
  lineItems: { description: string; lineTotal: number; lineType: string }[],
) {
  const labour    = lineItems.filter(l => l.lineType === "labour");
  const materials = lineItems.filter(l => l.lineType === "materials");
  const callout   = lineItems.filter(l => l.lineType === "callout");
  const surcharge = lineItems.filter(l => l.lineType === "surcharge");
  const variation = lineItems.filter(l => l.lineType === "variation");
  const discount  = lineItems.filter(l => l.lineType === "discount");
  return [...labour, ...materials, ...callout, ...surcharge, ...variation, ...discount];
}

export async function buildInvoiceWhatsApp(params: {
  invoiceNumber: string;
  estimateRef:   string | null;
  jobSummary:    string;
  plumberName:   string | null;
  completedDate: Date;
  lineItems:     { description: string; lineTotal: number; lineType: string }[];
  subtotal:      number;
  vatRate:       number;
  vatAmount:     number;
  total:         number;
  dueDate:       Date;
}): Promise<string> {
  const s      = await getSiteSettings();
  const sorted = groupLines(params.lineItems);

  const lineStr = sorted
    .map(l => `${l.description.padEnd(22).slice(0, 22)} £${formatGBP(l.lineTotal)}`)
    .join("\n");

  const dateStr = params.completedDate.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
  const dueStr = params.dueDate.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const parts = [
    `Invoice: ${params.invoiceNumber}`,
    params.estimateRef ? `Ref: ${params.estimateRef} (your estimate)` : null,
    ``,
    `Job: ${params.jobSummary}`,
    params.plumberName ? `Engineer: ${params.plumberName}` : null,
    `Date completed: ${dateStr}`,
    ``,
    lineStr,
    `─────────────────────────`,
    `Subtotal:      £${formatGBP(params.subtotal)}`,
    params.vatRate > 0 ? `VAT (${params.vatRate}%):    £${formatGBP(params.vatAmount)}` : null,
    `TOTAL DUE:     £${formatGBP(params.total)}`,
    ``,
    `Payment due by: ${dueStr}`,
    ``,
    `Pay by bank transfer:`,
    `Sort code: ${s.bankSortCode}`,
    `Account: ${s.bankAccountNumber}`,
    `Name: ${s.bankAccountName}`,
    `Ref: ${params.invoiceNumber}`,
    ``,
    `Or pay cash to your engineer.`,
    ``,
    `Questions? Call ${s.phone}`,
    `— ${s.companyName}`,
  ].filter((l): l is string => l !== null).join("\n");

  return parts;
}

export async function buildReceiptWhatsApp(params: {
  invoiceNumber: string;
  total:         number;
  paidAt:        Date;
}): Promise<string> {
  const s      = await getSiteSettings();
  const paidStr = params.paidAt.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return [
    `✅ Payment received — thank you!`,
    ``,
    `Invoice ${params.invoiceNumber} is now marked as paid.`,
    `Amount: £${formatGBP(params.total)}`,
    `Paid:   ${paidStr}`,
    ``,
    `If you need a copy of this receipt, just reply "receipt".`,
    ``,
    `— ${s.companyName}`,
  ].join("\n");
}

export async function buildOverdueWhatsApp(params: {
  invoiceNumber: string;
  total:         number;
  dueDate:       Date;
}): Promise<string> {
  const s      = await getSiteSettings();
  const dueStr = params.dueDate.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return [
    `Hi, this is a friendly reminder that invoice ${params.invoiceNumber}`,
    `for £${formatGBP(params.total)} was due on ${dueStr}.`,
    ``,
    `Please arrange payment at your earliest convenience:`,
    `Sort code: ${s.bankSortCode}`,
    `Account: ${s.bankAccountNumber}`,
    `Name: ${s.bankAccountName}`,
    `Ref: ${params.invoiceNumber}`,
    ``,
    `If you've already paid, please ignore this or reply "paid".`,
    ``,
    `Questions? Call ${s.phone}`,
    `— ${s.companyName}`,
  ].join("\n");
}
