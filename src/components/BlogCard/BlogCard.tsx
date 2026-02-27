"use client";

import Image from "next/image";
import Link from "next/link";
import { FaClock, FaCalendar } from "react-icons/fa";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readingTime: number;
  category: string;
  locale: string;
}

export default function BlogCard({
  slug,
  title,
  description,
  image,
  date,
  readingTime,
  category,
  locale,
}: BlogCardProps) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const formattedDate = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;

  return (
    <Link href={`/${locale}/blog/${slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>
            <FaCalendar /> {formattedDate}
          </span>
          <span>
            <FaClock /> {readingTime} min
          </span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </Link>
  );
}
