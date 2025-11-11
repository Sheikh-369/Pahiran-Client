"use client";
import { useAuthGuard } from "@/lib/store/hooks/useAuthGuard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { useEffect } from "react";
import { myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
import { fetchCartItems } from "@/lib/store/user/cart/cart-slice";
import { ShoppingBag, ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router=useRouter()
  const { checkAuth } = useAuthGuard();
  const { user } = useAppSelector((state) => state.authSlice);
  const { items: cartItems } = useAppSelector((state) => state.cartSlice);
  const { orders } = useAppSelector((state) => state.myOrdersSlice);

  useEffect(() => {
      if (!checkAuth(() => {})) {
        // If user is not logged in, redirect to login
        router.replace("/auth/login");
        return; // Stop running any further code in useEffect
      }
    dispatch(myOrders());
    dispatch(fetchCartItems());
  }, [dispatch,checkAuth, router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-200 via-white to-purple-100 flex rounded-3xl">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome,{" "}
            <span className="text-indigo-600">
              {user?.userName || user?.userEmail?.split("@")[0] || "User"}
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here's a quick summary of your account activity
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Total Orders
              </h3>
              <ShoppingBag className="text-indigo-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-indigo-600">
              {orders?.length || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Completed & Ongoing</p>
          </div>

          {/* Wishlist */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Wishlist Items
              </h3>
              <Heart className="text-pink-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-pink-500">5</p>
            <p className="text-xs text-gray-400 mt-1">Saved for later</p>
          </div>

          {/* Cart */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">
                Cart Items
              </h3>
              <ShoppingCart className="text-emerald-500 w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">
              {cartItems?.length || 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">Waiting for checkout</p>
          </div>
        </div>
      </main>
    </div>
  );
}
