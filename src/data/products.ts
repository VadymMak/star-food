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
    description:
      "Unrefined and RBDW (Refined, Bleached, Deodorized, Winterized). PET bottles 0.5–10L, plastic canisters 10–20L, and bulk tanker.",
    tag: "Popular",
    specs: {
      volume: "0.5L, 1L, 5L, 10L PET / 10L, 20L Canister / Bulk tanker",
      packaging: "PET bottles, plastic canisters, bulk tank trucks",
      shelfLife: "12–18 months",
      origin: "Eastern Europe (Ukraine, Bulgaria)",
      certification: "ISO 22000, HACCP, Non-GMO",
    },
    packagingOptions: [
      "0.5L PET — €1.50",
      "1L PET — €1.80",
      "5L PET",
      "10L PET — €16.50",
      "10L Canister",
      "20L Canister",
      "Bulk Tank Truck",
    ],
  },
  {
    id: "high-oleic",
    slug: "high-oleic-sunflower-oil",
    name: "High-Oleic Sunflower Oil",
    image: "/images/palm-oil.webp",
    description:
      "RBDW high-oleic sunflower oil. PET bottles 5–10L, plastic canisters 10–20L, and bulk tanker. Ideal for health-conscious markets.",
    specs: {
      volume: "5L, 10L PET / 10L, 20L Canister / Bulk tanker",
      packaging: "PET bottles, plastic canisters, bulk tank trucks",
      shelfLife: "18 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP, Non-GMO",
    },
    packagingOptions: [
      "5L PET",
      "10L PET — €23.40",
      "10L Canister",
      "20L Canister",
      "Bulk Tank Truck",
    ],
  },
  {
    id: "rapeseed-oil",
    slug: "rapeseed-oil",
    name: "Rapeseed Oil (Canola)",
    image: "/images/vegetable-oil.webp",
    description:
      "Refined and deodorized rapeseed oil. PET bottles 5–10L, plastic canister 20L, and bulk tanker. Unrefined and refined grades available.",
    specs: {
      volume: "5L, 10L PET / 20L Canister / Bulk tanker",
      packaging: "PET bottles, plastic canisters, bulk tank trucks",
      shelfLife: "12–18 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP, Non-GMO",
    },
    packagingOptions: ["5L PET", "10L PET", "20L Canister", "Bulk Tank Truck"],
  },
  {
    id: "soybean-oil",
    slug: "soybean-oil",
    name: "Soybean Oil",
    image: "/images/vegetable-oil.webp",
    description:
      "Refined and deodorized soybean oil. PET bottles 5–10L, plastic canister 20L, and bulk tanker. Unrefined grade available on request.",
    specs: {
      volume: "5L, 10L PET / 20L Canister / Bulk tanker",
      packaging: "PET bottles, plastic canisters, bulk tank trucks",
      shelfLife: "12 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP",
    },
    packagingOptions: ["5L PET", "10L PET", "20L Canister", "Bulk Tank Truck"],
  },
  {
    id: "frying-oil",
    slug: "frying-oil",
    name: "Deep-Frying Oil",
    image: "/images/frying-oil.webp",
    description:
      "High-stability deep-frying oils for professional food service and industrial use. Available in sunflower, high-oleic, rapeseed, and soybean varieties.",
    tag: "HoReCa",
    specs: {
      volume: "10L PET",
      packaging: "PET bottles",
      shelfLife: "12 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP",
    },
    packagingOptions: [
      "Sunflower 10L PET — €21.00",
      "High-Oleic 10L PET — €25.80",
      "Rapeseed 10L PET",
      "Soybean 10L PET",
    ],
  },
  {
    id: "mayonnaise",
    slug: "mayonnaise",
    name: "Mayonnaise & Ketchup",
    image: "/images/mayonnaise.webp",
    description:
      "Mayonnaise sauce 30% and 67% fat content. Ketchup Lagidny. Plastic buckets 1.8kg–10kg for HoReCa and food service.",
    specs: {
      volume: "1.8kg, 4.5kg, 10kg buckets",
      packaging: "Plastic buckets",
      shelfLife: "6–12 months",
      origin: "Eastern Europe",
      certification: "ISO 22000, HACCP",
    },
    packagingOptions: [
      "Mayo 30% — 1.8kg bucket",
      "Mayo 30% — 4.5kg bucket",
      "Mayo 30% — 10kg bucket — €18",
      "Mayo 67% — 1.8kg bucket",
      "Mayo 67% — 4.5kg bucket — €15",
      "Mayo 67% — 10kg bucket — €30",
      "Ketchup Lagidny — 2kg bucket",
      "Ketchup Lagidny — 5kg bucket — €8",
    ],
  },
  {
    id: "dairy",
    slug: "dairy-products",
    name: "Milk UHT",
    image: "/images/dry-milk.webp",
    description:
      "UHT long-life milk in Tetra Pak 1L. Shelf-stable, suitable for export and B2B wholesale across Europe.",
    specs: {
      volume: "1L Tetra Pak",
      packaging: "Tetra Pak cartons",
      shelfLife: "6–12 months",
      origin: "EU (certified producers)",
      certification: "ISO 22000, HACCP, EU Food Safety",
    },
    packagingOptions: ["1L Tetra Pak"],
  },
  {
    id: "sugar",
    slug: "sugar",
    name: "Beet Sugar",
    image: "/images/sugar.webp",
    description:
      "Premium white beet sugar. Available in 25kg, 50kg bags and big bags.",
    specs: {
      volume: "25kg, 50kg bags, 1000kg big bags",
      packaging: "Polypropylene bags, big bags",
      shelfLife: "24 months",
      origin: "Eastern Europe (Ukraine, Poland)",
      certification: "ISO 22000, EU Food Safety",
    },
    packagingOptions: ["25kg Bag", "50kg Bag", "1000kg Big Bag"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
