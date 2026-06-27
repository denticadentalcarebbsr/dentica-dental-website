"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is root canal treatment painful?",
    a: "Modern root canal therapy performed by Dr. Sambarta Das is virtually painless. We use advanced anaesthesia techniques and rotary endodontics to ensure a comfortable, efficient experience.",
  },
  {
    q: "How long does orthodontic treatment take?",
    a: "Treatment duration varies based on complexity — typically 12 to 24 months for braces. Clear aligners may be faster for mild to moderate cases. Dr. Anand will give you a precise timeline after assessment.",
  },
  {
    q: "Do you treat children?",
    a: "Yes! Dentica provides gentle, child-friendly dental care. We recommend bringing children for their first dental visit as early as age 2–3. Early visits help build positive associations with dental health.",
  },
  {
    q: "What are your clinic timings?",
    a: "We are open Monday to Saturday, 9:00 AM – 1:00 PM and 2:00 PM – 7:00 PM. Sunday appointments may be available on special request. Please call or book online in advance.",
  },
  {
    q: "Do I need a referral to book?",
    a: "No referral needed. You can book directly online or call us. Walk-ins are also welcome subject to availability. We recommend booking in advance to secure your preferred slot.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq">
      <div className="container">
        <div className="faq-grid">
          <div>
            <div className="section-tag">Have Questions?</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know before your visit at Dentica.</p>
            <div style={{ marginTop: 32 }}>
              <button className="btn btn-primary" onClick={() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" })}>
                Book a Consultation
              </button>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className={`faq-q ${open === i ? "active" : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {faq.q}
                  <svg className="chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`faq-a ${open === i ? "open" : ""}`}>
                  <div className="faq-a-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
