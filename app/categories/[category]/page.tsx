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
            ← All Categories
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
              <Link href={`/products/${product.id}`}>
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
