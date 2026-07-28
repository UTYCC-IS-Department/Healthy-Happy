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

const productImage1 = "/healthy-happy/IMG_0319_1_1784649192457.png";
const productImage2 = "/healthy-happy/IMG_0319_1_1784649192457.png"; 
const productImage3 = "/healthy-happy/IMG_0319_1_1784649192457.png"; 
const productImage4 = "/healthy-happy/IMG_0319_1_1784649192457.png";
const productImage5 = "/healthy-happy/IMG_0319_1_1784649192457.png"; 
const productImage6 = "/healthy-happy/IMG_0319_1_1784649192457.png"; 

export const products: Product[] = ([
  [
    "iron-enriched-cookies-1",
    "Original Series",
    "Iron-rich cookies crafted for daily nutritional support.",
    "Whole Wheat Flour, Iron Fortified Oats, Stevia",
    productImage1,
  ],
  [
    "iron-enriched-cookies-2",
    "Protein Series",
    "Protein-boosted iron cookies for active lifestyles.",
    "Protein Flour, Iron Oats, Monk Fruit, Butter",
    productImage2,
  ],
  [
    "iron-enriched-cookies-3",
    "Original Series",
    "Wholesome cookies for everyday balanced nutrition.",
    "Whole Wheat, Oat Flour, Natural Sweetener",
    productImage3,
  ],
  [
    "iron-enriched-cookies-4",
    "Original Series",
    "Crunchy, light, and naturally nutritious daily snack.",
    "Oats, Stevia, Butter, Sea Salt",
    productImage4,
  ],
  [
    "spinach-cookies-1",
    "Protein Series",
    "Iron and fibre packed cookies for your wellness routine.",
    "Spinach Extract, Whole Wheat, Olive Oil",
    productImage5,
  ],
  [
    "spinach-cookies-2",
    "Original Series",
    "Green goodness baked to perfection every single time.",
    "Spinach, Oat Flour, Erythritol, Eggs",
    productImage6,
  ],
  [
    "nut-cookies-1",
    "Protein Series",
    "Nutty, satisfying bites that nourish and energise.",
    "Almonds, Walnuts, Oat Flour, Stevia",
    productImage1,
  ],
  [
    "nut-cookies-2",
    "Original Series",
    "Classic nut blend, naturally sweet and deeply satisfying.",
    "Mixed Nuts, Butter, Cinnamon, Monk Fruit",
    productImage1,
  ],
] as const).map(([id, series, description, ingredients, img], index) => ({
  id,
  name: "Thone Pan Hla - Iron Enriched Cookies",
  series,
  image: img || productImage1,
  thumbnails: [img || productImage1, img || productImage1, img || productImage1],
  description,
  ingredients,
  tags: ["No Sugar", "Low Calories", series],
  price: "5000 MMK",
  isBestSeller: index < 8,
}));

export const assets = {
  logo: "/healthy-happy/Healthy_&_Happy_Myanmar_Logo_1_1784649192455.png",
  banner: "/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453.png",
  product: productImage1,
  award: "/healthy-happy/178331480681205_f00f80f8-85f7-42b5-a7d9-da0f853fcfe9_2_1784649192396.png",
  map: "/healthy-happy/map.jpg"
} as const;

export const awards = [
  "National Healthy Food Award 2023",
  "Best Organic Snack Brand Excellence",
  "Certified ISO 22000 Food Safety Standard",
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}


