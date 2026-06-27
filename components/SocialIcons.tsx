import { siteConfig } from "@/lib/site-config";

const isTBD = (url: string) => url.includes("TBD") || url === "";

export default function SocialIcons({ className = "" }: { className?: string }) {
  const { instagram, facebook } = siteConfig.social;

  return (
    <div className={`social-icons ${className}`}>
      {!isTBD(facebook) && (
        <a href={facebook} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      )}
      {!isTBD(instagram) && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      )}
      {isTBD(facebook) && isTBD(instagram) && (
        <>
          <span className="social-icon" aria-label="Facebook" style={{ cursor: "default", opacity: .5 }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </span>
          <span className="social-icon" aria-label="Instagram" style={{ cursor: "default", opacity: .5 }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </span>
        </>
      )}
    </div>
  );
}
