import AdminSideBar from "@/app/components/admin-dashboard/sidebar/sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                  Ecommerce Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Export Report
                </button>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
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
