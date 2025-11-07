'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { Provider } from "react-redux";
import store from "@/lib/store/store";
import { Toaster } from 'react-hot-toast';
import { usePathname } from "next/navigation";
import AuthInitializer from "./components/authInitializer";
import Footer from "./components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  // List of routes where navbar should be hidden
  const hideNavbarOn = [
    '/auth/login', '/auth/register', '/auth/forgot-password',
    '/auth/reset-password','/admin/dashboard','/admin/dashboard/products',
    '/admin/dashboard/categories',
    '/admin/dashboard/sub-categories','/admin/dashboard/customers',
    '/user/dashboard','/user/dashboard/cart','/user/dashboard/check-out',
    '/user/dashboard/my-orders','/admin/dashboard/orders','/user/dashboard/profile'
  ];
  const shouldHideNavbar = hideNavbarOn.includes(pathname!);


  const hideFooterOn = [
    '/auth/login', '/auth/register', '/auth/forgot-password',
    '/auth/reset-password','/admin/dashboard','/admin/dashboard/products',
    '/admin/dashboard/categories',
    '/admin/dashboard/sub-categories','/admin/dashboard/customers',
    '/user/dashboard','/user/dashboard/cart','/user/dashboard/check-out',
    '/user/dashboard/my-orders','/admin/dashboard/orders','/user/dashboard/profile'
  ];
  const shouldHideFooter = hideFooterOn.includes(pathname!);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
          <AuthInitializer/> {/* ✅ restore auth on refresh */}
          {!shouldHideNavbar && <Navbar />}
          {children}
          {!shouldHideFooter && <Footer/>}
        </Provider>
      </body>
    </html>
  );
}
