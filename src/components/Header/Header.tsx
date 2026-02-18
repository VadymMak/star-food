// src/components/Header/Header.tsx — Locale-aware routing
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  const prefix = `/${locale}`;

  const navLinks = [
    { href: prefix, label: t?.nav?.home || "Home" },
    { href: `${prefix}/about`, label: t?.nav?.about || "About" },
    { href: `${prefix}/products`, label: t?.nav?.products || "Products" },
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
    <header className={styles.header}>
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
          </nav>
        </div>
      )}
    </header>
  );
}
