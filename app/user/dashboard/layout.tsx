"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks/hooks";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";
import UserSidebar from "@/app/components/user/sidebar/user-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.authSlice);
  const { checkAuth } = useAuthGuard();
  const isAuthenticated = checkAuth();

  return (
    <div className="min-h-screen flex bg-gray-100 rounded-4xl">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <header className="bg-sky-200 shadow-md p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">User Dashboard</h1>

          <nav className="flex space-x-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/products" className="hover:text-blue-600 transition">Shop</Link>
          </nav>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
