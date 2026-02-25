// src/data/categories.ts
// Blog categories with multilingual labels

export interface Category {
  id: string;
  label: Record<string, string>;
}

export const categories: Category[] = [
  {
    id: "all",
    label: {
      en: "All",
      bg: "Всички",
      tr: "Tümü",
      ro: "Toate",
      de: "Alle",
      ua: "Всі",
    },
  },
  {
    id: "sunflower-oil",
    label: {
      en: "Sunflower Oil",
      bg: "Слънчогледово олио",
      tr: "Ayçiçek Yağı",
      ro: "Ulei de Floarea Soarelui",
      de: "Sonnenblumenöl",
      ua: "Соняшникова олія",
    },
  },
  {
    id: "trading",
    label: {
      en: "Trading",
      bg: "Търговия",
      tr: "Ticaret",
      ro: "Comerț",
      de: "Handel",
      ua: "Торгівля",
    },
  },
  {
    id: "brand",
    label: {
      en: "Brand",
      bg: "Марка",
      tr: "Marka",
      ro: "Marcă",
      de: "Marke",
      ua: "Бренд",
    },
  },
  {
    id: "products",
    label: {
      en: "Products",
      bg: "Продукти",
      tr: "Ürünler",
      ro: "Produse",
      de: "Produkte",
      ua: "Продукти",
    },
  },
];
