import styles from "./HowWeWork.module.css";

const steps = [
  {
    number: "1",
    title: "Contact & Inquiry",
    text: "Tell us what you need — product type, volume, delivery destination. We'll respond within 24 hours.",
  },
  {
    number: "2",
    title: "Quote & Agreement",
    text: "We provide competitive pricing, arrange product samples if needed, and finalize the contract terms.",
  },
  {
    number: "3",
    title: "Delivery & Support",
    text: "Products are shipped via road transport with full documentation. We ensure on-time delivery and ongoing support.",
  },
];

export default function HowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">How We Work</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            Simple Process, Reliable Results
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From first contact to delivery — we handle everything to ensure a
            smooth trading experience.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.number}>{step.number}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}