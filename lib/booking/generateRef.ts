/**
 * Generates a human-readable booking reference.
 * Format: PB-YYMMDD-XXXX  e.g. PB-260224-0042
 */
export function generateBookingRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `PB-${yy}${mm}${dd}-${rand}`;
}
