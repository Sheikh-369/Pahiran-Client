'use client'

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { cancelOrder, myOrders } from "@/lib/store/user/my-orders/my-orders-slice";
import { Status } from "@/lib/global/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const orderStages = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-400",
  confirmed: "bg-blue-500",
  shipped: "bg-indigo-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};
const MyOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { orders, status } = useAppSelector((state) => state.myOrdersSlice);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const handleCancelOrder = async (orderId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    const result = await dispatch(cancelOrder(orderId));
    if (result?.success) toast.success(result.message || "Order cancelled successfully");
    else toast.error(result.message || "Failed to cancel order");
  };

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center py-20 space-x-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-500 text-lg">Fetching your orders...</span>
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="flex justify-center py-20 text-red-500 text-lg">
        Failed to load orders. Please try again.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center py-20 text-gray-400 text-lg">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {orders.map((order) => {
        const orderStageIndex = orderStages.indexOf(order.orderStatus);

        return (
          <div
            key={order.id}
            className="rounded-3xl border border-sky-200 bg-green-300 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="px-6 py-4 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="mt-2 md:mt-0 space-y-1 text-right">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                    order.payment.paymentStatus.toLowerCase() === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment.paymentStatus}
                </span>
                <p className="text-md font-semibold text-gray-800">
                Total: Rs. {(Number(order.totalAmount) || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Status Progress Bar */}
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                {orderStages.map((stage, idx) => (
                  <div key={stage} className="flex-1 flex flex-col items-center relative">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        idx <= orderStageIndex ? statusColor[stage] : "bg-gray-300"
                      } transition-all duration-500`}
                    ></div>
                    {idx < orderStages.length - 1 && (
                      <div
                        className={`absolute top-1/2 left-1/2 w-full h-1 ${
                          idx < orderStageIndex ? statusColor[stage] : "bg-gray-300"
                        }`}
                        style={{ zIndex: -1 }}
                      ></div>
                    )}
                    <span className="mt-2 text-xs text-gray-500 capitalize">{stage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.orderDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-xl flex items-center space-x-4 p-3 hover:scale-105 transition-transform duration-200 shadow-sm"
                >
                  <img
                    src={detail.product.productImage}
                    alt={detail.product.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">{detail.product.productName}</h3>
                    <p className="text-sm text-gray-500">Qty: {detail.orderQuantity}</p>
                    <p className="text-sm font-semibold text-indigo-600">Rs. {detail.product.productPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              {(order.orderStatus === "pending" || order.orderStatus === "shipped") && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition"
                >
                  Cancel Order
                </button>
              )}
              <button
                onClick={() => router.push(`/user/dashboard/my-orders/${order.id}`)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                View Details →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
