'use cleint'
import Image from "next/image";
import HomeCarousel from "./components/home/carousel/carousel";
import CategoryHighlights from "./components/home/category-highlights/category-highlights";
import FeaturedProducts from "./components/home/featured-products/featured-products";

export default function Home() {
  return (
    <>
      <HomeCarousel/>
      <CategoryHighlights/>
      <FeaturedProducts/>
    </>
  );
}
