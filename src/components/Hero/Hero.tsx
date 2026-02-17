"use client";

import Link from "next/link";
import { FaEnvelope, FaBoxOpen } from "react-icons/fa";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.badge}>International Food Trading</span>
        <h1 className={styles.title}>
          Premium <span className={styles.gold}>Sunflower Oil</span> &amp; Food
          Products for Europe
        </h1>
        <p className={styles.subtitle}>
          UB Market LTD connects leading manufacturers with wholesale buyers
          across Europe. Reliable supply, competitive prices, road transport
          delivery.
        </p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <Link href="/contacts" className="btn btn-primary">
            <FaEnvelope /> Request a Quote
          </Link>
          <Link href="/products" className="btn btn-outline">
            <FaBoxOpen /> View Products
          </Link>
        </div>
      </div>
      <div className={styles.fadeBottom} />
    </section>
  );
}