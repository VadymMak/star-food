import {
  FaTruckLoading,
  FaBox,
  FaOilCan,
  FaDolly,
  FaFileInvoice,
  FaGlobeEurope,
  FaCheck,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import styles from "./Logistics.module.css";

const deliveryOptions = [
  { icon: <FaTruckLoading />, label: "Road Transport (EU)" },
  { icon: <FaBox />, label: "PET Bottles (0.5–10L)" },
  { icon: <FaOilCan />, label: "Bulk Tank Trucks" },
  { icon: <FaDolly />, label: "Palletized Cargo" },
  { icon: <FaFileInvoice />, label: "FOB / CIF / DAP" },
  { icon: <FaGlobeEurope />, label: "Pan-European Delivery" },
];

const qualityStandards = [
  { icon: <FaCheck />, label: "ISO Certified Suppliers" },
  { icon: <FaCheck />, label: "HACCP Compliance" },
  { icon: <FaCheck />, label: "Non-GMO Available" },
  { icon: <FaCheck />, label: "Full Documentation" },
  { icon: <FaCheck />, label: "Lab Test Reports" },
  { icon: <FaCheck />, label: "EU Food Safety Standards" },
];

export default function Logistics() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label">Logistics &amp; Quality</span>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            Built for B2B Trading
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaTruck className={styles.boxIcon} /> Delivery Options
            </h3>
            <div className={styles.tagList}>
              {deliveryOptions.map((item) => (
                <div key={item.label} className={styles.tag}>
                  <span className={styles.tagIcon}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.box}>
            <h3 className={styles.boxTitle}>
              <FaShieldAlt className={styles.boxIcon} /> Quality Standards
            </h3>
            <div className={styles.tagList}>
              {qualityStandards.map((item) => (
                <div key={item.label} className={styles.tag}>
                  <span className={styles.tagIcon}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}