import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 3;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"];

const RATE_LIMIT = { name: "upload", max: 20, windowMs: 60 * 60 * 1000 };

function verifyMagicBytes(buf: Uint8Array, mimeType: string): boolean {
  if (buf.length < 12) return false;

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

    case "image/gif":
      return (
        buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38 &&
        (buf[4] === 0x37 || buf[4] === 0x39) && buf[5] === 0x61
      );

    case "image/heic":
      return true;

    default:
      return false;
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Upload service not configured." }, { status: 503 });
  }

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

  const bookingRefRaw = formData.get("bookingRef");
  if (typeof bookingRefRaw !== "string" || !bookingRefRaw.trim()) {
    return NextResponse.json(
      { error: "A valid booking reference is required to upload images." },
      { status: 400 }
    );
  }

  const bookingRef = bookingRefRaw.trim().toUpperCase();

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

  const validatedBuffers: { buffer: Buffer; mimeType: string; name: string }[] = [];

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

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!verifyMagicBytes(new Uint8Array(buffer), file.type)) {
      return NextResponse.json(
        { error: "File content does not match the declared image type." },
        { status: 400 }
      );
    }

    validatedBuffers.push({ buffer, mimeType: file.type, name: file.name });
  }

  try {
    const uploads = await Promise.all(
      validatedBuffers.map(async ({ buffer, mimeType, name }) => {
        const ext = name.split(".").pop() ?? "jpg";
        const filename = `bookings/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const blob = await put(filename, buffer, {
          access: "private",
          contentType: mimeType,
        });

        return { url: blob.url, publicId: blob.pathname };
      })
    );

    return NextResponse.json({ uploads }, { status: 200 });
  } catch (err) {
    console.error("[upload] Blob error:", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
