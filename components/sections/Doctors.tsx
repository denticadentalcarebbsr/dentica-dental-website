"use client";

import Image from "next/image";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/Reveal";
import { useCardTilt } from "@/lib/hooks/useCardTilt";

const doctors = [
  {
    id: "sambarta",
    name: "Prof.(Dr) Sambarta Das",
    spec: "MDS – Endodontics & Conservative Dentistry",
    badge: "Root Canal Specialist",
    bio: "A passionate and dedicated root canal specialist with over 16 years of clinical and academic excellence. BDS from Chennai, Masters from Kolkata, with a strong foundation in advanced endodontic care and education. Currently serving as Professor and PG Guide, mentoring future dental professionals while delivering quality patient care with precision, compassion, and expertise.",
    quals: ["BDS (Chennai) · MDS Endodontics (Kolkata)", "Professor & PG Guide", "16+ Years Clinical & Academic Experience"],
    photo: "/images/doctors/sambarta.jpg",
    objectPosition: "center top",
    videoKey: "drSambarta" as const,
  },
  {
    id: "anand",
    name: "Prof.(Dr) Anand Garabadu",
    spec: "MDS – Orthodontics & Dentofacial Orthopaedics",
    badge: "Orthodontics & Clear Aligners",
    bio: "20 years of clinical experience and 16 years in academic teaching. Graduate and postgraduate training under Rajiv Gandhi University of Health Sciences. Currently serving as Professor and PG Guide. Has treated more than 2,500 orthodontic cases. First Invisalign-certified specialist in Odisha, with clear aligner expertise since 2017.",
    quals: ["BDS, MDS Orthodontics (RGUHS)", "2,500+ Orthodontic Cases", "First Invisalign-Certified in Odisha · Since 2017"],
    photo: "/images/doctors/anand.jpg",
    objectPosition: "center 15%",
    videoKey: "drAnand" as const,
  },
];

function DoctorCard({ doc, delay }: { doc: (typeof doctors)[0]; delay: number }) {
  const tiltRef = useCardTilt<HTMLDivElement>();
  const scrollToBooking = () =>
    document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <Reveal delay={delay}>
      <div ref={tiltRef} className="doctor-card">
        <div className="doctor-photo">
          <Image
            src={doc.photo}
            alt={doc.name}
            width={600}
            height={360}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: doc.objectPosition }}
            priority
          />
          <div className="doctor-badge">{doc.badge}</div>
        </div>
        <div className="doctor-info">
          <div className="doctor-name">{doc.name}</div>
          <div className="doctor-spec">{doc.spec}</div>
          <p className="doctor-bio">{doc.bio}</p>
          <div className="doctor-quals">
            {doc.quals.map(q => <span key={q} className="qual-tag">{q}</span>)}
          </div>
          <VideoPlaceholder
            videoId={siteConfig.video[doc.videoKey]}
            title={`${doc.name} — Introduction`}
            height="200px"
          />
          <div className="doctor-actions" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" onClick={scrollToBooking}>Book Appointment</button>
            <button className="btn btn-outline" onClick={scrollToContact}>Contact</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Doctors() {
  return (
    <section id="doctors">
      <div className="container">
        <Reveal>
          <div className="doctors-header">
            <div className="section-tag">Our Specialists</div>
            <h2 className="section-title">Meet Your Doctors</h2>
            <p className="section-subtitle text-center">
              Experienced, compassionate MDS specialists dedicated to delivering the highest standard of oral care.
            </p>
          </div>
        </Reveal>
        <div className="doctors-grid">
          {doctors.map((doc, i) => (
            <DoctorCard key={doc.id} doc={doc} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
