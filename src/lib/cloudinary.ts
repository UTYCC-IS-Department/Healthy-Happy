export const cloudName = "dh6jges3r";
export const deliveryBase = `https://res.cloudinary.com/${cloudName}`;

export function getPublicId(path: string, resourceType: "image" | "video" = "image") {
  if (!path) return "";
  if (path.startsWith("healthy-happy-site/")) return path;
  const cleanPath = path.replace(/^https?:\/\/[^/]+\//, "");
  if (cleanPath.startsWith("healthy-happy-site/")) return cleanPath;
  const relativePath = path.replace(/^\//, "").replace(/\.[^/.]+$/, "");
  const safePath = relativePath.replace(/[^A-Za-z0-9/_-]+/g, "-");
  return `healthy-happy-site/${resourceType}s/${safePath}`;
}

export function cloudinaryImage(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const pid = getPublicId(path, "image");
  return `${deliveryBase}/image/upload/f_auto/q_auto/c_limit,w_1600/${pid}`;
}

export function cloudinaryVideo(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const pid = getPublicId(path, "video");
  return `${deliveryBase}/video/upload/f_auto/q_auto/c_limit,w_1280/${pid}`;
}
