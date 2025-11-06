import Link from "next/link";
import React from "react";

function UserSidebar() {
  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-linear-to-b from-[#acade9] via-[#b59ee9] to-[#e0acc6] shadow-lg border-r border-gray-200 shrink-0">
        <div className="p-6">
          {/* Logo + Heading */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              U
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">EcomUser</h2>
              <p className="text-xs text-gray-600">Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              href="/user/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-10l2 2m-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v5z"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/user/dashboard/my-orders"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18l-1 9H4L3 3zm0 9h18v7H3v-7z"
                />
              </svg>
              My Orders
            </Link>

            <Link
              href="/user/dashboard/cart"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 007 17h10a1 1 0 00.894-1.447L17 13M7 13l1.5 3m5 0a1.5 1.5 0 11-3 0"
                />
              </svg>
              My Cart
            </Link>

            <Link
              href="/user/dashboard/wishlist"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              Wishlist
            </Link>

            <Link
              href="/user/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M12 7a4 4 0 110 8 4 4 0 010-8z"
                />
              </svg>
              My Profile
            </Link>

            <Link
              href="/user/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </Link>
          </nav>

          {/* User Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">User Name</p>
                <p className="text-xs text-gray-600">user@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default UserSidebar;
