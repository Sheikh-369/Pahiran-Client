'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import Link from 'next/link';
import { fetchFeaturedProducts } from '@/lib/store/product/product-slice';
import AddToCartButton from '../../cart/add-to-cart-button';


export default function FeaturedProducts() {
  const dispatch = useAppDispatch();
  const { featured, status } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center py-10 text-gray-600 text-sm">
        Loading featured products...
      </div>
    );
  }

  if (featured.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-sm">
        No featured products available.
      </div>
    );
  }

  return (
<section className="min-h-screen pb-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7">
    <h2 className="text-2xl font-bold mb-8 text-left">Our Featured Products</h2>

    <section
      id="FeaturedProducts"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {featured && featured.length > 0 ? (
        featured.map((product) => (
          <div
            key={product.id}
            className="relative bg-sky-100 shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
          >
            {/* Featured Badge */}
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
              Featured
            </div>

            {/* Cart Icon Overlay */}
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute top-2 left-2 z-20"
            >
              <AddToCartButton productId={product.id!} quantity={1} />
            </div>

            <Link href={`/products/${product.id}`} passHref>
              <div>
                <img
                  src={
                    typeof product.productImage === "string" &&
                    product.productImage.trim() !== ""
                      ? product.productImage
                      : "/placeholder.png"
                  }
                  alt={product.productName}
                  width={300}
                  height={200}
                  className="h-44 w-full object-cover rounded-t-lg"
                />

                <div className="px-2 py-2">
                  <p className="text-xs font-bold text-black capitalize mb-1">
                    {product.productName}
                  </p>
                  <p className="text-[10px] text-gray-600 line-clamp-2 h-6">
                    {product.productDescription || "No description"}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs font-semibold text-black">
                      Rs.{product.productPrice
                        ? Number(product.productPrice).toFixed(0)
                        : 0}
                    </p>

                    <div>
                      {product.productStock > 5 && (
                        <p className="text-[10px] text-green-600 font-medium">
                          In Stock
                        </p>
                      )}
                      {product.productStock <= 5 &&
                        product.productStock > 0 && (
                          <p className="text-[10px] text-yellow-600 font-medium">
                            Only {product.productStock} left!
                          </p>
                        )}
                      {product.productStock === 0 && (
                        <p className="text-[10px] text-red-600 font-medium">
                          Out of Stock
                        </p>
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
          No featured products available.
        </p>
      )}
    </section>
  </div>
</section>

  );
}