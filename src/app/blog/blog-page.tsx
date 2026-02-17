import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog | Star Food — Market News & Industry Insights",
  description:
    "Stay updated with the latest news on sunflower oil markets, food trading insights, and industry trends from UB Market LTD.",
};

const upcomingPosts = [
  {
    title: "How We Created the Star Food Label Design",
    category: "Brand Story",
    date: "Coming Soon",
  },
  {
    title: "Sunflower Oil Market Trends in 2026",
    category: "Market Analysis",
    date: "Coming Soon",
  },
  {
    title: "From Farm to Your Table — Our Supply Chain",
    category: "Behind the Scenes",
    date: "Coming Soon",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="section-label">Blog</span>
          <h1
            className="section-title"
            style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
          >
            News &amp; Insights
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Market updates, industry trends, and stories from the world of food
            trading.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.comingSoon}>
          <h2 className={styles.comingTitle}>Blog is Coming Soon</h2>
          <p className={styles.comingText}>
            We&apos;re preparing our first articles about sunflower oil markets,
            food industry trends, and behind-the-scenes stories. Stay tuned!
          </p>
        </div>

        <div className={styles.grid}>
          {upcomingPosts.map((post) => (
            <div key={post.title} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>{post.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{post.title}</h3>
            </div>
          ))}
        </div>

        <div className={styles.back}>
          <Link href="/" className="btn btn-outline">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}