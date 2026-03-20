// data/chunks.ts
// Knowledge base for AI Chat Assistant
// Each chunk = 1-3 sentences on a specific topic

export interface ContentChunk {
  id: string;
  category: string;
  content: string;
}

export const chunks: ContentChunk[] = [
  // ===== ABOUT =====
  {
    id: "about-intro",
    category: "about",
    content:
      "UB Market LTD is a European food trading company registered in Bulgaria, specializing in wholesale vegetable oils, mayonnaise, ketchup, milk, and other food commodities for international B2B trade.",
  },
  {
    id: "about-location",
    category: "about",
    content:
      "UB Market LTD is based in Varna, Bulgaria. Office address: Sirma Voivoda St., b.1, ap. 21, Varna 9010, Bulgaria. Bulgaria is a strategic EU gateway for Eastern European food products.",
  },
  {
    id: "about-brand",
    category: "about",
    content:
      "Star Food is the registered trademark of UB Market LTD. The Star Food brand represents quality EU-certified food products for wholesale markets across Europe.",
  },
  {
    id: "about-market",
    category: "about",
    content:
      "The European sunflower oil market is valued at approximately $9.36 billion in 2025 and projected to reach $12.6 billion by 2034. UB Market connects Eastern European manufacturers with Western European buyers.",
  },
  {
    id: "about-experience",
    category: "about",
    content:
      "UB Market has been operating in the European food trade market, building partnerships with over 50 partners across 12+ countries. The company has capacity to handle 500+ tons of product per shipment.",
  },

  // ===== PRODUCTS — OILS =====
  {
    id: "product-sunflower-oil-unrefined",
    category: "products",
    content:
      "Sunflower Oil Unrefined — available in PET bottles: 0.5L (€1.50), 1L (€1.80), 10L (€16.50). Non-GMO certified. Suitable for cooking and food production.",
  },
  {
    id: "product-sunflower-oil-rbdw",
    category: "products",
    content:
      "Sunflower Oil RBDW (Refined, Bleached, Deodorized, Winterized) — available in PET bottles 5L and 10L, plastic canisters 10L and 20L, and bulk tanker. All types also available as bulk in a tanker.",
  },
  {
    id: "product-high-oleic",
    category: "products",
    content:
      "High-Oleic Sunflower Oil RBDW — available in PET bottles 5L and 10L (€23.40), plastic canisters 10L and 20L, and bulk tanker. Ideal for health-conscious markets, food processing, and extended shelf life.",
  },
  {
    id: "product-rapeseed-oil",
    category: "products",
    content:
      "Rapeseed Oil (Canola) — refined and deodorized grade available in PET bottles 5L and 10L, plastic canister 20L, and bulk tanker. Unrefined grade also available in bulk tanker.",
  },
  {
    id: "product-soybean-oil",
    category: "products",
    content:
      "Soybean Oil — refined and deodorized grade available in PET bottles 5L and 10L, plastic canister 20L, and bulk tanker. Unrefined grade also available in bulk tanker.",
  },
  {
    id: "product-frying-oil",
    category: "products",
    content:
      "Deep-Frying Oil — professional high-stability oils for HoReCa and industrial frying. Available: Sunflower 10L PET (€21.00), High-Oleic Sunflower 10L PET (€25.80), Rapeseed 10L PET, Soybean 10L PET. High smoke point, consistent results.",
  },

  // ===== PRODUCTS — CONDIMENTS =====
  {
    id: "product-mayonnaise-30",
    category: "products",
    content:
      "Mayonnaise Sauce 30% fat — available in plastic buckets: 1.8kg, 4.5kg, and 10kg (€18). Suitable for HoReCa and food service.",
  },
  {
    id: "product-mayonnaise-67",
    category: "products",
    content:
      "Mayonnaise Sauce 67% fat — available in plastic buckets: 1.8kg, 4.5kg (€15), and 10kg (€30). High fat content for professional food production.",
  },
  {
    id: "product-ketchup",
    category: "products",
    content:
      "Ketchup Lagidny — available in plastic buckets: 2kg and 5kg (€8). Suitable for HoReCa, restaurants, and food service.",
  },

  // ===== PRODUCTS — DAIRY & OTHER =====
  {
    id: "product-milk-uht",
    category: "products",
    content:
      "Milk UHT — long-life ultra-pasteurized milk in Tetra Pak 1L. Shelf-stable, suitable for B2B wholesale and export across Europe.",
  },
  {
    id: "product-sugar",
    category: "products",
    content:
      "Beet Sugar — premium white beet sugar available in 25kg bags, 50kg bags, and 1000kg big bags. Suitable for food production, bakeries, and retail packaging.",
  },

  // ===== CERTIFICATIONS =====
  {
    id: "cert-overview",
    category: "certifications",
    content:
      "All UB Market products meet EU food safety standards. Certifications include ISO 22000 (food safety management), HACCP (hazard analysis), Non-GMO verification, and EU Food Safety compliance.",
  },
  {
    id: "cert-quality",
    category: "certifications",
    content:
      "UB Market maintains strict quality control throughout the supply chain. Every shipment comes with certificates of analysis (COA), certificates of origin, and phytosanitary certificates as required.",
  },

  // ===== LOGISTICS & DELIVERY =====
  {
    id: "logistics-overview",
    category: "logistics",
    content:
      "UB Market provides road transport delivery across 12+ EU countries. Standard delivery terms include FOB (Free on Board), CIF (Cost, Insurance, Freight), and DAP (Delivered at Place).",
  },
  {
    id: "logistics-capacity",
    category: "logistics",
    content:
      "Shipping capacity: full truckloads (FTL) of 20-24 tons, or bulk tankers for liquid oils. The company can handle orders from 1 pallet to 500+ tons.",
  },
  {
    id: "logistics-countries",
    category: "logistics",
    content:
      "UB Market delivers to countries including Germany, Turkey, Romania, Austria, Czech Republic, Poland, Greece, Italy, and other EU member states. Delivery times vary from 3-10 business days depending on destination.",
  },

  // ===== ORDERING PROCESS =====
  {
    id: "process-overview",
    category: "process",
    content:
      "Ordering process: 1) Send an inquiry with product, quantity, and delivery address. 2) Receive a detailed quotation within 24 hours. 3) Confirm order and arrange delivery. Simple 3-step process.",
  },
  {
    id: "process-moq",
    category: "process",
    content:
      "Minimum order quantity varies by product. For bottled sunflower oil: from 1 pallet (around 600-800 liters). For bulk oils: from 1 ton. For sugar: from 1 ton. For bulk orders, contact the sales team for the best pricing.",
  },
  {
    id: "process-payment",
    category: "process",
    content:
      "Payment terms are discussed individually based on order volume and client relationship. Standard options include bank transfer (T/T), letter of credit (L/C), and other arrangements for regular clients.",
  },

  // ===== PRICING =====
  {
    id: "pricing-general",
    category: "pricing",
    content:
      "Prices depend on product type, quantity, packaging, and delivery terms (FOB/CIF/DAP). For current prices, contact the sales team via the website quote form or email. Bulk orders receive preferential pricing.",
  },
  {
    id: "pricing-retail-oils",
    category: "pricing",
    content:
      "Retail bottle prices: Sunflower Oil Unrefined 0.5L — €1.50, 1L — €1.80, 10L — €16.50. High-Oleic Sunflower Oil 10L — €23.40. Deep-Frying Sunflower Oil 10L — €21.00. Deep-Frying High-Oleic 10L — €25.80.",
  },
  {
    id: "pricing-condiments",
    category: "pricing",
    content:
      "Condiment prices: Mayonnaise 30% fat 10kg bucket — €18. Mayonnaise 67% fat 4.5kg bucket — €15, 10kg bucket — €30. Ketchup Lagidny 5kg bucket — €8. All prices on request for smaller pack sizes.",
  },

  // ===== PRIVATE LABEL =====
  {
    id: "private-label",
    category: "services",
    content:
      "UB Market offers private label services — production of sunflower oil and other products under your own brand. Full service includes label design, packaging selection, and regulatory compliance for EU markets.",
  },

  // ===== PARTNERSHIP =====
  {
    id: "partnership",
    category: "partnership",
    content:
      "UB Market works with over 50 partners including manufacturers, distributors, and retailers across Europe. The company welcomes new partnerships and distribution agreements.",
  },

  // ===== CONTACT =====
  {
    id: "contact-info",
    category: "contact",
    content:
      "Contact UB Market: Email: ubmarket2022@gmail.com, Phone: +359 8844 69860, Address: Sirma Voivoda St., b.1, ap. 21, Varna 9010, Bulgaria. Also available on Instagram (@ub_market_ltd) and Telegram (@ub_market_ltd).",
  },
  {
    id: "contact-quote",
    category: "contact",
    content:
      "To request a price quote, use the quote form on the website at ub-market.com/quote. Include the product type, desired quantity, packaging format, and delivery destination for the fastest response.",
  },

  // ===== FAQ =====
  {
    id: "faq-samples",
    category: "faq",
    content:
      "Yes, UB Market can provide product samples for quality evaluation before placing a bulk order. Contact the sales team to arrange sample delivery.",
  },
  {
    id: "faq-custom-packaging",
    category: "faq",
    content:
      "Custom packaging is available for most products. Options include PET bottles (0.5L, 1L, 5L, 10L), plastic canisters (10L, 20L), bulk tanker for oils, and plastic buckets (1.8kg, 4.5kg, 10kg) for condiments.",
  },
  {
    id: "faq-delivery-time",
    category: "faq",
    content:
      "Standard delivery time is 5-10 business days within the EU, depending on destination and order volume. Express delivery options may be available for urgent orders.",
  },
  {
    id: "faq-returns",
    category: "faq",
    content:
      "All products are quality-checked before shipment. In case of quality issues, UB Market handles claims promptly. Detailed terms are agreed upon in the sales contract.",
  },
];
