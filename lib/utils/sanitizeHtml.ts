/**
 * Lightweight server-side HTML sanitiser.
 *
 * Strips the most common XSS vectors from admin-authored HTML before it is
 * rendered with dangerouslySetInnerHTML. This is not a general-purpose
 * sanitiser — it is intentionally minimal for content that originates from
 * our own CMS/database, not from untrusted end-user input.
 *
 * Removed:
 *   - <script>…</script> blocks (and bare/self-closing <script> tags)
 *   - <style>…</style> blocks
 *   - Dangerous embeds: <iframe>, <object>, <embed>, <form>, <base>
 *   - Inline event handlers  (on* attributes)
 *   - javascript: pseudo-protocol in href / src / action / data attributes
 */
export function sanitizeHtml(html: string): string {
  return html
    // <script> with content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    // bare or self-closing <script>
    .replace(/<script\b[^>]*\/?>/gi, "")
    // <style> blocks
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    // dangerous embeds with content
    .replace(/<(iframe|object|embed|form|base)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    // self-closing / void dangerous embeds
    .replace(/<(iframe|object|embed|form|base)\b[^>]*\/?>/gi, "")
    // quoted on* event attributes  (onclick="…", onload='…')
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, "")
    // unquoted on* event attributes (onerror=alert(1))
    .replace(/\bon\w+\s*=\s*[^\s>]+/gi, "")
    // javascript: in quoted attribute values
    .replace(/(href|src|action|data)\s*=\s*["']\s*javascript:[^"']*["']/gi, '$1=""')
    // javascript: in unquoted attribute values
    .replace(/(href|src|action|data)\s*=\s*javascript:[^\s>]*/gi, '$1=""');
}
