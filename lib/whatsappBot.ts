/**
 * Rule-based WhatsApp bot logic.
 * Returns a reply string for a given inbound text message.
 */
import { siteSettings } from "@/content/settings";

const GREETING_RE = /^(hi|hello|hey|assalam|salam|salaam|as+alam.?alaikum)\b/i;
const PRICING_RE = /^(1|pricing|price|cost|how much|quote)\b/i;
const BOOK_RE = /^(2|book|booking|appointment|visit)\b/i;
const EMERGENCY_RE = /^(3|emergency|urgent|leak|burst|flood|no hot water)\b/i;
const AREAS_RE = /^(4|area|areas|where|location|locations|cover)\b/i;
const HUMAN_RE = /^(human|agent|call|speak|talk|operator|help)\b/i;

const GREETING_REPLY = `Hi! Thanks for messaging Peterborough Plumbers. \u{1f6bf}

Reply with a number:
1\ufe0f\u20e3 Pricing
2\ufe0f\u20e3 Book a visit
3\ufe0f\u20e3 Emergency
4\ufe0f\u20e3 Service areas

Or type "agent" to speak to our team.`;

const PRICING_REPLY = `Our typical rates:
\u2022 Boiler service: from \u00a379
\u2022 Gas safety certificate (CP12): from \u00a365
\u2022 Call-out & first hour: from \u00a385
\u2022 Bathroom installation: quoted on survey

For an accurate quote, please reply with:
\u2022 Your postcode
\u2022 A brief description of the issue

We'll get back to you shortly!`;

const BOOK_REPLY = `Great, let's get you booked in! \u{1f4c5}

Please reply with:
\u2022 Your name
\u2022 Postcode
\u2022 Preferred date & time
\u2022 Brief description of the problem

We'll confirm your appointment ASAP.`;

const EMERGENCY_REPLY = `\u{1f6a8} Emergency Plumber

Please reply with your full address and we'll prioritise your case.

For the fastest response, call us directly:
\u{1f4de} ${siteSettings.phone}

If you smell gas, call the National Gas Emergency line first: 0800 111 999

We aim to respond to emergencies within 1 hour in the Peterborough area.`;

const AREAS_REPLY = `We cover Peterborough and surrounding areas:

\u2022 Orton (Waterville, Goldhay, Southgate)
\u2022 Werrington
\u2022 Hampton (Vale, Hargate, Gardens)
\u2022 Bretton
\u2022 Market Deeping
\u2022 Yaxley
\u2022 Whittlesey
\u2022 Stamford

Not sure if we cover your area? Reply with your postcode and we'll let you know!`;

const HUMAN_REPLY = `I'm connecting you to our team \u{1f44b}

To help us assist you faster, please share:
\u2022 Your postcode
\u2022 A brief description of the issue

A member of our team will respond as soon as possible.`;

const FALLBACK_REPLY = `Thanks for your message! I didn't quite catch that.

Reply with a number:
1\ufe0f\u20e3 Pricing
2\ufe0f\u20e3 Book a visit
3\ufe0f\u20e3 Emergency
4\ufe0f\u20e3 Service areas

Or type "agent" to speak to a human.`;

export function getReply(text: string): string {
  const trimmed = text.trim();

  if (GREETING_RE.test(trimmed)) return GREETING_REPLY;
  if (PRICING_RE.test(trimmed)) return PRICING_REPLY;
  if (BOOK_RE.test(trimmed)) return BOOK_REPLY;
  if (EMERGENCY_RE.test(trimmed)) return EMERGENCY_REPLY;
  if (AREAS_RE.test(trimmed)) return AREAS_REPLY;
  if (HUMAN_RE.test(trimmed)) return HUMAN_REPLY;

  return FALLBACK_REPLY;
}
