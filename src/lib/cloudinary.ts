const cloudName = "dh6jges3r";
const deliveryBase = `https://res.cloudinary.com/${cloudName}`;

function publicId(path: string, resourceType: "image" | "video") {
  const relativePath = path.replace(/^\//, "").replace(/\.[^/.]+$/, "");
  const safePath = relativePath.replace(/[^A-Za-z0-9/_-]+/g, "-");
  return `healthy-happy-site/${resourceType}s/${safePath}`;
}

export function cloudinaryImage(path: string) {
  return `${deliveryBase}/image/upload/f_auto/q_auto/c_limit,w_1600/${publicId(path, "image")}`;
}

export function cloudinaryVideo(path: string) {
  return `${deliveryBase}/video/upload/f_auto/q_auto/c_limit,w_1280/${publicId(path, "video")}`;
}
