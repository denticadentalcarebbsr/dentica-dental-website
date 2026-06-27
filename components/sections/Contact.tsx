import { siteConfig } from "@/lib/site-config";

export default function Contact() {
  const { phone, phoneDisplay, email, address, hours, mapsEmbedUrl, mapsUrl } = siteConfig;

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-tag" style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>Get In Touch</div>
            <h2 className="section-title">Visit Dentica Today</h2>
            <p className="section-subtitle">We're here to answer your questions and help you on your journey to a healthier smile.</p>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg></div>
                <div className="contact-item-text">
                  <strong>Address</strong>
                  <span>{siteConfig.name}<br />{address.line1}<br />{address.city}, {address.state} – {address.pincode}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div>
                <div className="contact-item-text">
                  <strong>Phone</strong>
                  <span><a href={`tel:${phone}`} style={{ color: "inherit" }}>{phoneDisplay}</a></span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                <div className="contact-item-text">
                  <strong>Clinic Hours</strong>
                  <span>{hours.weekdays}<br />{hours.weekend}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  <span><a href={`mailto:${email}`} style={{ color: "inherit" }}>{email}</a></span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", height: 320, border: "1px solid rgba(255,255,255,.1)" }}>
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dentica – An Advanced Oral Care Centre"
              />
            </div>
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,.3)", color: "rgba(255,255,255,.7)", fontSize: ".8rem", padding: "8px 18px" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
