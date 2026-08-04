export type ProductMedia = {
  id: string;
  image: string;
  thumbnails: string[];
  isBestSeller?: boolean;
};

const productImage1 = "/healthy-happy/IMG_0319_1_1784649192457.png";
const productImage2 = "/healthy-happy/IMG_0382.png";
const productImage3 = "/healthy-happy/Spinach Cookies.png";
const productImage4 = "/healthy-happy/Oat Cookies.png";
const productImage5 = "/healthy-happy/Peanut Butter (No Sugar).png";
const productImage6 = "/healthy-happy/Protein Bite (Diabetes).png";

export const productMedia: ProductMedia[] = [
  ["iron-enriched-cookies-1", productImage1],
  ["iron-enriched-cookies-2", productImage2],
  ["iron-enriched-cookies-3", productImage3],
  ["iron-enriched-cookies-4", productImage4],
  ["spinach-cookies-1", productImage5],
  ["spinach-cookies-2", productImage6],
  ["nut-cookies-1", productImage1],
  ["nut-cookies-2", productImage1],
].map(([id, image]) => ({
  id,
  image,
  thumbnails: [image, image, image],
  isBestSeller: true,
}));

export const assets = {
  logo: "/healthy-happy/Healthy_&_Happy_Myanmar_Logo_1_1784649192455.png",
  banner: "/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453.png",
  fda: "/healthy-happy/MOHAS.png",
  product: productImage1,
  award: "/healthy-happy/178331480681205_f00f80f8-85f7-42b5-a7d9-da0f853fcfe9_2_1784649192396.png",
  award1: "/healthy-happy/award1.jpg",
  award2: "/healthy-happy/award2.jpg",
  award3: "/healthy-happy/award3.jpg",
  award4: "/healthy-happy/award4.jpg",
  award5: "/healthy-happy/award5.jpg",
  award6: "/healthy-happy/award6.jpg",
  award7: "/healthy-happy/award7.jpg",
  award8: "/healthy-happy/award8.jpg",
  award9: "/healthy-happy/award9.jpg",
  award10: "/healthy-happy/award10.jpg",
  award11: "/healthy-happy/award11.jpg",
} as const;

export const awards = [
  "National Healthy Food Award 2023",
  "Best Organic Snack Brand Excellence",
  "Certified ISO 22000 Food Safety Standard",
];
