import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr
} from "@react-email/components";
import { siteConfig } from "@/lib/site-config";

interface Props {
  name: string;
  service?: string;
  preferred_window?: string;
}

export default function PatientAck({ name, service, preferred_window }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your inquiry has been received – Dentica</Preview>
      <Body style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 560, margin: "40px auto", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.08)" }}>
          <Section style={{ background: "#1B3A8B", padding: "32px 40px", textAlign: "center" }}>
            <Heading style={{ color: "#fff", fontSize: 24, margin: 0, fontFamily: "Georgia, serif" }}>Dentica</Heading>
            <Text style={{ color: "rgba(255,255,255,.75)", fontSize: 12, margin: "4px 0 0", letterSpacing: "0.08em", textTransform: "uppercase" }}>An Advanced Oral Care Centre</Text>
          </Section>
          <Section style={{ padding: "32px 40px" }}>
            <Heading as="h2" style={{ color: "#0D1B5E", fontFamily: "Georgia, serif", fontSize: 20 }}>Thank you, {name}!</Heading>
            <Text style={{ color: "#4B5563", lineHeight: 1.7 }}>
              We've received your appointment inquiry and our team will contact you shortly to confirm your slot.
            </Text>
            {service && (
              <Text style={{ color: "#4B5563", lineHeight: 1.7 }}>
                <strong>Service requested:</strong> {service}
              </Text>
            )}
            {preferred_window && (
              <Text style={{ color: "#4B5563", lineHeight: 1.7 }}>
                <strong>Preferred time:</strong> {preferred_window}
              </Text>
            )}
            <Hr style={{ borderColor: "#E5E7EB", margin: "24px 0" }} />
            <Text style={{ color: "#4B5563", lineHeight: 1.7, fontSize: 14 }}>
              If you need to reach us directly:<br />
              📞 {siteConfig.phoneDisplay}<br />
              📧 {siteConfig.email}<br />
              🕐 Mon–Sat: 9AM–1PM & 2PM–7PM
            </Text>
          </Section>
          <Section style={{ background: "#F9FAFB", padding: "20px 40px", textAlign: "center" }}>
            <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
              {siteConfig.address.line1}, {siteConfig.address.city} – {siteConfig.address.pincode}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
