import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dh6jges3r";
const API_KEY = process.env.CLOUDINARY_API_KEY || "953391144947254";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "sibJ3V6IsIo0EmH9_KxmaovtZOk";

async function uploadLocalFileToCloudinary(relativePath: string) {
  const cleanPath = relativePath.replace(/^\//, "");
  const fullDiskPath = path.join(process.cwd(), "public", cleanPath);

  try {
    const buffer = await fs.readFile(fullDiskPath);
    const ext = path.extname(cleanPath) || ".jpg";
    const baseName = path.basename(cleanPath, ext);

    const relativeWithoutExt = cleanPath.replace(/\.[^/.]+$/, "");
    const safePath = relativeWithoutExt.replace(/[^A-Za-z0-9/_-]+/g, "-");
    const publicId = `healthy-happy-site/images/${safePath}`;

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign: Record<string, string | number> = {
      public_id: publicId,
      timestamp,
    };

    const sortedKeys = Object.keys(paramsToSign).sort();
    const stringToSign = sortedKeys.map((k) => `${k}=${paramsToSign[k]}`).join("&") + API_SECRET;
    const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

    const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
    const base64DataUri = `data:${mime};base64,${buffer.toString("base64")}`;

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
      const data = await cldRes.json();
      return { ok: true, publicId: data.public_id, url: data.secure_url };
    } else {
      const errText = await cldRes.text();
      return { ok: false, error: errText };
    }
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paths: string[] = Array.isArray(body.paths)
      ? body.paths
      : body.path
      ? [body.path]
      : [];

    if (paths.length === 0) {
      return NextResponse.json({ success: false, error: "No paths provided" }, { status: 400 });
    }

    const results: Record<string, { ok: boolean; publicId?: string; url?: string; error?: string }> = {};

    for (const p of paths) {
      results[p] = await uploadLocalFileToCloudinary(p);
    }

    const successCount = Object.values(results).filter((r) => r.ok).length;

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${successCount} of ${paths.length} images to Cloudinary`,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
