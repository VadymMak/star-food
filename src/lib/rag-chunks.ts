// src/lib/rag-chunks.ts
// Knowledge base for AI auto-reply — full business context

export const RAG_CHUNKS = [
  // Company overview
  `UB Market LTD is an EU-registered international food trading company based in Varna, Bulgaria.
We specialize in connecting Eastern European food manufacturers with wholesale buyers across Europe.
Our registered trademark is Star Food. Company address: Sirma Voivoda St., b.1, ap. 21, Varna 9010, Bulgaria.
Phone: +359 8844 69860. Email: ubmarket2022@gmail.com.`,

  // Core products
  `Our core product is sunflower oil — we offer refined and crude sunflower oil for wholesale buyers.
Other products include: vegetable oil, frying oil (for HORECA), sugar (beet sugar), mayonnaise,
dry milk, powdered milk, and palm oil. All products are available under our Star Food brand
or as private label/white label with your own branding.`,

  // Sunflower oil details
  `Star Food Premium Sunflower Oil specifications:
- Refined deodorized sunflower oil, Grade 1
- Available packaging: 0.5L, 1L, 3L, 5L PET bottles, 10L containers, bulk (flexitank/tank truck)
- Shelf life: 12-18 months depending on packaging
- Origin: Ukraine, Bulgaria, or as sourced per order
- Certifications: ISO 22000, HACCP compliant
- Minimum order: typically 20 metric tons (1 truck load)
- Label languages: EN, BG, GR, PL, UA (customizable)`,

  // Trading terms
  `We work with standard international trade terms (Incoterms):
- FOB (Free On Board): buyer arranges shipping from our warehouse
- CIF (Cost, Insurance, Freight): we handle shipping to buyer's port
- DAP (Delivered At Place): we deliver directly to buyer's warehouse
Road transport available across 12+ EU countries. Typical delivery: 5-10 business days within EU.`,

  // Pricing approach
  `Pricing depends on current market conditions, volume, delivery terms, and packaging.
We provide personalized quotes within 24 hours. Sunflower oil market prices fluctuate —
as of early 2026, average export price is approximately $1,100-1,200 per metric ton.
We offer competitive pricing for long-term partners. Volume discounts available for orders above 100 tons.
We NEVER share exact prices in initial communications — always request a formal quote.`,

  // Partnership
  `We offer three types of partnerships:
1. Distributor — exclusive or non-exclusive distribution in your region
2. Retailer — wholesale pricing for retail chains and stores
3. HORECA — specialized products for hotels, restaurants, and catering
Benefits: competitive prices, flexible minimum order quantities, dedicated account manager,
marketing support, private label options, reliable EU supply chain.`,

  // Private label
  `Private label service: We can produce sunflower oil and other products under YOUR brand.
You provide the brand and label design — we handle production, quality control, and packaging.
Minimum order for private label: typically 20 tons. Lead time: 2-4 weeks from label approval.
We also offer our Star Food brand for distributors who want a ready-to-sell branded product.`,

  // Quality & certifications
  `Quality standards: All our products meet EU food safety regulations.
Certifications: ISO 22000 (food safety management), HACCP (hazard analysis).
Products are Non-GMO. Regular lab testing for acidity, peroxide value, and composition.
Full traceability from producer to end buyer. Certificate of Analysis provided with each shipment.`,

  // Market context
  `European sunflower oil market is valued at approximately $9.36 billion (2025),
projected to reach $12.6 billion by 2034. Main producing countries: Ukraine, Russia, Argentina, Turkey.
Bulgaria is a strategic EU gateway for Eastern European food products.
Current market: sunflower oil stocks at historic lows — buyers actively searching for reliable suppliers.`,

  // Communication style rules
  `IMPORTANT RULES FOR AI RESPONSES:
- Always be professional and warm, representing UB Market / Star Food brand
- NEVER mention specific prices — always say "we'll prepare a personalized quote"
- Address the person by name
- Reference their specific product interest and requirements
- Ask 1-2 relevant follow-up questions
- Keep response concise: 4-6 short paragraphs
- Sign as "UB Market Team" (not a specific person name)
- Respond in the SAME LANGUAGE the inquiry was made in
- Mention our 24-hour quote guarantee
- If they asked about sunflower oil, mention Star Food brand
- If bulk inquiry, mention our flexible MOQ and delivery across EU`,
];

export function getRAGContext(): string {
  return RAG_CHUNKS.join("\n\n---\n\n");
}
