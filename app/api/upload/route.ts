import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 3;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} images allowed` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Only images are allowed.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `"${file.name}" exceeds 5 MB limit` },
          { status: 400 }
        );
      }
    }

    // Upload all files to Cloudinary
    const uploads = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "peterborough-plumbers/bookings",
          resource_type: "image",
          // Auto-quality and format for smaller file sizes
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        });

        return { url: result.secure_url, publicId: result.public_id };
      })
    );

    return NextResponse.json({ uploads }, { status: 200 });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
