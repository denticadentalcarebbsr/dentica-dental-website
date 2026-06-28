"use client";

import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero">
      <div className="hero-bg">
        <Image
          src="/images/hero-bg.png"
          alt="Dentica Clinic Interior"
          fill
          className="hero-bg-img"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={90}
        />
      </div>
      <div className="hero-overlay" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">Now Accepting New Patients</div>
          <h1 className="hero-title">
            Advanced Dental Care<br />for a <span>Perfect Smile</span>
          </h1>
          <p className="hero-desc">
            Dentica brings world-class oral care under one roof — from root canals to orthodontics — with experienced MDS specialists dedicated to your comfort and confidence.
          </p>
          <div className="hero-actions">
            <button className="btn btn-white" onClick={() => scrollTo("booking-section")}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Book Appointment
            </button>
            <button className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,.6)" }} onClick={() => scrollTo("doctors")}>
              Meet Our Doctors
            </button>
          </div>
        </div>
      </div>
      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-num"><CountUp to={10} suffix="+" /></span>
          <span className="hero-stat-label">Years Experience</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num"><CountUp to={5000} suffix="+" /></span>
          <span className="hero-stat-label">Happy Patients</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num">2 MDS</span>
          <span className="hero-stat-label">Specialists</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-num"><CountUp to={98} suffix="%" /></span>
          <span className="hero-stat-label">Success Rate</span>
        </div>
      </div>
    </section>
  );
}
