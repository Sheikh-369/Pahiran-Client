"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-1 text-gray-800 mt-10">
      <section className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About <span className="text-blue-600">WashTralaya</span>
        </h1>

        <p className="text-lg leading-relaxed">
          At <strong>WashTralaya</strong>, we believe fashion is for everyone — men,
          women, and kids alike. Our journey began with a simple mission: to
          make stylish, comfortable, and high-quality clothing accessible to
          every household.
        </p>

        <p className="text-lg leading-relaxed">
          We started with a passion for everyday style — pieces that look good,
          feel great, and last long. Today, we're proud to offer a diverse range
          of apparel that brings together timeless design, modern trends, and
          family-friendly affordability.
        </p>

        <div className="space-y-4 text-left mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Our Values</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Quality You Can Trust</strong> - Carefully selected fabrics and craftsmanship for lasting comfort.</li>
            <li><strong>Affordable Style</strong> - Fashion for everyone, without compromise.</li>
            <li><strong>Sustainability First</strong> - Ethical sourcing and responsible production.</li>
            <li><strong>Customer First</strong> - Hassle-free returns, secure payments, and fast delivery.</li>
          </ul>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Join Our Story</h2>
          <p className="text-lg leading-relaxed">
            UrbanThreads is more than just clothing — it's a community built on
            creativity, confidence, and care. Discover your next favorite outfit
            today and be part of our growing story.
          </p>

          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Explore Our Collections
          </Link>
        </div>

        <div className="mt-12">
          <Image
            src="/images/about-banner.jpg"
            alt="UrbanThreads clothing collection"
            width={800}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
