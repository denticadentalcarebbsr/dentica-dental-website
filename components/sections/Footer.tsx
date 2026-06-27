import Link from "next/link";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import { siteConfig } from "@/lib/site-config";
import { tier1Treatments } from "@/lib/treatments-data";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <Image src="/images/logo.png" alt="Dentica" width={44} height={44} style={{ height: 44, width: "auto", objectFit: "contain" }} />
              <div className="logo-text">
                <strong>Dentica</strong>
                <span>An Advanced Oral Care Centre</span>
              </div>
            </Link>
            <p className="footer-desc">Where advanced technology meets compassionate care. Your smile is our life's work.</p>
            <SocialIcons className="mt-4" />
          </div>

          <div>
            <div className="footer-heading">Treatments</div>
            <div className="footer-links">
              {tier1Treatments.map(t => (
                <Link key={t.slug} href={`/treatments/${t.slug}`}>{t.shortName}</Link>
              ))}
              <Link href="/treatments">All Treatments →</Link>
            </div>
          </div>

          <div>
            <div className="footer-heading">Quick Links</div>
            <div className="footer-links">
              <a href="/#doctors">Our Doctors</a>
              <a href="/#why-us">About Us</a>
              <a href="/#testimonials">Reviews</a>
              <a href="/#faq">FAQ</a>
              <Link href="/blog">Blog</Link>
              <a href="/#contact">Contact</a>
            </div>
          </div>

          <div>
            <div className="footer-heading">Specialists</div>
            <div className="footer-links">
              <a href="/#doctors">Dr. Sambarta Das</a>
              <a href="/#doctors">Dr. Anand Garabadu</a>
            </div>
            <div className="footer-heading" style={{ marginTop: 24 }}>Hours</div>
            <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.8 }}>
              Mon–Sat: 9AM – 1PM<br />2PM – 7PM<br />Sunday: Closed
            </div>
            <div style={{ marginTop: 12, fontSize: ".82rem", color: "rgba(255,255,255,.5)" }}>
              <a href={`tel:${siteConfig.phone}`} style={{ color: "rgba(255,255,255,.6)" }}>{siteConfig.phoneDisplay}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Dentica. All rights reserved. Crafted with care by <a href="https://yuktraai.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.5)" }}>YuktraAI</a>.</div>
          <Link href="/admin" style={{ fontSize: ".82rem", color: "rgba(255,255,255,.2)", transition: "color .25s" }} className="footer-admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
