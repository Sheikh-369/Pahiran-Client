"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchProductById } from "@/lib/store/product/product-slice";

export default function ProductDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((store) => store.productSlice);

  // Ensure id is a string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p className="text-center mt-8">Loading product...</p>;
  }

  if (!product || !product.id) {
    return <p className="text-center mt-8 text-red-600">Product not found!</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1 relative">
          <img
            src={
              typeof product.productImage === "string" && product.productImage.trim() !== ""
                ? product.productImage
                : "/placeholder.png"
            }
            alt={product.productName}
            className="w-full h-80 object-cover rounded-lg"
          />

          {/* Professional Cart Icon on Image */}
          <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386a1 1 0 0 1 .97.757l.813 3.25M6 6h15.75a.75.75 0 0 1 .705 1.038l-2.25 6A.75.75 0 0 1 19.5 14H8.25M6 6L5.106 9.757a.75.75 0 0 0 .705.993H19.5M6 6L5.106 9.757M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
              />
            </svg>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold capitalize">{product.productName}</h1>

          {product.isFeatured && (
            <span className="inline-block bg-red-600 text-white text-sm px-2 py-1 rounded">
              Featured
            </span>
          )}

          <p className="text-gray-700">{product.productDescription}</p>

          {/* Price & Stock */}
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xl font-semibold text-black">Rs.{product.productPrice}</p>
            {product.productStock > 5 && <p className="text-green-600 font-medium">In Stock</p>}
            {product.productStock <= 5 && product.productStock > 0 && (
              <p className="text-yellow-600 font-medium">Only {product.productStock} left!</p>
            )}
            {product.productStock === 0 && <p className="text-red-600 font-medium">Out of Stock</p>}

            {/* Professional Cart Icon next to Price */}
            <div className="ml-4 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition" title="Add to Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386a1 1 0 0 1 .97.757l.813 3.25M6 6h15.75a.75.75 0 0 1 .705 1.038l-2.25 6A.75.75 0 0 1 19.5 14H8.25M6 6L5.106 9.757a.75.75 0 0 0 .705.993H19.5M6 6L5.106 9.757M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                />
              </svg>
            </div>
          </div>

          {/* Brand */}
          {product.productBrand && (
            <p className="text-sm text-gray-500">Brand: {product.productBrand}</p>
          )}

          {/* Category & Sub-Category */}
          {product.category?.categoryName && (
            <p className="text-sm text-gray-500">{product.category.categoryName}</p>
          )}
          {product.subCategory?.subCategoryName && (
            <p className="text-sm text-gray-500">
            {product.subCategory.subCategoryName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}