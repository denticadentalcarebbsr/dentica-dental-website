import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Row, Column
} from "@react-email/components";

interface Props {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferred_window?: string;
  message?: string;
  created_at: string;
}

export default function DoctorNotify({ name, phone, email, service, preferred_window, message, created_at }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New inquiry from {name} – Dentica Admin</Preview>
      <Body style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 560, margin: "40px auto", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.08)" }}>
          <Section style={{ background: "#0D1B5E", padding: "24px 40px" }}>
            <Heading style={{ color: "#fff", fontSize: 18, margin: 0 }}>🦷 New Patient Inquiry</Heading>
            <Text style={{ color: "rgba(255,255,255,.7)", fontSize: 12, margin: "4px 0 0" }}>Received: {created_at}</Text>
          </Section>
          <Section style={{ padding: "32px 40px" }}>
            {[
              { label: "Patient Name", value: name },
              { label: "Phone", value: phone },
              { label: "Email", value: email || "–" },
              { label: "Service", value: service || "Not specified" },
              { label: "Preferred Window", value: preferred_window || "Any time" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #E5E7EB" }}>
                <Text style={{ color: "#6B7280", fontSize: 13, margin: 0, fontWeight: 500 }}>{row.label}</Text>
                <Text style={{ color: "#0D1B5E", fontSize: 13, margin: 0, fontWeight: 600 }}>{row.value}</Text>
              </div>
            ))}
            {message && (
              <>
                <Text style={{ color: "#6B7280", fontSize: 13, marginTop: 16, marginBottom: 6, fontWeight: 500 }}>Message</Text>
                <Text style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.6, background: "#F9FAFB", padding: "12px 16px", borderRadius: 8 }}>{message}</Text>
              </>
            )}
            <Hr style={{ borderColor: "#E5E7EB", margin: "24px 0" }} />
            <Text style={{ color: "#4B5563", fontSize: 13 }}>
              Log in to the <strong>Dentica Admin</strong> to view and update this inquiry status.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
