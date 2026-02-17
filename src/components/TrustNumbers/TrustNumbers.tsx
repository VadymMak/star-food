import styles from "./TrustNumbers.module.css";

const stats = [
  { number: "3+", label: "Years in Business" },
  { number: "12+", label: "Countries Served" },
  { number: "500+", label: "Tons Delivered" },
  { number: "50+", label: "Partner Companies" },
];

export default function TrustNumbers() {
  return (
    <section className={styles.trust}>
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.label} className={styles.item}>
            <div className={styles.number}>{item.number}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}