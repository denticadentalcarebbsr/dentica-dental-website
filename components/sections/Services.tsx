"use client";

import Link from "next/link";
import Image from "next/image";
import { tier1Treatments } from "@/lib/treatments-data";
import { Reveal } from "@/components/motion/Reveal";
import { useCardTilt } from "@/lib/hooks/useCardTilt";

function ServiceCard({ t, featured }: { t: typeof tier1Treatments[0]; featured?: boolean }) {
  const tiltRef = useCardTilt<HTMLDivElement>();
  return (
    <Link href={`/treatments/${t.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div ref={tiltRef} className={`service-card service-card-v2${featured ? " featured" : ""}`}>
        <div className={`svc-circle${featured ? " svc-circle-lg" : ""}`}>
          {t.image ? (
            <Image
              src={t.image}
              alt={t.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes={featured ? "200px" : "160px"}
            />
          ) : (
            <span style={{ fontSize: featured ? "3rem" : "2.2rem" }}>{t.icon}</span>
          )}
        </div>
        <div className="svc-title">{t.name}</div>
        <div className="svc-desc">{t.tagline}</div>
        {t.doctor && <div className="svc-doctor">{t.doctor}</div>}
        <div className="svc-link">
          Learn More
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <Reveal>
          <div className="services-header">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Specialist Dental Treatments</h2>
            <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>
              From preventive care to full-mouth rehabilitation — our MDS specialists deliver world-class treatment across all major disciplines.
            </p>
          </div>
        </Reveal>
        <div className="services-grid">
          {tier1Treatments.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 80}>
              <ServiceCard t={t} featured={t.slug === "orthodontics"} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/treatments" className="btn btn-outline">
              View All Treatments
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
