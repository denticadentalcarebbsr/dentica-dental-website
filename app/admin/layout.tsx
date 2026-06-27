import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
