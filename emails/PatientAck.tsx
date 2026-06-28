import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Hr, Link, Img, Row, Column,
} from "@react-email/components";
import { siteConfig } from "@/lib/site-config";

interface Props {
  name: string;
  service?: string;
  preferred_window?: string;
  message?: string;
}

export default function PatientAck({ name, service, preferred_window, message }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Appointment inquiry received — we'll confirm your slot shortly, {name}!</Preview>
      <Body style={body}>

        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tr>
                <td style={{ textAlign: "center", paddingBottom: 8 }}>
                  <Heading style={headerTitle}>Dentica</Heading>
                  <Text style={headerSub}>AN ADVANCED ORAL CARE CENTRE</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Hero band */}
          <Section style={heroBand}>
            <Text style={heroBandText}>✓ &nbsp;Appointment Request Received</Text>
          </Section>

          {/* Body */}
          <Section style={bodySection}>
            <Heading as="h2" style={greeting}>Dear {name},</Heading>
            <Text style={para}>
              Thank you for reaching out to us! We have received your appointment request and our team will contact you within <strong>2–4 hours</strong> on clinic days to confirm your slot.
            </Text>

            {/* Details box */}
            <Section style={detailBox}>
              <Text style={detailBoxTitle}>Your Request Summary</Text>
              <Hr style={detailDivider} />
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td style={detailLabel}>Service</td>
                  <td style={detailValue}>{service || "General Consultation"}</td>
                </tr>
                <tr>
                  <td style={detailLabel}>Preferred Time</td>
                  <td style={detailValue}>{preferred_window || "Any available slot"}</td>
                </tr>
                {message && (
                  <tr>
                    <td style={detailLabel}>Your Message</td>
                    <td style={detailValue}>{message}</td>
                  </tr>
                )}
              </table>
            </Section>

            <Text style={para}>
              If you need to reach us before we get back to you, please don't hesitate to call or WhatsApp us directly.
            </Text>

            {/* Contact strip */}
            <Section style={contactStrip}>
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td style={contactItem}>
                    <Text style={contactIcon}>📞</Text>
                    <Text style={contactText}>{siteConfig.phoneDisplay}</Text>
                  </td>
                  <td style={contactItem}>
                    <Text style={contactIcon}>📧</Text>
                    <Text style={contactText}>{siteConfig.email}</Text>
                  </td>
                  <td style={contactItem}>
                    <Text style={contactIcon}>🕐</Text>
                    <Text style={contactText}>Mon–Sat: 9AM–7PM</Text>
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={divider} />

            <Text style={address}>
              📍 &nbsp;{siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.pincode}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Dentica – An Advanced Oral Care Centre. All rights reserved.
            </Text>
            <Text style={footerText}>
              This email was sent because you submitted an inquiry on{" "}
              <Link href={siteConfig.url} style={footerLink}>{siteConfig.domain}</Link>
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
  background: "linear-gradient(135deg, #0D1B5E 0%, #1B3A8B 60%, #2350B8 100%)",
  padding: "36px 40px 28px",
  textAlign: "center",
};
const headerTitle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  fontFamily: "Georgia, 'Times New Roman', serif",
  letterSpacing: "0.02em",
};
const headerSub: React.CSSProperties = {
  color: "rgba(255,255,255,0.65)",
  fontSize: 10,
  letterSpacing: "0.15em",
  margin: "6px 0 0",
  textTransform: "uppercase",
};
const heroBand: React.CSSProperties = {
  background: "#10B981",
  padding: "12px 40px",
  textAlign: "center",
};
const heroBandText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 700,
  margin: 0,
  letterSpacing: "0.05em",
};
const bodySection: React.CSSProperties = {
  padding: "36px 40px",
};
const greeting: React.CSSProperties = {
  color: "#0D1B5E",
  fontSize: 22,
  fontFamily: "Georgia, serif",
  marginBottom: 12,
};
const para: React.CSSProperties = {
  color: "#4B5563",
  fontSize: 15,
  lineHeight: "1.75",
  margin: "0 0 20px",
};
const detailBox: React.CSSProperties = {
  background: "#F8FAFF",
  border: "1px solid #DBEAFE",
  borderRadius: 10,
  padding: "20px 24px",
  marginBottom: 24,
};
const detailBoxTitle: React.CSSProperties = {
  color: "#1B3A8B",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 12px",
};
const detailDivider: React.CSSProperties = {
  borderColor: "#DBEAFE",
  margin: "0 0 16px",
};
const detailLabel: React.CSSProperties = {
  color: "#6B7280",
  fontSize: 13,
  fontWeight: 600,
  paddingBottom: 10,
  paddingRight: 16,
  width: "36%",
  verticalAlign: "top",
};
const detailValue: React.CSSProperties = {
  color: "#111827",
  fontSize: 13,
  fontWeight: 500,
  paddingBottom: 10,
  verticalAlign: "top",
};
const contactStrip: React.CSSProperties = {
  background: "#F9FAFB",
  borderRadius: 10,
  padding: "16px 0",
  marginBottom: 24,
};
const contactItem: React.CSSProperties = {
  textAlign: "center",
  padding: "0 12px",
};
const contactIcon: React.CSSProperties = {
  fontSize: 20,
  margin: "0 0 4px",
};
const contactText: React.CSSProperties = {
  color: "#374151",
  fontSize: 12,
  fontWeight: 600,
  margin: 0,
};
const divider: React.CSSProperties = {
  borderColor: "#E5E7EB",
  margin: "0 0 20px",
};
const address: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: 12,
  margin: 0,
  lineHeight: "1.6",
};
const footer: React.CSSProperties = {
  background: "#1B3A8B",
  padding: "20px 40px",
  textAlign: "center",
};
const footerText: React.CSSProperties = {
  color: "rgba(255,255,255,0.5)",
  fontSize: 11,
  margin: "4px 0",
  lineHeight: "1.6",
};
const footerLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "underline",
};
