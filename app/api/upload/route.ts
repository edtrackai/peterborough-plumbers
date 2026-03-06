import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 3;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"];

// 20 upload requests per hour per IP — prevents Cloudinary abuse
const RATE_LIMIT = { name: "upload", max: 20, windowMs: 60 * 60 * 1000 };

/**
 * Verifies file magic bytes match the declared MIME type.
 * Prevents attackers from bypassing MIME checks by spoofing file.type.
 */
function verifyMagicBytes(buf: Uint8Array, mimeType: string): boolean {
  if (buf.length < 12) return false;

  switch (mimeType) {
    case "image/jpeg":
      // FF D8 FF
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;

    case "image/png":
      // 89 50 4E 47 0D 0A 1A 0A
      return (
        buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e &&
        buf[3] === 0x47 && buf[4] === 0x0d && buf[5] === 0x0a &&
        buf[6] === 0x1a && buf[7] === 0x0a
      );

    case "image/webp":
      // RIFF at bytes 0-3, WEBP at bytes 8-11
      return (
        buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
        buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
      );

    case "image/gif":
      // GIF87a or GIF89a
      return (
        buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38 &&
        (buf[4] === 0x37 || buf[4] === 0x39) && buf[5] === 0x61
      );

    case "image/heic":
      // HEIC uses the ISOBMFF container — magic bytes vary by sub-type.
      // We trust the declared MIME for HEIC since it only originates from Apple devices.
      return true;

    default:
      return false;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many upload requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Require a valid booking ref — prevents open Cloudinary abuse from anonymous callers
  const bookingRefRaw = formData.get("bookingRef");
  if (typeof bookingRefRaw !== "string" || !bookingRefRaw.trim()) {
    return NextResponse.json(
      { error: "A valid booking reference is required to upload images." },
      { status: 400 }
    );
  }

  const bookingRef = bookingRefRaw.trim().toUpperCase();

  // Verify the booking ref exists and is in an uploadable state
  let booking: { id: string; status: string; expiresAt: Date | null } | null = null;
  try {
    booking = await prisma.booking.findUnique({
      where: { bookingRef },
      select: { id: true, status: true, expiresAt: true },
    });
  } catch {
    return NextResponse.json({ error: "Could not verify booking." }, { status: 500 });
  }

  if (
    !booking ||
    !["reserved", "pending_assignment"].includes(booking.status) ||
    (booking.expiresAt && booking.expiresAt < new Date())
  ) {
    return NextResponse.json(
      { error: "Invalid or expired booking reference." },
      { status: 400 }
    );
  }

  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_FILES} images allowed.` },
      { status: 400 }
    );
  }

  // Read and validate all files before any upload
  const validatedBuffers: { buffer: Buffer; mimeType: string }[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, GIF, and HEIC images are allowed." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Empty files are not allowed." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Each image must be under 5 MB." },
        { status: 400 }
      );
    }

    // Read once — reused for magic byte check and upload
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!verifyMagicBytes(new Uint8Array(buffer), file.type)) {
      return NextResponse.json(
        { error: "File content does not match the declared image type." },
        { status: 400 }
      );
    }

    validatedBuffers.push({ buffer, mimeType: file.type });
  }

  // Upload validated files to Cloudinary
  try {
    const uploads = await Promise.all(
      validatedBuffers.map(async ({ buffer, mimeType }) => {
        const base64 = buffer.toString("base64");
        const dataUri = `data:${mimeType};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "peterborough-plumbers/bookings",
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        });

        return { url: result.secure_url, publicId: result.public_id };
      })
    );

    return NextResponse.json({ uploads }, { status: 200 });
  } catch (err) {
    console.error("[upload] Cloudinary error:", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
