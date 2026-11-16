import mediaRegistryRaw from "@/data/media-registry.json";
import { cloudinaryImage, cloudinaryVideo } from "./cloudinary";

export interface MediaItem {
  id: string;
  name: string;
  path: string;
  page: string;
  section: string;
  usage: string;
  component: string;
  alt: string;
  resourceType?: "image" | "video";
}

export const mediaRegistry: MediaItem[] = mediaRegistryRaw as MediaItem[];

const registryMap = new Map<string, MediaItem>(
  mediaRegistry.map((item) => [item.id, item])
);

export function getMediaItem(id: string): MediaItem | undefined {
  return registryMap.get(id);
}

export function getMediaUrl(id: string): string | undefined {
  const item = getMediaItem(id);
  if (!item) return undefined;
  if (item.resourceType === "video") {
    return cloudinaryVideo(item.path);
  }
  return cloudinaryImage(item.path);
}
