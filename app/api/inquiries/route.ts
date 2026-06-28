import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { createAdminClient } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";
import PatientAck from "@/emails/PatientAck";
import DoctorNotify from "@/emails/DoctorNotify";
import { siteConfig } from "@/lib/site-config";
import { createElement } from "react";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const ipTimestamps = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipTimestamps.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  ipTimestamps.set(ip, [...timestamps, now]);
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    }
    return NextResponse.json({ errors }, { status: 422 });
  }

  const { honeypot, ...data } = parsed.data;
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminClient();

  const { data: inquiry, error: insertError } = await supabase
    .from("inquiries")
    .insert({ ...data, email: data.email || null })
    .select("id, created_at")
    .single();

  if (insertError || !inquiry) {
    console.error("Inquiry insert failed:", insertError);
    return NextResponse.json({ error: "Failed to save inquiry. Please try again." }, { status: 500 });
  }

  const createdAt = new Date(inquiry.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const emailResults = await Promise.allSettled([
    data.email
      ? resend.emails.send({
          from: `Dentica <noreply@${siteConfig.domain}>`,
          to: data.email,
          subject: "We received your inquiry – Dentica",
          react: createElement(PatientAck, {
            name: data.name,
            service: data.service,
            preferred_window: data.preferred_window,
            message: data.message,
          }),
        })
      : Promise.resolve({ data: null, error: null }),

    resend.emails.send({
      from: `Dentica Website <noreply@${siteConfig.domain}>`,
      to: process.env.DOCTOR_NOTIFY_EMAIL!,
      subject: `New inquiry: ${data.name} – ${data.service || "General"}`,
      react: createElement(DoctorNotify, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        preferred_window: data.preferred_window,
        message: data.message,
        created_at: createdAt,
      }),
    }),
  ]);

  await supabase.from("notification_log").insert([
    {
      inquiry_id: inquiry.id,
      channel: "patient_ack",
      status: emailResults[0].status === "fulfilled" && !(emailResults[0].value as any)?.error ? "sent" : "failed",
      error: emailResults[0].status === "rejected" ? String((emailResults[0] as PromiseRejectedResult).reason) : null,
    },
    {
      inquiry_id: inquiry.id,
      channel: "doctor_notify",
      status: emailResults[1].status === "fulfilled" && !(emailResults[1].value as any)?.error ? "sent" : "failed",
      error: emailResults[1].status === "rejected" ? String((emailResults[1] as PromiseRejectedResult).reason) : null,
    },
  ]);

  return NextResponse.json({ ok: true });
}
