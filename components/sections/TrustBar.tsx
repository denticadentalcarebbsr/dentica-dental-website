import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

export default function TrustBar() {
  return (
    <section id="trust">
      <div className="container">
        <div className="trust-grid">
          <Reveal delay={0}>
            <div className="trust-item">
              <div className="trust-num"><CountUp to={10} suffix="+" /></div>
              <div className="trust-label">Years of Excellence</div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="trust-item">
              <div className="trust-num"><CountUp to={5000} suffix="+" /></div>
              <div className="trust-label">Patients Treated</div>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="trust-item">
              <div className="trust-num">2 MDS</div>
              <div className="trust-label">Specialist Doctors</div>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="trust-item">
              <div className="trust-num"><CountUp to={6} /></div>
              <div className="trust-label">Specialisations</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
