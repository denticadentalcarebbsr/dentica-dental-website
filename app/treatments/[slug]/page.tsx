import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTreatmentBySlug, generateStaticParams as getParams } from "@/lib/treatments-data";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TreatmentFAQ from "@/components/treatments/TreatmentFAQ";

export { getParams as generateStaticParams };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);
  if (!t) return { title: "Treatment Not Found" };
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: { title: t.metaTitle, description: t.metaDescription },
  };
}

const doctorPhotos: Record<string, string> = {
  sambarta: "/images/doctors/sambarta.jpg",
  anand: "/images/doctors/anand.jpg",
};

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const t = getTreatmentBySlug(slug);
  if (!t) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t.jsonLdName,
    description: t.description,
    procedureType: "Noninvasive",
    status: "EventScheduled",
    provider: {
      "@type": "Dentist",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.line1,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.pincode,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <div style={{ paddingTop: 100, background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)", paddingBottom: 64, position: "relative", overflow: "hidden" }}>
        {t.image && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image src={t.image} alt={t.name} fill style={{ objectFit: "cover", opacity: 0.13 }} />
          </div>
        )}
        <div className="container" style={{ maxWidth: 860, position: "relative", zIndex: 1 }}>
          <Link href="/treatments" style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← All Treatments
          </Link>
          <div className="section-tag" style={{ background: "rgba(255,255,255,.2)", color: "#fff" }}>Treatment</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "12px 0 16px" }}>
            {t.name}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.82)", lineHeight: 1.7, maxWidth: 620 }}>{t.tagline}</p>
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={`/#booking-section?service=${encodeURIComponent(t.name)}`} className="btn btn-white">
              Book Consultation
            </a>
            <a href={`tel:${siteConfig.phone}`} className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,.5)", color: "#fff" }}>
              Call {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 56, alignItems: "start" }}>

            {/* Left: content */}
            <div>
              {t.image && (
                <div style={{ width: "100%", height: 280, borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative", marginBottom: 32 }}>
                  <Image src={t.image} alt={t.name} fill style={{ objectFit: "cover", objectPosition: "center" }} quality={85} />
                </div>
              )}
              <p style={{ fontSize: "1.05rem", color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 48 }}>
                {t.description}
              </p>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--dark)", marginBottom: 20 }}>
                What it Involves
              </h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
                {t.whatItInvolves.map(step => (
                  <li key={step} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: ".95rem", color: "var(--gray-700, #374151)", lineHeight: 1.6 }}>
                    <span style={{ width: 22, height: 22, background: "rgba(27,58,139,.1)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="var(--primary)" strokeWidth="3"><path strokeLinecap="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {step}
                  </li>
                ))}
              </ul>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--dark)", marginBottom: 20 }}>
                Who it's For
              </h2>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 48 }}>
                {t.whoItsFor.map(w => (
                  <li key={w} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: ".95rem", color: "var(--gray-700, #374151)", lineHeight: 1.6 }}>
                    <span style={{ color: "var(--accent)", fontSize: "1.1rem", lineHeight: 1.4, flexShrink: 0 }}>→</span>
                    {w}
                  </li>
                ))}
              </ul>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--dark)", marginBottom: 20 }}>
                Frequently Asked Questions
              </h2>
              <TreatmentFAQ faqs={t.faqs} />
            </div>

            {/* Right: sidebar */}
            <div style={{ position: "sticky", top: 120 }}>
              {/* Doctor card */}
              {t.doctor && t.doctorSlug && (
                <div style={{ background: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 20, border: "1px solid var(--gray-200)" }}>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--gray-600)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>
                    Your Specialist
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "3px solid #fff", boxShadow: "var(--shadow-sm)" }}>
                      <Image
                        src={doctorPhotos[t.doctorSlug]}
                        alt={t.doctor}
                        width={64}
                        height={64}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--dark)", fontSize: ".95rem" }}>{t.doctor}</div>
                      <div style={{ fontSize: ".8rem", color: "var(--accent)", fontWeight: 600 }}>
                        {t.doctorSlug === "sambarta" ? "MDS Endodontics" : "MDS Orthodontics"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div style={{ background: "var(--primary)", borderRadius: "var(--radius-lg)", padding: 28, color: "#fff" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: 12 }}>Book a Consultation</h3>
                <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.8)", lineHeight: 1.6, marginBottom: 20 }}>
                  Our team will confirm your appointment within 2–4 hours.
                </p>
                <a href={`/#booking-section`} className="btn btn-white" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                  Request Appointment
                </a>
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <a href={`tel:${siteConfig.phone}`} style={{ color: "rgba(255,255,255,.7)", fontSize: ".82rem" }}>{siteConfig.phoneDisplay}</a>
                </div>
              </div>

              <div style={{ marginTop: 16, background: "var(--gray-50)", borderRadius: "var(--radius)", padding: 16, border: "1px solid var(--gray-200)" }}>
                <div style={{ fontSize: ".78rem", color: "var(--gray-600)", lineHeight: 1.7 }}>
                  🕐 <strong>Clinic Hours</strong><br />
                  Mon–Sat: 9AM–1PM & 2PM–7PM<br />
                  Sunday: Closed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
