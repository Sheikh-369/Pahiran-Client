'use client'
import { setUser } from "@/lib/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import Link from "next/link";

function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 text-sm">
            <span>📞 +9779807915786</span>
            <span>📧 info@clothingstore.com</span>
          </div>
          <span className="text-sm">Free shipping on orders over $50!</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            WashTralaya
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categories/ladies" className="nav-link">Ladies</Link>
            <Link href="/categories/gents" className="nav-link">Gents</Link>
            <Link href="/categories/kids" className="nav-link">Kids</Link>
            <Link href="/products" className="nav-link">All Products</Link>
            <Link href="/sale" className="text-red-600 font-semibold hover:text-red-700">
              Sale
              <span className="ml-1 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                HOT
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Auth */}
            {!user ? (
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Welcome, <span className="font-medium">{user.name || user.userEmail}</span>
                </span>
                {user.role === "admin" && (
                  <Link href="/admin/dashboard" className="text-green-600 hover:text-green-700">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Cart */}
            <Link href="/user/dashboard/cart" className="relative">
              <svg
                className="h-6 w-6 text-gray-700 hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"
                />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;