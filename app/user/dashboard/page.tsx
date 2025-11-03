"use client";

import React from "react";
import Link from "next/link";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";
import { useAppSelector } from "@/lib/store/hooks/hooks";

export default function DashboardPage() {
  const { checkAuth } = useAuthGuard();
  const { user } = useAppSelector((state) => state.authSlice);

  const isAuthenticated = checkAuth();

//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600 text-sm">Please log in to access your dashboard.</p>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Orders</h3>
            <p className="text-2xl font-bold text-indigo-600">12</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Wishlist Items</h3>
            <p className="text-2xl font-bold text-indigo-600">5</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Cart Items</h3>
            <p className="text-2xl font-bold text-indigo-600">3</p>
          </div>
        </div>
      </main>
    </div>
  );
}
