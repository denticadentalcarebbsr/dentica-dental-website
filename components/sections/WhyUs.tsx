import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const points = [
  {
    title: "Advanced Technology",
    desc: "Digital X-rays, OPG, RVG, rotary endodontics — the latest in diagnostic and treatment equipment.",
    icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>,
  },
  {
    title: "Patient-First Approach",
    desc: "Every treatment plan is personalised. We listen, explain, and involve you in every decision.",
    icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
  },
  {
    title: "Certified Specialists",
    desc: "Both our doctors hold MDS degrees from reputed dental institutions with specialised clinical training.",
    icon: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
  },
  {
    title: "Hygienic & Safe",
    desc: "Strict sterilisation protocols, disposable instruments, and WHO-standard infection control practices.",
    icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"/>,
  },
];

export default function WhyUs() {
  return (
    <section id="why-us">
      <div className="container">
        <div className="why-grid">
          <Reveal>
            <div className="why-img" style={{ position: "relative" }}>
              <div style={{ width: "100%", height: 460, borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
                <Image
                  src="/images/clinic-interior.png"
                  alt="Dentica Clinic Interior"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  quality={90}
                />
              </div>
              <div className="why-badge-float">
                <strong>5000+</strong>
                <span>Smiles Transformed</span>
              </div>
            </div>
          </Reveal>

          <div className="why-content">
            <Reveal>
              <div className="section-tag">Why Choose Dentica</div>
              <h2 className="section-title">Where Expertise Meets Compassion</h2>
              <p className="section-subtitle">We combine cutting-edge technology with a patient-centred approach to deliver outcomes that last.</p>
            </Reveal>
            <div className="why-points">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="why-point">
                    <div className="why-point-icon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">{p.icon}</svg>
                    </div>
                    <div className="why-point-text">
                      <strong>{p.title}</strong>
                      <span>{p.desc}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
