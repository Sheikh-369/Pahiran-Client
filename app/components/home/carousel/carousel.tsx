// components/Carousel.tsx
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

const HomeCarousel: React.FC = () => {
  const slides: { src: string; title: string; description: string }[] = [
    { src: "/image1.jpg", title: "Summer Collection 2025", description: "Stay cool and stylish with our latest summer trends." },
    { src: "/image2.avif", title: "New Arrivals", description: "Fresh styles just landed. Discover them now!" },
    { src: "/image3.jpg", title: "Exclusive Styles", description: "Limited edition designs for the fashion-forward." },
    { src: "/image4.jpg", title: "Trendy & Chic", description: "Modern outfits that make a statement wherever you go." },
    { src: "/image5.jpg", title: "Luxury Wear", description: "Experience premium quality with every stitch." },
    { src: "/image6.jpg", title: "Street Fashion", description: "Casual yet bold looks for everyday urban life." },
    { src: "/image7.jpg", title: "Casual Comfort", description: "Relaxed fits that combine style and comfort perfectly." },
    { src: "/image9.jpg", title: "Elegant Evening", description: "Sophisticated attire for memorable nights." },
  ];

  const [current, setCurrent] = useState(0);
  const interval = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-[98%] mx-auto overflow-hidden rounded-lg mt-5">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((item, index) => (
          <div
            key={index}
            className="min-w-full relative h-64 sm:h-96 flex items-center justify-center bg-gray-100"
          >
            <Image
              src={item.src}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="select-none"
            />

            {/* Centered caption + description */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-xl sm:text-3xl md:text-4xl font-bold bg-black/40 px-4 py-2 rounded-lg shadow-lg mb-2 animate-fade-in">
                {item.title}
              </h2>
              <p className="text-white text-sm sm:text-base md:text-lg bg-black/30 px-3 py-1 rounded-md shadow-md animate-fade-in">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              current === index
                ? "w-8 h-3 rounded-full bg-white"
                : "w-3 h-3 rounded-full bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
