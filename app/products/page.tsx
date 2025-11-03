// "use client";

// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
// import Link from "next/link";
// import { fetchAllProducts } from "@/lib/store/product/product-slice";
// import ProductCarousel from "../components/products/carousel/product-carousel";
// import AddToCartButton from "../components/cart/add-to-cart-button";

// export default function Products() {
//   const dispatch = useAppDispatch();
//   const { allProducts, status } = useAppSelector((store) => store.productSlice);

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   if (status === "loading") {
//     return <p className="text-center mt-8">Loading products...</p>;
//   }

//   return (
//     <>
//       <ProductCarousel />

//       <div className="min-h-screen pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
//           <section
//             id="Products"
//             className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
//           >
//             {allProducts && allProducts.length > 0 ? (
//               allProducts.map((p) => (
//                 <div
//                   key={p.id}
//                   className="relative bg-sky-100 shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
//                 >
//                   {/* Featured Badge */}
//                   {p.isFeatured && (
//                     <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
//                       Featured
//                     </div>
//                   )}

//                   {/* Cart Icon Overlay */}
//                   <div
//                     onClick={(e) => {
//                       e.stopPropagation(); // prevent parent Link navigation
//                     }}
//                     className="absolute top-2 left-2 z-20"
//                   >
//                     <AddToCartButton productId={p.id!} quantity={1} />
//                   </div>

//                   <Link href={`/products/${p.id}`} passHref>
//                     <div>
//                       <img
//                         src={
//                           typeof p.productImage === "string" &&
//                           p.productImage.trim() !== ""
//                             ? p.productImage
//                             : "/placeholder.png"
//                         }
//                         alt={p.productName}
//                         width={300}
//                         height={200}
//                         className="h-44 w-full object-cover rounded-t-lg"
//                       />

//                       <div className="px-2 py-2">
//                         <p className="text-xs font-bold text-black capitalize mb-1">
//                           {p.productName}
//                         </p>
//                         <p className="text-[10px] text-gray-600 line-clamp-2 h-6">
//                           {p.productDescription}
//                         </p>

//                         <div className="flex justify-between items-center mt-2">
//                           <p className="text-xs font-semibold text-black">
//                             Rs.{p.productPrice ? Number(p.productPrice).toFixed(0) : 0}
//                           </p>

//                           <div>
//                             {p.productStock > 5 && (
//                               <p className="text-[10px] text-green-600 font-medium">In Stock</p>
//                             )}
//                             {p.productStock <= 5 && p.productStock > 0 && (
//                               <p className="text-[10px] text-yellow-600 font-medium">
//                                 Only {p.productStock} left!
//                               </p>
//                             )}
//                             {p.productStock === 0 && (
//                               <p className="text-[10px] text-red-600 font-medium">Out of Stock</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p className="col-span-full text-center text-sm text-gray-600">
//                 No products available.
//               </p>
//             )}
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import Link from "next/link";
import { fetchAllProducts } from "@/lib/store/product/product-slice";
import ProductCarousel from "../components/products/carousel/product-carousel";
import AddToCartButton from "../components/cart/add-to-cart-button";

export default function Products() {
  const dispatch = useAppDispatch();
  const { allProducts, status } = useAppSelector((store) => store.productSlice);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-8">Loading products...</p>;
  }

  return (
    <>
      <ProductCarousel />

      <div className="min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
          <section
            id="Products"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {allProducts && allProducts.length > 0 ? (
              allProducts.map((p) => (
                <div
                  key={p.id}
                  className="relative bg-sky-100 shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
                >
                  {/* Featured Badge */}
                  {p.isFeatured && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
                      Featured
                    </div>
                  )}

                  {/* Cart Icon Overlay */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // prevent parent Link navigation
                    }}
                    className="absolute top-2 left-2 z-20"
                  >
                    <AddToCartButton productId={p.id!} quantity={1} />
                  </div>

                  <Link href={`/products/${p.id}`} passHref>
                    <div>
                      <img
                        src={
                          typeof p.productImage === "string" &&
                          p.productImage.trim() !== ""
                            ? p.productImage
                            : "/placeholder.png"
                        }
                        alt={p.productName}
                        width={300}
                        height={200}
                        className="h-44 w-full object-cover rounded-t-lg"
                      />

                      <div className="px-2 py-2">
                        <p className="text-xs font-bold text-black capitalize mb-1">
                          {p.productName}
                        </p>
                        <p className="text-[10px] text-gray-600 line-clamp-2 h-6">
                          {p.productDescription}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs font-semibold text-black">
                            Rs.{p.productPrice ? Number(p.productPrice).toFixed(0) : 0}
                          </p>

                          <div>
                            {p.productStock > 5 && (
                              <p className="text-[10px] text-green-600 font-medium">In Stock</p>
                            )}
                            {p.productStock <= 5 && p.productStock > 0 && (
                              <p className="text-[10px] text-yellow-600 font-medium">
                                Only {p.productStock} left!
                              </p>
                            )}
                            {p.productStock === 0 && (
                              <p className="text-[10px] text-red-600 font-medium">Out of Stock</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-gray-600">
                No products available.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
