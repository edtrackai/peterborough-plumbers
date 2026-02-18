/**
 * WhatsApp Cloud API client.
 * Sends text messages via the Meta Graph API.
 */

const API_VERSION = process.env.WHATSAPP_API_VERSION || "v20.0";

function getConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    throw new Error("Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID");
  }

  return { accessToken, phoneNumberId };
}

export async function sendText(to: string, text: string): Promise<boolean> {
  const { accessToken, phoneNumberId } = getConfig();
  const url = `https://graph.facebook.com/${API_VERSION}/${phoneNumberId}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[WhatsApp] Send failed (${res.status}):`, body);
      return false;
    }

    if (process.env.WHATSAPP_DEBUG === "true") {
      console.log(`[WhatsApp] Message sent to ${to}`);
    }

    return true;
  } catch (err) {
    console.error("[WhatsApp] Send error:", err instanceof Error ? err.message : err);
    return false;
  }
}
