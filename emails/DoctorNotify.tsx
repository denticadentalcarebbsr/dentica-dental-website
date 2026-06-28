import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Hr, Link,
} from "@react-email/components";
import { siteConfig } from "@/lib/site-config";

interface Props {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferred_window?: string;
  message?: string;
  created_at: string;
}

export default function DoctorNotify({
  name, phone, email, service, preferred_window, message, created_at,
}: Props) {
  const adminUrl = `${siteConfig.url}/admin/inquiries`;

  return (
    <Html lang="en">
      <Head />
      <Preview>🦷 New patient inquiry from {name} — {service || "General"} | Dentica</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Dentica Admin</Heading>
            <Text style={headerSub}>NEW PATIENT INQUIRY ALERT</Text>
          </Section>

          {/* Alert band */}
          <Section style={alertBand}>
            <Text style={alertText}>🦷 &nbsp;Action Required — New Appointment Request</Text>
          </Section>

          {/* Body */}
          <Section style={bodySection}>
            <Text style={receivedAt}>Received: {created_at} IST</Text>

            {/* Patient details */}
            <Text style={sectionLabel}>Patient Details</Text>
            <Section style={detailBox}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                {[
                  { label: "Full Name", value: name, highlight: true },
                  { label: "Phone", value: phone, highlight: true },
                  { label: "Email", value: email || "Not provided" },
                  { label: "Service Requested", value: service || "Not specified", highlight: true },
                  { label: "Preferred Time", value: preferred_window || "Any available slot" },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={rowLabel}>{row.label}</td>
                    <td style={row.highlight ? rowValueHighlight : rowValue}>{row.value}</td>
                  </tr>
                ))}
              </table>
            </Section>

            {/* Message */}
            {message && (
              <>
                <Text style={sectionLabel}>Patient Message</Text>
                <Section style={messageBox}>
                  <Text style={messageText}>"{message}"</Text>
                </Section>
              </>
            )}

            <Hr style={divider} />

            {/* CTA */}
            <Section style={ctaSection}>
              <Text style={ctaText}>
                Log in to the admin panel to view, update status, and manage this inquiry.
              </Text>
              <Link href={adminUrl} style={ctaButton}>
                View in Admin Panel →
              </Link>
            </Section>

            <Hr style={divider} />

            <Text style={reminderText}>
              💡 Tip: Call the patient within 2–4 hours for best conversion. Confirm the slot and update the status to "Contacted" in the admin panel.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated alert from{" "}
              <Link href={siteConfig.url} style={footerLink}>{siteConfig.name}</Link>
            </Text>
            <Text style={footerText}>
              {siteConfig.address.line1}, {siteConfig.address.city} · {siteConfig.phoneDisplay}
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  background: "#F3F4F6",
  margin: 0,
  padding: "40px 0",
};
const container: React.CSSProperties = {
  maxWidth: 580,
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
};
const header: React.CSSProperties = {
  background: "#0D1B5E",
  padding: "28px 40px",
  textAlign: "center",
};
const headerTitle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
  fontFamily: "Georgia, serif",
};
const headerSub: React.CSSProperties = {
  color: "rgba(255,255,255,0.5)",
  fontSize: 10,
  letterSpacing: "0.15em",
  margin: "6px 0 0",
  textTransform: "uppercase",
};
const alertBand: React.CSSProperties = {
  background: "#F59E0B",
  padding: "12px 40px",
  textAlign: "center",
};
const alertText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: 13,
  fontWeight: 700,
  margin: 0,
  letterSpacing: "0.04em",
};
const bodySection: React.CSSProperties = {
  padding: "32px 40px",
};
const receivedAt: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: 12,
  margin: "0 0 24px",
};
const sectionLabel: React.CSSProperties = {
  color: "#0D1B5E",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  margin: "0 0 10px",
};
const detailBox: React.CSSProperties = {
  background: "#F9FAFB",
  border: "1px solid #E5E7EB",
  borderRadius: 10,
  padding: "4px 20px",
  marginBottom: 24,
};
const rowLabel: React.CSSProperties = {
  color: "#6B7280",
  fontSize: 13,
  fontWeight: 500,
  padding: "11px 16px 11px 0",
  borderBottom: "1px solid #F3F4F6",
  width: "38%",
  verticalAlign: "top",
};
const rowValue: React.CSSProperties = {
  color: "#374151",
  fontSize: 13,
  padding: "11px 0",
  borderBottom: "1px solid #F3F4F6",
  verticalAlign: "top",
};
const rowValueHighlight: React.CSSProperties = {
  ...rowValue,
  color: "#0D1B5E",
  fontWeight: 700,
};
const messageBox: React.CSSProperties = {
  background: "#FFF8F0",
  border: "1px solid #FDE68A",
  borderLeft: "4px solid #F59E0B",
  borderRadius: 8,
  padding: "14px 18px",
  marginBottom: 24,
};
const messageText: React.CSSProperties = {
  color: "#374151",
  fontSize: 14,
  lineHeight: "1.7",
  margin: 0,
  fontStyle: "italic",
};
const divider: React.CSSProperties = {
  borderColor: "#E5E7EB",
  margin: "24px 0",
};
const ctaSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 24,
};
const ctaText: React.CSSProperties = {
  color: "#4B5563",
  fontSize: 14,
  margin: "0 0 16px",
};
const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "#1B3A8B",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 700,
  padding: "12px 32px",
  borderRadius: 8,
  textDecoration: "none",
  letterSpacing: "0.02em",
};
const reminderText: React.CSSProperties = {
  color: "#6B7280",
  fontSize: 13,
  lineHeight: "1.6",
  background: "#F0FDF4",
  border: "1px solid #BBF7D0",
  borderRadius: 8,
  padding: "12px 16px",
  margin: 0,
};
const footer: React.CSSProperties = {
  background: "#0D1B5E",
  padding: "20px 40px",
  textAlign: "center",
};
const footerText: React.CSSProperties = {
  color: "rgba(255,255,255,0.45)",
  fontSize: 11,
  margin: "4px 0",
  lineHeight: "1.6",
};
const footerLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.65)",
  textDecoration: "underline",
};
