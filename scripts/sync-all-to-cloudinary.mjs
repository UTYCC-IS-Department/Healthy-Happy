import fs from "fs";
import path from "path";
import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dh6jges3r";
const API_KEY = process.env.CLOUDINARY_API_KEY || "953391144947254";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "sibJ3V6IsIo0EmH9_KxmaovtZOk";

export function getPublicId(filePath, resourceType = "image") {
  if (!filePath) return "";
  if (filePath.startsWith("healthy-happy-site/")) return filePath;
  const cleanPath = filePath.replace(/^https?:\/\/[^/]+\//, "");
  if (cleanPath.startsWith("healthy-happy-site/")) return cleanPath;
  const relativePath = filePath.replace(/^\//, "").replace(/\.[^/.]+$/, "");
  const safePath = relativePath.replace(/[^A-Za-z0-9/_-]+/g, "-").replace(/-+$/, "");
  return `healthy-happy-site/${resourceType}s/${safePath}`;
}

async function uploadToCloudinary(fullDiskPath, publicId, resourceType = "image") {
  const buffer = fs.readFileSync(fullDiskPath);
  const ext = path.extname(fullDiskPath).toLowerCase();
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    public_id: publicId,
    timestamp,
  };

  const sortedKeys = Object.keys(paramsToSign).sort();
  const stringToSign = sortedKeys.map((k) => `${k}=${paramsToSign[k]}`).join("&") + API_SECRET;
  const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

  let mime = "image/jpeg";
  if (ext === ".png") mime = "image/png";
  else if (ext === ".webp") mime = "image/webp";
  else if (ext === ".svg") mime = "image/svg+xml";
  else if (ext === ".mp4") mime = "video/mp4";

  const base64DataUri = `data:${mime};base64,${buffer.toString("base64")}`;

  const uploadBody = new URLSearchParams();
  uploadBody.append("file", base64DataUri);
  uploadBody.append("public_id", publicId);
  uploadBody.append("timestamp", timestamp.toString());
  uploadBody.append("api_key", API_KEY);
  uploadBody.append("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
  const res = await fetch(endpoint, {
    method: "POST",
    body: uploadBody,
  });

  if (res.ok) {
    const data = await res.json();
    return { ok: true, publicId: data.public_id, url: data.secure_url };
  } else {
    const err = await res.text();
    return { ok: false, error: err };
  }
}

async function checkCloudinaryUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");

  function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(full));
      } else {
        results.push(full);
      }
    }
    return results;
  }

  const allFiles = getFiles(publicDir);
  const mediaFiles = allFiles.filter((f) =>
    /\.(jpg|jpeg|png|webp|mp4)$/i.test(f)
  );

  console.log(`Found ${mediaFiles.length} local media files in public/.`);

  let synced = 0;
  let alreadyOk = 0;
  let failed = 0;

  for (const f of mediaFiles) {
    const rel = "/" + path.relative(publicDir, f);
    const isVideo = /\.(mp4|webm|mov)$/i.test(f);
    const resourceType = isVideo ? "video" : "image";
    const pid = getPublicId(rel, resourceType);

    const checkUrl = isVideo
      ? `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto/q_auto/c_limit,w_1280/${pid}`
      : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_limit,w_1600/${pid}`;

    const exists = await checkCloudinaryUrl(checkUrl);
    if (exists) {
      console.log(`[ALREADY ON CLOUDINARY] ${rel} -> ${pid}`);
      alreadyOk++;
    } else {
      console.log(`[UPLOADING] ${rel} -> ${pid}...`);
      const uploadRes = await uploadToCloudinary(f, pid, resourceType);
      if (uploadRes.ok) {
        console.log(`  -> SUCCESS: ${uploadRes.url}`);
        synced++;
      } else {
        console.error(`  -> FAILED: ${uploadRes.error}`);
        failed++;
      }
    }
  }

  console.log("\n--- Sync Summary ---");
  console.log(`Total checked: ${mediaFiles.length}`);
  console.log(`Already verified: ${alreadyOk}`);
  console.log(`Newly uploaded: ${synced}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
