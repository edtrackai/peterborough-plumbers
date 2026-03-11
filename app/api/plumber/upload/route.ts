import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
// Images for photos/selfies, PDFs for certificates and insurance docs
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
];

// 10 uploads per hour per IP (no auth required — pre-signup)
const RATE_LIMIT = { name: "plumber-upload", max: 10, windowMs: 60 * 60 * 1000 };

function verifyMagicBytes(buf: Uint8Array, mimeType: string): boolean {
  if (buf.length < 8) return false;

  switch (mimeType) {
    case "image/jpeg":
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;

    case "image/png":
      return (
        buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e &&
        buf[3] === 0x47 && buf[4] === 0x0d && buf[5] === 0x0a &&
        buf[6] === 0x1a && buf[7] === 0x0a
      );

    case "image/webp":
      return (
        buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
        buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
      );

    case "image/heic":
      // HEIC/HEIF container — magic bytes vary. Trust Apple-origin declaration.
      return true;

    case "application/pdf":
      // %PDF = 0x25 0x50 0x44 0x46
      return buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;

    default:
      return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many uploads. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum 5 MB." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPEG, PNG, WebP, HEIC, PDF." },
      { status: 400 }
    );
  }

  const buf = new Uint8Array(await file.arrayBuffer());

  if (!verifyMagicBytes(buf, file.type)) {
    return NextResponse.json({ error: "File content does not match declared type." }, { status: 400 });
  }

  try {
    const b64 = Buffer.from(buf).toString("base64");
    const dataUri = `data:${file.type};base64,${b64}`;

    // resource_type "auto" handles both images and PDFs
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "peterborough-plumbers/plumbers",
      resource_type: "auto",
      quality: "auto",
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error("[plumber/upload]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
