import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-indigo-950 p-4 md:p-6">
      <div className="container mx-auto max-w-[1700px] md:flex gap-5">
        <AdminSidebar />
        <section className="flex-1 mt-4 md:mt-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 text-white">
          {children}
        </section>
      </div>
    </div>
  );
}
