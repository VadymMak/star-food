export interface ProductSpec {
  volume?: string;
  packaging?: string;
  shelfLife?: string;
  origin?: string;
  certification?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  tag?: string;
  specs: ProductSpec;
  packagingOptions: string[];
}

export const products: Product[] = [
  {
    id: "sunflower-oil",
    slug: "sunflower-oil",
    name: "Sunflower Oil",
    image: "/images/vegetable-oil.webp",
    description: "Refined, deodorized, winterized. PET bottles (0.5–10L) and bulk tank trucks.",
    tag: "Popular",
    specs: {
      volume: "0.5L, 1L, 3L, 5L, 10L PET / Bulk tanker",
      packaging: "PET bottles, bulk tank trucks",
      shelfLife: "12–18 months",
      origin: "Eastern Europe (Ukraine, Bulgaria)",
      certification: "ISO 22000, HACCP, Non-GMO",
    },
    packagingOptions: ["0.5L PET", "1L PET", "3L PET", "5L PET", "10L PET", "Bulk Tank Truck"],
  },
  {
    id: "frying-oil",
    slug: "frying-oil",
    name: "Frying Oil",
    image: "/images/frying-oil.webp",
    description: "High-stability oil for professional food service and industrial frying applications.",
    specs: {
      volume: "5L, 10L PET / Bulk tanker",
      packaging: "PET bottles, IBC containers, bulk",
      shelfLife: "12 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP",
    },
    packagingOptions: ["5L PET", "10L PET", "IBC 1000L", "Bulk Tank Truck"],
  },
  {
    id: "sugar",
    slug: "sugar",
    name: "Beet Sugar",
    image: "/images/sugar.webp",
    description: "Premium white beet sugar. Available in 25kg, 50kg bags and big bags.",
    specs: {
      volume: "25kg, 50kg bags, 1000kg big bags",
      packaging: "Polypropylene bags, big bags",
      shelfLife: "24 months",
      origin: "Eastern Europe (Ukraine, Poland)",
      certification: "ISO 22000, EU Food Safety",
    },
    packagingOptions: ["25kg Bag", "50kg Bag", "1000kg Big Bag"],
  },
  {
    id: "high-oleic",
    slug: "high-oleic-sunflower-oil",
    name: "High-Oleic Sunflower Oil",
    image: "/images/palm-oil.webp",
    description: "Refined high-oleic variety — bottled and bulk. Ideal for health-conscious markets.",
    specs: {
      volume: "1L, 3L, 5L PET / Bulk tanker",
      packaging: "PET bottles, bulk tank trucks",
      shelfLife: "18 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP, Non-GMO",
    },
    packagingOptions: ["1L PET", "3L PET", "5L PET", "Bulk Tank Truck"],
  },
  {
    id: "dairy",
    slug: "dairy-products",
    name: "Dairy Products",
    image: "/images/dry-milk.webp",
    description: "Milk, butter, and dairy derivatives from certified European producers.",
    specs: {
      volume: "Various (per product)",
      packaging: "Cartons, bags, bulk",
      shelfLife: "6–24 months (varies)",
      origin: "EU (certified producers)",
      certification: "ISO 22000, HACCP, EU Food Safety",
    },
    packagingOptions: ["25kg Bags (powder)", "Cartons (butter)", "Bulk"],
  },
  {
    id: "mayonnaise",
    slug: "mayonnaise",
    name: "Mayonnaise & Condiments",
    image: "/images/mayonnaise.webp",
    description: "Traditional and industrial mayonnaise, sauces, and condiment products.",
    specs: {
      volume: "250ml, 500ml, 1L, 5L, 10L",
      packaging: "Glass jars, PET bottles, sachets, buckets",
      shelfLife: "6–12 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP",
    },
    packagingOptions: ["250ml Jar", "500ml PET", "1L PET", "5L Bucket", "10L Bucket"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
