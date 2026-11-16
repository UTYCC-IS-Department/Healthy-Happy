import { NextResponse } from "next/server";
import { cloudinaryImage, cloudinaryVideo, getPublicId } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paths: string[] = Array.isArray(body.paths)
      ? body.paths
      : body.path
      ? [body.path]
      : [];

    const results: Record<
      string,
      { status: number; ok: boolean; url: string; publicId: string }
    > = {};

    await Promise.all(
      paths.map(async (rawPath) => {
        const isVideo = body.resourceType === "video" || /\.(mp4|webm|mov)$/i.test(rawPath);
        const url = isVideo ? cloudinaryVideo(rawPath) : cloudinaryImage(rawPath);
        const pid = getPublicId(rawPath, isVideo ? "video" : "image");

        try {
          const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(4000) });
          results[rawPath] = {
            status: res.status,
            ok: res.ok,
            url,
            publicId: pid,
          };
        } catch {
          results[rawPath] = {
            status: 404,
            ok: false,
            url,
            publicId: pid,
          };
        }
      })
    );

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
