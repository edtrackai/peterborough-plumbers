import { redirect } from "next/navigation";

/**
 * /book is decommissioned — all bookings now start via the WhatsApp modal.
 * Permanent redirect keeps any existing links/bookmarks working.
 */
export default function BookPage() {
  redirect("/contact");
}
