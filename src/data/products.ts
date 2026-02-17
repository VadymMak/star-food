export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  tag?: string;
}

export const products: Product[] = [
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    image: "/images/vegetable-oil.webp",
    description:
      "Refined, deodorized, winterized. PET bottles (0.5–10L) and bulk tank trucks.",
    tag: "Popular",
  },
  {
    id: "frying-oil",
    name: "Frying Oil",
    image: "/images/frying-oil.webp",
    description:
      "High-stability oil for professional food service and industrial frying applications.",
  },
  {
    id: "sugar",
    name: "Beet Sugar",
    image: "/images/sugar.webp",
    description:
      "Premium white beet sugar. Available in 25kg, 50kg bags and big bags.",
  },
  {
    id: "high-oleic",
    name: "High-Oleic Sunflower Oil",
    image: "/images/palm-oil.webp",
    description:
      "Refined high-oleic variety — bottled and bulk. Ideal for health-conscious markets.",
  },
  {
    id: "dairy",
    name: "Dairy Products",
    image: "/images/dry-milk.webp",
    description:
      "Milk, butter, and dairy derivatives from certified European producers.",
  },
  {
    id: "mayonnaise",
    name: "Mayonnaise & Condiments",
    image: "/images/mayonnaise.webp",
    description:
      "Traditional and industrial mayonnaise, sauces, and condiment products.",
  },
];