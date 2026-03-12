/**
 * Generates human-readable references for quotes, variations, revisits.
 * Format: Q-YYMMDD-XXXX  /  V-YYMMDD-XXXX  /  R-YYMMDD-XXXX
 */
function datePart(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

function rand(): string {
  return String(Math.floor(Math.random() * 9000) + 1000);
}

export function generateQuoteRef(): string {
  return `Q-${datePart()}-${rand()}`;
}

export function generateVariationRef(): string {
  return `V-${datePart()}-${rand()}`;
}

export function generateRevisitRef(): string {
  return `R-${datePart()}-${rand()}`;
}
