import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tier1Treatments, tier2Treatments } from "@/lib/treatments-data";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "All Dental Treatments | Dentica Bhubaneswar",
  description:
    "Complete list of dental treatments at Dentica, Bhubaneswar — from root canal and implants to orthodontics, smile design, and cosmetic dentistry. Expert MDS specialists.",
};

export default function TreatmentsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ paddingTop: 100, background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)", paddingBottom: 56 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-tag" style={{ background: "rgba(255,255,255,.2)", color: "#fff" }}>Our Services</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "12px 0 16px" }}>
            All Dental Treatments
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.8)", maxWidth: 560, margin: "0 auto 28px" }}>
            From a single filling to complete smile rehabilitation — Dentica offers the full spectrum of modern dental care.
          </p>
          <a href="/#booking-section" className="btn btn-white">Book a Consultation</a>
        </div>
      </div>

      {/* Tier 1 — flagship treatments */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-tag">Flagship Procedures</div>
            <h2 className="section-title">Specialist Treatments</h2>
            <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>Each treatment has its own dedicated page with full details, doctor attribution, and FAQs.</p>
          </div>
          <div className="services-grid">
            {tier1Treatments.map(t => (
              <Link key={t.slug} href={`/treatments/${t.slug}`} style={{ textDecoration: "none" }}>
                <div className="service-card-v2">
                  <div className="svc-circle">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="160px" />
                    ) : (
                      <span style={{ fontSize: "2.2rem" }}>{t.icon}</span>
                    )}
                  </div>
                  <div className="svc-title">{t.name}</div>
                  <div className="svc-desc">{t.tagline}</div>
                  {t.doctor && <div className="svc-doctor">{t.doctor}</div>}
                  <div className="svc-link">
                    Learn More
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2 — consolidated reference */}
      <section style={{ padding: "72px 0", background: "var(--gray-50)" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="section-tag">All Procedures</div>
            <h2 className="section-title">Other Treatments We Offer</h2>
            <p className="section-subtitle" style={{ marginBottom: 40 }}>
              In addition to our flagship treatments, Dentica provides the full range of general and specialist dental procedures. Book a consultation to discuss your specific needs.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {tier2Treatments.map(t => (
                <div key={t.name} id={t.name.toLowerCase().replace(/\s+/g, "-")} style={{ background: "#fff", borderRadius: "var(--radius)", padding: "16px 20px", border: "1px solid var(--gray-200)" }}>
                  <div style={{ fontWeight: 600, color: "var(--dark)", marginBottom: 4, fontSize: ".92rem" }}>{t.name}</div>
                  <div style={{ fontSize: ".82rem", color: "var(--gray-600)", lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <a href="/#booking-section" className="btn btn-primary">
                Book a Consultation
              </a>
              <div style={{ marginTop: 12, fontSize: ".85rem", color: "var(--gray-600)" }}>
                or call <a href={`tel:${siteConfig.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}>{siteConfig.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
