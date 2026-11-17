import { cloudinaryImage } from "@/lib/cloudinary";
import { getMediaUrl } from "@/lib/media-registry";

function mediaUrl(id: string, defaultPath: string): string {
  return getMediaUrl(id) || cloudinaryImage(defaultPath);
}

export type ProductMedia = {
  id: string;
  image: string;
  thumbnails: string[];
  isBestSeller?: boolean;
};

const productImage1 = mediaUrl("product-1", "/healthy-happy/Protein Bite (Original).png");
const productImage2 = mediaUrl("product-2", "/healthy-happy/Peanut Butter (No Sugar).png");
const productImage3 = mediaUrl("product-3", "/healthy-happy/IMG_0319_1_1784649192457.png");
const productImage4 = mediaUrl("product-4", "/healthy-happy/Energy Bar.JPG");
const productImage5 = mediaUrl("product-5", "/healthy-happy/Spinach Cookies.png");
const productImage6 = mediaUrl("product-6", "/healthy-happy/Oat Cookies.png");
const productImage7 = mediaUrl("product-7", "/healthy-happy/Protein Bite (Diabetes).png");
const productImage8 = mediaUrl("product-8", "/healthy-happy/IMG_0382.png");
const lavashImage = mediaUrl("product-lavash", "https://res.cloudinary.com/dh6jges3r/image/upload/v1794821484/lavash_s7u4xi.jpg");
const nutsCakeImage = mediaUrl("product-nuts-cake", "https://res.cloudinary.com/dh6jges3r/image/upload/v1794821484/Nut_cakes_y0cwog.jpg");
const nutsCookiesImage = mediaUrl("product-nuts-cookies", "https://res.cloudinary.com/dh6jges3r/image/upload/v1794821590/nut_cookies_a4ivnc.jpg");

export const productMedia: ProductMedia[] = [
  ["iron-enriched-cookies-1", productImage1],
  ["iron-enriched-cookies-2", productImage2],
  ["iron-enriched-cookies-3", productImage3],
  ["iron-enriched-cookies-4", productImage4],
  ["spinach-cookies-1", productImage5],
  ["spinach-cookies-2", productImage6],
  ["nut-cookies-1", productImage7],
  ["nut-cookies-2", productImage8],
  ["nuts-cookies", nutsCookiesImage],
  ["nuts-cake", nutsCakeImage],
  ["lavash", lavashImage],
  ["protein-bite-diabetes", productImage1],
].map(([id, image]) => ({
  id,
  image,
  thumbnails: [image, image, image],
  isBestSeller: true,
}));

export const assets = {
  logo: mediaUrl("site-logo", "/healthy-happy/Healthy_&_Happy_Myanmar_Logo_1_1784649192455.png"),
  banner: mediaUrl("site-banner", "/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453.png"),
  fda: mediaUrl("site-fda", "/healthy-happy/MOHAS.png"),
  product: productImage1,

  award1: mediaUrl("award-1", "/healthy-happy/award1.jpg"),
  award2: mediaUrl("award-2", "/healthy-happy/award2.jpg"),
  award3: mediaUrl("award-3", "/healthy-happy/award3.jpg"),
  award4: mediaUrl("award-4", "/healthy-happy/award4.jpg"),
  award5: mediaUrl("award-5", "/healthy-happy/award5.jpg"),
  award6: mediaUrl("award-6", "/healthy-happy/award6.jpg"),
  award7: mediaUrl("award-7", "/healthy-happy/award7.jpg"),
  award8: mediaUrl("award-8", "/healthy-happy/award8.jpg"),
  award9: mediaUrl("award-9", "/healthy-happy/award9.jpg"),
  award10: mediaUrl("award-10", "/healthy-happy/award10.jpg"),
  award11: mediaUrl("award-11", "/healthy-happy/award11.jpg"),

  certification1: mediaUrl("certification-1", "/healthy-happy/certification1.png"),
  certification2: mediaUrl("certification-2", "/healthy-happy/certification2.jpg"),
  certification3: mediaUrl("certification-3", "/images/aboutusimg/ASEAN_INDIAGRASSROOTFORUM_PHOTOS (5).jpg"),
  certification4: mediaUrl("certification-4", "/images/aboutusimg/ASEAN_INDIAGRASSROOTFORUM_PHOTOS (12).jpg"),
  certification5: mediaUrl("certification-5", "/healthy-happy/certification5.png"),
  certification6: "/healthy-happy/certification6.png",
  certification7: "/healthy-happy/certification7.png",
  certification8: "/healthy-happy/certification8.png",
  certification9: "/healthy-happy/certification9.png",
  certification10: "/healthy-happy/certification10.png",
  certification11: "/healthy-happy/certification11.png",
} as const;

export const awards = [
  "National Healthy Food Award 2023",
  "Best Organic Snack Brand Excellence",
  "Certified ISO 22000 Food Safety Standard",
];
