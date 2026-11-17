import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { MediaItem } from "@/lib/media-registry";

const registryFilePath = path.join(process.cwd(), "src/data/media-registry.json");

export async function GET() {
  try {
    const rawData = await fs.readFile(registryFilePath, "utf-8");
    const items: MediaItem[] = JSON.parse(rawData);

    // Also list available local files for easy picking
    const aboutUsDir = path.join(process.cwd(), "public/images/aboutusimg");
    const healthyHappyDir = path.join(process.cwd(), "public/healthy-happy");

    let aboutUsFiles: string[] = [];
    let healthyHappyFiles: string[] = [];

    try {
      const files = await fs.readdir(aboutUsDir);
      aboutUsFiles = files.filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f)).map((f) => `/images/aboutusimg/${f}`);
    } catch {
      // ignore if missing
    }

    try {
      const files = await fs.readdir(healthyHappyDir);
      healthyHappyFiles = files.filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f)).map((f) => `/healthy-happy/${f}`);
    } catch {
      // ignore if missing
    }

    const availableLocalPaths = [...aboutUsFiles, ...healthyHappyFiles];
    const registeredPaths = new Set(items.map((i) => i.path));
    const unregisteredPaths = availableLocalPaths.filter((p) => !registeredPaths.has(p));

    return NextResponse.json({
      success: true,
      items,
      availableLocalPaths,
      unregisteredPaths,
      pages: Array.from(new Set(items.map((i) => i.page))),
      sections: Array.from(new Set(items.map((i) => i.section))),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: "Items must be an array" },
        { status: 400 }
      );
    }

    // Save formatted JSON back to src/data/media-registry.json
    await fs.writeFile(registryFilePath, JSON.stringify(items, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Media registry updated successfully",
      count: items.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
