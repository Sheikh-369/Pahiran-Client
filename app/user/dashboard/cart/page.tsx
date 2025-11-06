"use client";
import { useEffect, useState } from "react";
import { Status } from "@/lib/global/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import {
  addToCart,
  fetchCartItems,
  updateItemQuantity,
  deleteCartItems,
} from "@/lib/store/user/cart/cart-slice";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //   const { checkAuth } = useAuthGuard();
  //   const isAuthenticated = checkAuth();

  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-gray-600 text-sm">Please log in to access your dashboard.</p>
  //     </div>
  //   );
  // }

  // Fetch cart state from Redux
  const { items, status } = useAppSelector((state) => state.cartSlice);

  // State to track selected items for checkout
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // --- Handle checkout with only selected items ---
  const handleCheckout = () => {
    if (selectedItems.length === 0) return; // Option 2: checkout only if items are selected

    // Convert selected item IDs to a comma-separated query string
    const queryParam = selectedItems.join(",");
    router.push(`/user/dashboard/check-out?items=${queryParam}`);
  };

  // --- Quantity management ---
  const handleAddQuantity = (cartItemId: string, currentQty: number) => {
    dispatch(updateItemQuantity({ cartItemId, quantity: currentQty + 1 }));
  };

  const handleReduceQuantity = (cartItemId: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateItemQuantity({ cartItemId, quantity: currentQty - 1 }));
    }
  };

  // --- Delete item from cart ---
  const handleDeleteItem = (cartItemId: string) => {
    dispatch(deleteCartItems(cartItemId));
    setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
  };

  // --- Select / deselect individual item ---
  const handleSelectItem = (cartItemId?: string) => {
    if (!cartItemId) return;
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  // --- Select or deselect all items ---
  const handleSelectAll = () => {
    const allIds = items.map((item) => item.id).filter((id): id is string => !!id);
    if (selectedItems.length === allIds.length) {
      setSelectedItems([]); // deselect all
    } else {
      setSelectedItems(allIds); // select all
    }
  };

  // --- Calculate total price for selected items ---
  const getTotalPrice = () => {
    const filteredItems = items.filter((item) => item.id && selectedItems.includes(item.id));
    return filteredItems.reduce(
      (sum, item) => sum + Number(item.product.productPrice) * item.quantity,
      0
    );
  };

  // --- Loading state ---
  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8 flex items-center gap-3">
        <ShoppingBagIcon className="w-8 h-8 text-emerald-600" />
        My Cart
      </h1>

      {/* Empty cart state */}
      {items.length === 0 && status === Status.SUCCESS && (
        <div className="text-gray-600 text-center py-20">
          <ShoppingBagIcon className="mx-auto w-20 h-20 text-gray-300 mb-4" />
          <p className="text-lg font-medium mb-3">Your cart is empty.</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart items */}
      {items.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            {/* Select all checkbox */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={selectedItems.length === items.filter((item) => item.id).length}
                onChange={handleSelectAll}
                className="w-5 h-5 accent-emerald-600"
              />
              <span className="font-medium text-gray-700">Select All</span>
              {selectedItems.length > 0 && (
                <button
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition ml-auto"
                  onClick={() =>
                    selectedItems.forEach((id) => handleDeleteItem(id))
                  }
                >
                  <TrashIcon className="w-5 h-5" /> Delete Selected
                </button>
              )}
            </div>

            {/* Individual cart items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl bg-sky-100 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    checked={item.id ? selectedItems.includes(item.id) : false}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-5 h-5 accent-emerald-600"
                  />
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={
                        typeof item.product.productImage === "string"
                          ? item.product.productImage
                          : "/images/placeholder.png"
                      }
                      alt={item.product.productName || "Product image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-medium text-lg text-gray-800">
                      {item.product.productName}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-1 max-w-60">
                      {item.product.productDescription}
                    </p>
                    <p className="mt-2 font-semibold text-emerald-600">
                      Rs. {Number(item.product.productPrice).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity and delete */}
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                    <button
                      onClick={() =>
                        handleReduceQuantity(item.id as string, item.quantity)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleAddQuantity(item.id as string, item.quantity)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800">
                      Rs. {(Number(item.product.productPrice) * item.quantity).toFixed(2)}
                    </span>
                  </p>
                  <button
                    onClick={() => handleDeleteItem(item.id as string)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
                  >
                    <TrashIcon className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-sky-200 rounded-xl shadow-md p-6 h-fit sticky top-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {getTotalPrice() > 1000 ? "0.00" : "99.00"}</span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>
                  Rs. {(getTotalPrice() + (getTotalPrice() > 1000 ? 0 : 99)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Option 2: Proceed only if selected items exist */}
            <button
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
