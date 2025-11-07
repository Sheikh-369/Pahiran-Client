'use client'
import AdminSideBar from "@/app/components/admin-dashboard/sidebar/sidebar";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const{user}=useAppSelector(store=>store.authSlice)
  return (
    <div className="min-h-full flex">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header (extracted from AdminDashboard) */}
        <header className="bg-sky-200 shadow-lg border-r border-gray-200 rounded-4xl">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  WashTralaya Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <nav className="flex space-x-6 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition">Home</Link>
                </nav>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name ? user.name[0].toUpperCase() : "K"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content (children) */}
        <main className="flex-1 px-6 py-6 overflow-auto bg-[linear-gradient(135deg,#acade9,#b59ee9,#e0acc6)]">
          {children}
        </main>
      </div>
    </div>
  );
}
