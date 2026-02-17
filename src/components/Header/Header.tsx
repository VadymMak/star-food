"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contacts", label: "Contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Add background opacity after scrolling past hero
      setScrolled(currentY > 50);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = [
    styles.header,
    hidden ? styles.headerHidden : "",
    scrolled ? styles.headerScrolled : "",
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logoBox}>
          <Image
            src="/icons/logo.webp"
            alt="UB Market Logo"
            width={100}
            height={50}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher (placeholder) */}
        <div className={styles.langSwitch}>
          🇬🇧 EN
        </div>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileLang}>
          🇬🇧 EN
        </div>
      </div>
    </header>
  );
}