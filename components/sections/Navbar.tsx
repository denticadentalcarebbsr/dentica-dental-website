"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">
              <Image
                src="/images/logo.png"
                alt="Dentica Logo"
                width={52}
                height={52}
                style={{ height: 52, width: "auto", borderRadius: 8, objectFit: "contain" }}
                priority
              />
              <div className="logo-text">
                <strong>Dentica</strong>
                <span>An Advanced Oral Care Centre</span>
              </div>
            </Link>

            <div className="nav-links">
              <Link href="/treatments">Treatments</Link>
              <a href="#doctors" onClick={e => { e.preventDefault(); scrollTo("doctors"); }}>Our Doctors</a>
              <a href="#why-us" onClick={e => { e.preventDefault(); scrollTo("why-us"); }}>About</a>
              <a href="#testimonials" onClick={e => { e.preventDefault(); scrollTo("testimonials"); }}>Reviews</a>
              <Link href="/blog">Blog</Link>
              <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
            </div>

            <div className="nav-cta">
              <a href="#booking-section" className="btn btn-accent" onClick={e => { e.preventDefault(); scrollTo("booking-section"); }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book Appointment
              </a>
            </div>

            <div className="hamburger" onClick={() => setMobileOpen(true)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: "var(--dark)", zIndex: 1500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,.1)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.3rem" }}>✕</button>
          <Link href="/treatments" onClick={() => setMobileOpen(false)} style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600 }}>Treatments</Link>
          {["doctors","why-us","testimonials","contact"].map(id => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }} style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600, textTransform: "capitalize" }}>
              {id === "why-us" ? "About" : id === "booking-section" ? "Book" : id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")}
            </a>
          ))}
          <Link href="/blog" onClick={() => setMobileOpen(false)} style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600 }}>Blog</Link>
          <a href="#booking-section" className="btn btn-accent" onClick={e => { e.preventDefault(); scrollTo("booking-section"); setMobileOpen(false); }}>Book Appointment</a>
          <SocialIcons />
        </div>
      )}
    </>
  );
}
