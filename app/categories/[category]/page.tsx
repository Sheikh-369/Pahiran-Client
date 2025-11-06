// "use client";

// import React, { useEffect } from "react";
// import { useParams, notFound } from "next/navigation";
// import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
// import { fetchProductsByCategory } from "@/lib/store/product/product-slice";
// import { IProductData } from "@/lib/store/product/product-slice-type";
// import { Status } from "@/lib/global/type";
// import AddToCartButton from "@/app/components/cart/add-to-cart-button";

// const CATEGORY_NAMES: Record<string, string> = {
//   drinks: "Drinks",
//   electronics: "Electronics",
//   clothing: "Clothing",
//   groceries: "Groceries",
//   foods:"Foods",
//   furnitures:"Furnitures",
//   gadgets:"Gadgets",
//   hardwares:"Hardwares",
//   "home essentials":"Home essentials",
//   beauty:"Beauty",
//   books:"Books",
//   shoes:"Shoes",
//   fashion:"Fashion"
//   // Add more categories here as needed
// };

// function CategoryPage() {
//   const params = useParams();
//   const categoryParam = params?.category;

//   // ✅ Safely extract categoryKey as string
//   // const categoryKey =
//   //   typeof categoryParam === "string"
//   //     ? categoryParam
//   //     : Array.isArray(categoryParam) && categoryParam.length > 0
//   //     ? categoryParam[0]
//   //     : undefined;

//   //this will decode spaces to if there is space between the words
//   const categoryKey =
//   typeof categoryParam === "string"
//     ? decodeURIComponent(categoryParam)
//     : Array.isArray(categoryParam) && categoryParam.length > 0
//     ? decodeURIComponent(categoryParam[0])
//     : undefined;


//   // 🚫 Redirect to 404 if invalid
//   if (!categoryKey) {
//     notFound();
//   }

//   const dispatch = useAppDispatch();

//   const products = useAppSelector(
//     (state) => state.productSlice.categoryProducts[categoryKey] ?? []
//   );
//   const status = useAppSelector((state) => state.productSlice.status);

//   useEffect(() => {
//     dispatch(fetchProductsByCategory(categoryKey));
//   }, [dispatch, categoryKey]);

//   const handleAddToCart = (product: IProductData, qty: number) => {
//     console.log("Add to cart:", product.productName, qty);
//   };

//   return (
//     <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7 mb-15">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-semibold capitalize text-left">
//           {CATEGORY_NAMES[categoryKey] || categoryKey}
//         </h1>
//         <Link href="/categories">
//           <button className="text-sm text-indigo-600 hover:text-indigo-800 underline">
//             ← Back to Categories
//           </button>
//         </Link>
//       </div>

//       {status === Status.LOADING && <p>Loading...</p>}
//       {status === Status.ERROR && <p>Failed to load products.</p>}

//       {Array.isArray(products) && products.length > 0 ? (
//         <section
//           id="Products"
//           className="grid grid-cols-2 sm:grid-cols-4 gap-4"
//         >
//           {products.map((product: IProductData) => (
//             <div
//               key={product.id}
//               className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
//             >
//               {/* {product.productDiscount > 0 && (
//                 <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
//                   -{product.productDiscount}%
//                 </div>
//               )} */}

//               <Link href={`/product-detail/${product.id}`}>
//                 <img
//                   src={
//                     product.productImage || "https://via.placeholder.com/150"
//                   }
//                   alt={product.productName}
//                   className="h-24 w-full object-cover rounded-t-lg"
//                 />
//                 <div className="px-2 py-2">
//                   <p className="text-xs font-bold text-black capitalize mb-1">
//                     {product.productName}
//                   </p>
//                   <p className="text-[10px] text-gray-600 line-clamp-2 h-6">
//                     {product.productDescription || "No description"}
//                   </p>

//                   <div className="flex items-center mt-2">
//                     <p className="text-xs font-semibold text-black">
//                       Rs. {product.productPrice}
//                     </p>
//                     {/* {product.oldPrice && (
//                       <del className="ml-1 text-[10px] text-gray-600">
//                         Rs. {product.oldPrice}
//                       </del>
//                     )} */}

//                     <AddToCartButton productId={product.id!} quantity={1}/>
//                   </div>

//                   <div className="mt-1">
//                     {product.productStock > 10 ? (
//                       <p className="text-[10px] text-green-600 font-medium">
//                         In Stock
//                       </p>
//                     ) : product.productStock > 0 ? (
//                       <p className="text-[10px] text-yellow-600 font-medium">
//                         Only {product.productStock} left!
//                       </p>
//                     ) : (
//                       <p className="text-[10px] text-red-600 font-medium">
//                         Out of Stock
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </section>
//       ) : (
//         status !== Status.LOADING && (
//           <p className="mt-8 text-center text-sm text-gray-600">
//             No products found in this category.
//           </p>
//         )
//       )}
//     </div>
//   );
// }

// export default CategoryPage;


//2nd
"use client";

import React, { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchProductsByCategory } from "@/lib/store/product/product-slice";
import { IProductData } from "@/lib/store/product/product-slice-type";
import { Status } from "@/lib/global/type";
import AddToCartButton from "@/app/components/cart/add-to-cart-button";

const CATEGORY_NAMES: Record<string, string> = {
  drinks: "Drinks",
  electronics: "Electronics",
  clothing: "Clothing",
  groceries: "Groceries",
  foods: "Foods",
  furnitures: "Furnitures",
  gadgets: "Gadgets",
  hardwares: "Hardwares",
  "home essentials": "Home essentials",
  beauty: "Beauty",
  books: "Books",
  shoes: "Shoes",
  fashion: "Fashion",
};

function CategoryPage() {
  const params = useParams();
  const categoryParam = params?.category;

  const categoryKey =
    typeof categoryParam === "string"
      ? decodeURIComponent(categoryParam)
      : Array.isArray(categoryParam) && categoryParam.length > 0
      ? decodeURIComponent(categoryParam[0])
      : undefined;

  if (!categoryKey) {
    notFound();
  }

  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state) => state.productSlice.categoryProducts[categoryKey] ?? []
  );
  const status = useAppSelector((state) => state.productSlice.status);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryKey));
  }, [dispatch, categoryKey]);

  return (
    <div className="w-[98%] mx-auto px-4 sm:px-6 lg:px-8 mt-7 mb-15">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold capitalize text-left">
          {CATEGORY_NAMES[categoryKey] || categoryKey}
        </h1>
        <Link href="/categories">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 underline">
            ← Back to Categories
          </button>
        </Link>
      </div>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Failed to load products.</p>}

      {Array.isArray(products) && products.length > 0 ? (
        <section
          id="Products"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
        >
          {products.map((product: IProductData) => (
            <div
              key={product.id}
              className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <Link href={`/product-detail/${product.id}`}>
                <img
                  src={product.productImage || "https://via.placeholder.com/150"}
                  alt={product.productName}
                  className="h-32 w-full object-cover"
                />
              </Link>

              {/* Product Info */}
              <div className="flex flex-col justify-between flex-1 p-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 capitalize truncate">
                    {product.productName}
                  </p>
                  <p className="text-[11px] text-gray-600 line-clamp-2 h-8">
                    {product.productDescription || "No description"}
                  </p>
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs font-bold text-gray-900">
                    Rs. {product.productPrice}
                  </p>
                  <div className="shrink-0">
                    <AddToCartButton productId={product.id!} quantity={1} />
                  </div>
                </div>

                {/* Stock Info */}
                <div className="mt-1">
                  {product.productStock > 10 ? (
                    <p className="text-[10px] text-green-600 font-medium">
                      In Stock
                    </p>
                  ) : product.productStock > 0 ? (
                    <p className="text-[10px] text-yellow-600 font-medium">
                      Only {product.productStock} left!
                    </p>
                  ) : (
                    <p className="text-[10px] text-red-600 font-medium">
                      Out of Stock
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        status !== Status.LOADING && (
          <p className="mt-8 text-center text-sm text-gray-600">
            No products found in this category.
          </p>
        )
      )}
    </div>
  );
}

export default CategoryPage;
