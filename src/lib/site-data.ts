export type ProductMedia = {
  id: string;
  image: string;
  thumbnails: string[];
  isBestSeller?: boolean;
};

const productImage1 = cloudinaryImage("/healthy-happy/Protein Bite (Original).png");
const productImage2 = cloudinaryImage("/healthy-happy/Peanut Butter (No Sugar).png");
const productImage3 = cloudinaryImage("/healthy-happy/IMG_0319_1_1784649192457.png");
const productImage4 = cloudinaryImage("/healthy-happy/Energy Bar.JPG");
const productImage5 = cloudinaryImage("/healthy-happy/Spinach Cookies.png");
const productImage6 = cloudinaryImage("/healthy-happy/Oat Cookies.png");
const productImage7 = cloudinaryImage("/healthy-happy/Protein Bite (Diabetes).png");
const productImage8 = cloudinaryImage("/healthy-happy/IMG_0382.png");

export const productMedia: ProductMedia[] = [
  ["iron-enriched-cookies-1", productImage1],
  ["iron-enriched-cookies-2", productImage2],
  ["iron-enriched-cookies-3", productImage3],
  ["iron-enriched-cookies-4", productImage4],
  ["spinach-cookies-1", productImage5],
  ["spinach-cookies-2", productImage6],
  ["nut-cookies-1", productImage7],
  ["nut-cookies-2", productImage8],
].map(([id, image]) => ({
  id,
  image,
  thumbnails: [image, image, image],
  isBestSeller: true,
}));

export const assets = {
  logo: cloudinaryImage("/healthy-happy/Healthy_&_Happy_Myanmar_Logo_1_1784649192455.png"),
  banner: cloudinaryImage("/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453.png"),
  fda: cloudinaryImage("/healthy-happy/MOHAS.png"),
  product: productImage1,

  award1: cloudinaryImage("/healthy-happy/award1.jpg"),
  award2: cloudinaryImage("/healthy-happy/award2.jpg"),
  award3: cloudinaryImage("/healthy-happy/award3.jpg"),
  award4: cloudinaryImage("/healthy-happy/award4.jpg"),
  award5: cloudinaryImage("/healthy-happy/award5.jpg"),
  award6: cloudinaryImage("/healthy-happy/award6.jpg"),
  award7: cloudinaryImage("/healthy-happy/award7.jpg"),
  award8: cloudinaryImage("/healthy-happy/award8.jpg"),
  award9: cloudinaryImage("/healthy-happy/award9.jpg"),
  award10: cloudinaryImage("/healthy-happy/award10.jpg"),
  award11: cloudinaryImage("/healthy-happy/award11.jpg"),

  certification1: cloudinaryImage("/healthy-happy/certification1.png"),
  certification2: cloudinaryImage("/healthy-happy/certification2.jpg"),
  certification3: "/healthy-happy/certification3.png",
  certification4: "/healthy-happy/certification4.png",
  certification5: "/healthy-happy/certification5.png",
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
import { cloudinaryImage } from "@/lib/cloudinary";
