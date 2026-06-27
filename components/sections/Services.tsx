import Link from "next/link";
import Image from "next/image";
import { tier1Treatments } from "@/lib/treatments-data";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="services-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Specialist Dental Treatments</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>
            From preventive care to full-mouth rehabilitation — our MDS specialists deliver world-class treatment across all major disciplines.
          </p>
        </div>
        <div className="services-grid">
          {tier1Treatments.map(t => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} style={{ textDecoration: "none" }}>
              <div className="service-card-v2">
                {/* Circular image */}
                <div className="svc-circle">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      sizes="160px"
                    />
                  ) : (
                    <span style={{ fontSize: "2.2rem" }}>{t.icon}</span>
                  )}
                </div>
                {/* Text */}
                <div className="svc-title">{t.name}</div>
                <div className="svc-desc">{t.tagline}</div>
                {t.doctor && (
                  <div className="svc-doctor">{t.doctor}</div>
                )}
                <div className="svc-link">
                  Learn More
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/treatments" className="btn btn-outline">
            View All Treatments
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
