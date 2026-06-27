"use client";

import { useState } from "react";

interface Props {
  faqs: { q: string; a: string }[];
}

export default function TreatmentFAQ({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
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
  );
}
