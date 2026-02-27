"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const t = useTranslations();

  useEffect(() => {
    const headings = document.querySelectorAll(
      ".blog-content h2, .blog-content h3",
    );
    const tocItems: TocItem[] = [];

    headings.forEach((h, index) => {
      const id = `section-${index}`;
      h.setAttribute("id", id);
      tocItems.push({
        id,
        text: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      });
    });

    setItems(tocItems);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.toc}>
      <h4 className={styles.title}>{t("blogPost.contents")}</h4>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${item.level === 3 ? styles.sub : ""} ${activeId === item.id ? styles.active : ""}`}
          >
            <a
              href={`#${item.id}`}
              className={styles.link}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
