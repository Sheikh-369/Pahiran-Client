"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductCarousel() {
  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-[95vw] max-w-[1200px] mx-auto overflow-hidden rounded-lg mt-10">
      {/* Images */}
      <div className="relative h-40 sm:h-56 md:h-96 lg:h-64">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Carousel ${index + 1}`}
              fill
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? "bg-sky-400 rounded-sm w-8 h-3"
                : "bg-sky-400 rounded-full w-3 h-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
