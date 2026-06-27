import VideoPlaceholder from "@/components/VideoPlaceholder";
import { siteConfig } from "@/lib/site-config";

export default function ClinicVideo() {
  return (
    <section id="clinic-video">
      <div className="container">
        <div className="clinic-video-inner">
          <div>
            <div className="section-tag">Our Story</div>
            <h2 className="section-title">Watch Us in Action</h2>
            <p className="section-subtitle" style={{ marginBottom: 24 }}>
              Take a virtual tour of Dentica — see our state-of-the-art facilities, meet our team, and discover why thousands of patients trust us with their smiles.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", paddingLeft: 0 }}>
              {["Advanced digital X-ray & OPG imaging", "Sterile, WHO-standard treatment rooms", "Caring team dedicated to your comfort"].map(pt => (
                <li key={pt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: ".9rem", color: "var(--gray-600)" }}>
                  <span style={{ width: 20, height: 20, background: "rgba(27,58,139,.1)", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="var(--primary)" strokeWidth="3"><path strokeLinecap="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <VideoPlaceholder
            videoId={siteConfig.video.clinicAd}
            title="Watch Our Story"
            height="320px"
          />
        </div>
      </div>
    </section>
  );
}
