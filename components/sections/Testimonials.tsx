import { Reveal } from "@/components/motion/Reveal";

const testimonials = [
  {
    initials: "PR",
    name: "Priya Rath",
    tag: "Root Canal Treatment",
    text: "Dr. Sambarta made my root canal completely painless. I was terrified going in, but walked out smiling. The clinic is spotlessly clean and the staff are incredibly kind.",
  },
  {
    initials: "SK",
    name: "Siddharth Kumar",
    tag: "Orthodontic Treatment",
    text: "Dr. Anand is an expert in orthodontics. My braces treatment was completed on time and the results are beyond what I expected. Highly recommend Dentica!",
  },
  {
    initials: "AM",
    name: "Anita Mishra",
    tag: "General Dentistry",
    text: "Best dental clinic in the area. Modern equipment, experienced doctors, and the online booking system is so convenient. My whole family comes here now.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <Reveal>
          <div className="testimonials-header">
            <div className="section-tag">What Patients Say</div>
            <h2 className="section-title">Real Stories, Real Smiles</h2>
          </div>
        </Reveal>
        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className={`testimonial-card${i === 0 ? " featured" : ""}`}>
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-tag">{t.tag}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
