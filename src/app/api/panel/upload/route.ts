import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dh6jges3r";
const API_KEY = process.env.CLOUDINARY_API_KEY || "953391144947254";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "sibJ3V6IsIo0EmH9_KxmaovtZOk";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const customName = formData.get("fileName") as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = customName || file.name;
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path.basename(originalName, ext).replace(/[^A-Za-z0-9_-]+/g, "_");
    const finalFileName = `${baseName}${ext}`;

    // 1. Save file locally
    const uploadDir = path.join(process.cwd(), "public/images/aboutusimg");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, finalFileName);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/images/aboutusimg/${finalFileName}`;

    // 2. Upload directly to Cloudinary
    let cloudinaryResult = null;
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const publicId = `healthy-happy-site/images/images/aboutusimg/${baseName}`;

      const paramsToSign: Record<string, string | number> = {
        public_id: publicId,
        timestamp,
      };

      const sortedKeys = Object.keys(paramsToSign).sort();
      const stringToSign = sortedKeys.map((k) => `${k}=${paramsToSign[k]}`).join("&") + API_SECRET;
      const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

      const base64DataUri = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;

      const uploadBody = new URLSearchParams();
      uploadBody.append("file", base64DataUri);
      uploadBody.append("public_id", publicId);
      uploadBody.append("timestamp", timestamp.toString());
      uploadBody.append("api_key", API_KEY);
      uploadBody.append("signature", signature);

      const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: uploadBody,
      });

      if (cldRes.ok) {
        cloudinaryResult = await cldRes.json();
      } else {
        const errorText = await cldRes.text();
        console.error("Cloudinary upload error:", errorText);
      }
    } catch (cldErr) {
      console.error("Failed uploading to Cloudinary:", cldErr);
    }

    return NextResponse.json({
      success: true,
      message: cloudinaryResult
        ? "Image saved locally and synced with Cloudinary CDN!"
        : "Image saved locally (Cloudinary sync pending)",
      path: publicPath,
      fileName: finalFileName,
      size: buffer.length,
      cloudinary: cloudinaryResult
        ? {
            secureUrl: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
          }
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
