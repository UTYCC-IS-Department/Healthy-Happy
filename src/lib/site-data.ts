export type Product = {
  id: string;
  name: string;
  series: string;
  image: string;
  thumbnails: string[];
  description: string;
  ingredients: string;
  tags: string[];
  price: string;
  isBestSeller?: boolean;
};

const productImage = "/healthy-happy/IMG_0319_1_1784649192457.png";

export const products: Product[] = [
  [
    "iron-enriched-cookies-1",
    "Original Series",
    "Iron-rich cookies crafted for daily nutritional support.",
    "Whole Wheat Flour, Iron Fortified Oats, Stevia",
  ],
  [
    "iron-enriched-cookies-2",
    "Protein Series",
    "Protein-boosted iron cookies for active lifestyles.",
    "Protein Flour, Iron Oats, Monk Fruit, Butter",
  ],
  [
    "iron-enriched-cookies-3",
    "Original Series",
    "Wholesome cookies for everyday balanced nutrition.",
    "Whole Wheat, Oat Flour, Natural Sweetener",
  ],
  [
    "iron-enriched-cookies-4",
    "Original Series",
    "Crunchy, light, and naturally nutritious daily snack.",
    "Oats, Stevia, Butter, Sea Salt",
  ],
  [
    "spinach-cookies-1",
    "Protein Series",
    "Iron and fibre packed cookies for your wellness routine.",
    "Spinach Extract, Whole Wheat, Olive Oil",
  ],
  [
    "spinach-cookies-2",
    "Original Series",
    "Green goodness baked to perfection every single time.",
    "Spinach, Oat Flour, Erythritol, Eggs",
  ],
  [
    "nut-cookies-1",
    "Protein Series",
    "Nutty, satisfying bites that nourish and energise.",
    "Almonds, Walnuts, Oat Flour, Stevia",
  ],
  [
    "nut-cookies-2",
    "Original Series",
    "Classic nut blend, naturally sweet and deeply satisfying.",
    "Mixed Nuts, Butter, Cinnamon, Monk Fruit",
  ],
].map(([id, series, description, ingredients], index) => ({
  id,
  name: "Thone Pan Hla - Iron Enriched Cookies",
  series,
  image: productImage,
  thumbnails: [productImage, productImage, productImage],
  description,
  ingredients,
  tags: ["No Sugar", "Low Calories", series],
  price: "5000 MMK",
  isBestSeller: index < 8,
}));

export const assets = {
  logo: "/healthy-happy/Healthy_&_Happy_Myanmar_Logo_1_1784649192455.png",
  banner: "/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453.png",
  product: productImage,
  award: "/healthy-happy/178331480681205_f00f80f8-85f7-42b5-a7d9-da0f853fcfe9_2_1784649192396.png",
  map:"/healthy-happy/map.jpg",
} as const;

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}
