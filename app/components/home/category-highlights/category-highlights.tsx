"use client";
import Link from "next/link";

const categories = [
  {
    name: "Gents",
    image: "/gents.jpg",
    href: "/categories/Gents Items",
  },
  {
    name: "Ladies",
    image: "/ladies.jpg",
    href: "/categories/Ladies Items",
  },
  {
    name: "Kids",
    image: "/kids.jpg",
    href: "/categories/Kids Items",
  }
];

function CategoryHighlights() {
  return (
    <section className="w-[98%] mx-auto mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            <div className="overflow-hidden rounded-lg shadow-md bg-pink-100 transition-transform group-hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryHighlights;
