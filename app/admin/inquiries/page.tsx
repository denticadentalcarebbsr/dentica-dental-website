import { createAdminClient } from "@/lib/supabase/admin";
import InquiriesClient from "./InquiriesClient";

export const dynamic = "force-dynamic";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const supabase = createAdminClient();
  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (params.status && ["new", "contacted", "closed"].includes(params.status)) {
    query = query.eq("status", params.status);
  }

  const { data: inquiries } = await query;

  return <InquiriesClient inquiries={inquiries || []} currentStatus={params.status} />;
}
