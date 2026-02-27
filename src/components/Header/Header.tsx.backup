// src/components/Header/Header.tsx — Locale-aware routing + scroll hide/show
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prefix = `/${locale}`;

  const navLinks = [
    { href: prefix, label: t?.nav?.home || "Home" },
    { href: `${prefix}/about`, label: t?.nav?.about || "About" },
    { href: `${prefix}/products`, label: t?.nav?.products || "Products" },
    { href: `${prefix}/brands/star-food`, label: t?.nav?.brand || "Star Food" },
    { href: `${prefix}/blog`, label: t?.nav?.blog || "Blog" },
    { href: `${prefix}/contacts`, label: t?.nav?.contacts || "Contacts" },
  ];

  const isActive = (href: string) => {
    if (href === prefix) {
      return pathname === prefix || pathname === `${prefix}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}>
      <div className={styles.container}>
        <Link href={prefix} className={styles.logo}>
          <Image
            src="/icons/logo.webp"
            alt="UB Market — Star Food"
            width={50}
            height={50}
            priority
          />
          <span className={styles.logoText}>
            <strong>UB Market</strong>
          </span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.active : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={`${prefix}/partners`} className={styles.partnerCta}>
          {t?.nav?.partners || "Partners"}
        </Link>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${
                  isActive(link.href) ? styles.active : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/partners`}
              className={styles.partnerCtaMobile}
              onClick={() => setMenuOpen(false)}
            >
              {t?.nav?.partners || "Partners"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
