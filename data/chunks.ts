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
      "UB Market LTD is a European food trading company registered in Bulgaria, specializing in wholesale sunflower oil, sugar, dairy products, and other food commodities for international B2B trade.",
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

  // ===== PRODUCTS =====
  {
    id: "product-sunflower-oil",
    category: "products",
    content:
      "Star Food Sunflower Oil — premium refined, deodorized sunflower oil. Available in 1L, 3L, 5L PET bottles and bulk (flexitank, IBC). Non-GMO certified, suitable for cooking, frying, and food production.",
  },
  {
    id: "product-high-oleic",
    category: "products",
    content:
      "High-Oleic Sunflower Oil — specialty oil with 80%+ oleic acid content. Ideal for deep frying in HoReCa and food industry. Extended frying life, neutral taste, premium quality.",
  },
  {
    id: "product-frying-oil",
    category: "products",
    content:
      "Professional Frying Oil — specially formulated for commercial deep frying. High smoke point, extended usage life, consistent results. Popular with restaurants, fast food chains, and food manufacturers.",
  },
  {
    id: "product-sugar",
    category: "products",
    content:
      "Wholesale Beet Sugar — EU-origin white crystal sugar (ICUMSA 45). Available in 50kg bags and big bags (1000kg). Suitable for food production, bakeries, and retail packaging.",
  },
  {
    id: "product-dairy",
    category: "products",
    content:
      "Dairy Products — including powdered milk (whole and skimmed), butter, and cheese for wholesale. EU-certified, suitable for food manufacturing and export.",
  },
  {
    id: "product-mayonnaise",
    category: "products",
    content:
      "Mayonnaise — produced under the Star Food brand. Available in various packaging formats for retail and HoReCa. Classic recipe with high-quality sunflower oil base.",
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
      "Shipping capacity: full truckloads (FTL) of 20-24 tons, or flexitank containers for bulk liquid oils. The company can handle orders from 1 pallet to 500+ tons.",
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
      "Minimum order quantity varies by product. For sunflower oil: from 1 pallet (around 600-800 liters). For sugar: from 1 ton. For bulk orders, contact the sales team for the best pricing.",
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
    id: "pricing-market",
    category: "pricing",
    content:
      "Sunflower oil market prices fluctuate based on crop yields and global demand. Average European export price is around $1,100-1,200 per ton. UB Market provides competitive wholesale pricing.",
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
      "Custom packaging is available for most products. Options include PET bottles (1L, 3L, 5L), bag-in-box, flexitank for bulk, IBC containers, and custom retail packaging under private label.",
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
