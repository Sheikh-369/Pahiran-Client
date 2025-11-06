import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-gray-800 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">WashTralaya</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Fashion for everyone — gents, ladies, and kids.  
            Stylish, comfortable, and affordable clothing for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><Link href="/" className="hover:text-gray-900 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-900 transition">About Us</Link></li>
            <li><Link href="/collections" className="hover:text-gray-900 transition">Collections</Link></li>
            <li><Link href="/contact" className="hover:text-gray-900 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Customer Care</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><Link href="/faq" className="hover:text-gray-900 transition">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-gray-900 transition">Returns & Exchanges</Link></li>
            <li><Link href="/shipping" className="hover:text-gray-900 transition">Shipping Info</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Follow Us</h3>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-700 hover:text-[#4267B2] transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-700 hover:text-[#E1306C] transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tiktok"
              className="text-gray-700 hover:text-[#010101] transition"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-6 border-t border-gray-300 pt-3 text-center text-xs text-gray-700">
        © {new Date().getFullYear()} WashTralaya. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
