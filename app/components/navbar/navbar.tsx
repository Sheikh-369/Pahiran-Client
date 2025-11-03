'use client'
import { setUser } from "@/lib/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import Link from "next/link";
import React from "react";

function Navbar() {
  //user login/logout logic
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice); // ensure slice name matches
  //cart counter
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Clothing Store Navbar</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            box-sizing: border-box;\n        }\n        \n        .dropdown-menu {\n            opacity: 0;\n            visibility: hidden;\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n        }\n        \n        .dropdown:hover .dropdown-menu {\n            opacity: 1;\n            visibility: visible;\n            transform: translateY(0);\n        }\n        \n        .mobile-menu {\n            max-height: 0;\n            overflow: hidden;\n            transition: max-height 0.3s ease;\n        }\n        \n        .mobile-menu.active {\n            max-height: 500px;\n        }\n        \n        .search-input:focus {\n            outline: none;\n            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);\n        }\n    ",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "@view-transition { navigation: auto; }",
        }}
      />
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top bar with contact info */}
        <div className="bg-gray-900 text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2">
              <div className="flex space-x-6">
                <span>📞 +1 (555) 123-4567</span>{" "}
                <span>📧 info@clothingstore.com</span>
              </div>
              <div className="flex space-x-4">
                <span>Free shipping on orders over $50!</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900" id="store-name">
                WashTralaya
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Ladies Dropdown */}
              <div className="relative dropdown">
                <button
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center"
                  id="ladies-link"
                >
                  {" "}
                  <span id="ladies-text">Ladies</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="dropdown-menu absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dresses
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tops &amp; Blouses
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Pants &amp; Jeans
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Skirts
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Activewear
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accessories
                    </a>
                  </div>
                </div>
              </div>
              {/* Gents Dropdown */}
              <div className="relative dropdown">
                <button
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center"
                  id="gents-link"
                >
                  {" "}
                  <span id="gents-text">Gents</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="dropdown-menu absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Shirts
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      T-Shirts
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Pants &amp; Jeans
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Suits
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Activewear
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accessories
                    </a>
                  </div>
                </div>
              </div>
              {/* Kids Dropdown */}
              <div className="relative dropdown">
                <button
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center"
                  id="kids-link"
                >
                  {" "}
                  <span id="kids-text">Kids</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="dropdown-menu absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Boys (2-12)
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Girls (2-12)
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Baby (0-2)
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      School Uniforms
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Shoes
                    </a>{" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accessories
                    </a>
                  </div>
                </div>
              </div>
              {/* Sale Link */}{" "}
              <a
                href="#"
                className="text-red-600 hover:text-red-700 font-bold transition-colors duration-200"
                id="sale-link"
              >
                {" "}
                <span id="sale-text">Sale</span>{" "}
                <span className="ml-1 text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                  HOT
                </span>{" "}
              </a>
              {/* All Products Link */}
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                All Products
              </Link>

            </div>
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-colors duration-200"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
            </div>
            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Account */}{" "}
            <div className="flex items-center space-x-4">
              {user ? (
                // Logged-in state → show only "Logout"
                <button
                  onClick={() => {
                    localStorage.removeItem("token"); // remove auth token
                    dispatch(setUser(null)); // reset user state
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                // Logged-out state → show only "Login"
                <Link href="/auth/login">
                  <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>              
              {/* Wishlist */}{" "}
              <button className="text-gray-700 hover:text-red-600 transition-colors duration-200 relative">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>{" "}
              </button>{" "}
              {/* Cart */}{" "}
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
                {" "}
              </button>{" "}
              {/* Mobile menu button */}{" "}
              <button
                className="md:hidden text-gray-700 hover:text-blue-600"
                id="mobile-menu-btn"
              >
                <svg
                  className="h-6 w-6"
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
        {/* Mobile menu */}
        <div
          className="mobile-menu md:hidden bg-white border-t"
          id="mobile-menu"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
            {/* Mobile navigation links */}
            <div className="space-y-2">
              <a
                href="#"
                className="block py-2 text-gray-700 font-medium"
                id="mobile-ladies"
              >
                Ladies
              </a>{" "}
              <a
                href="#"
                className="block py-2 text-gray-700 font-medium"
                id="mobile-gents"
              >
                Gents
              </a>{" "}
              <a
                href="#"
                className="block py-2 text-gray-700 font-medium"
                id="mobile-kids"
              >
                Kids
              </a>{" "}
              <a
                href="#"
                className="block py-2 text-red-600 font-bold"
                id="mobile-sale"
              >
                Sale 🔥
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Demo content to show navbar in context */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Clothing Store
          </h1>
          <p className="text-gray-600">
            This navbar is fully functional with hover effects, dropdowns, and
            mobile responsiveness.
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Navbar;
