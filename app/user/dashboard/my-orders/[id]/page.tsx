'use client'

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchOrderById } from "@/lib/store/user/my-orders/my-orders-slice";
import { Status } from "@/lib/global/type";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusColor: Record<string, string> = {
  pending: "text-yellow-600",
  confirmed: "text-blue-600",
  shipped: "text-indigo-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
};

const formatOrderStatus = (status: string) => {
  switch (status) {
    case "pending": return "Order Pending";
    case "confirmed": return "Order Confirmed";
    case "shipped": return "Shipped";
    case "delivered": return "Delivered";
    case "cancelled": return "Cancelled";
    default: return "Unknown Status";
  }
};

const OrderDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params!.id) ? params!.id[0] : params!.id; // ensure string

  const { selectedOrder, status } = useAppSelector((state) => state.myOrdersSlice);

  useEffect(() => {
    if (id) dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (status === Status.LOADING || !selectedOrder) {
    return <div className="flex justify-center py-10 text-gray-500 text-lg">Loading order details...</div>;
  }

  if (status === Status.ERROR) {
    return <div className="flex justify-center py-10 text-red-500 text-lg">Failed to load order. Please try again.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <button
        className="text-indigo-600 hover:text-indigo-800 font-medium mb-4"
        onClick={() => router.back()}
      >
        ← Back to My Orders
      </button>

      <div className="rounded-2xl border border-gray-200 p-6 shadow-md bg-linear-to-br from-[#f0f4ff] to-[#e0e7ff]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 pb-4 mb-4">
          <div className="space-y-1">
            <h2 className={`text-lg font-semibold ${statusColor[selectedOrder.orderStatus] || "text-gray-700"}`}>
              {formatOrderStatus(selectedOrder.orderStatus)}
            </h2>
            <p className="text-sm text-gray-600">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
          </div>
          <div className="mt-3 md:mt-0 text-right">
            <span className={`inline-block text-xs font-medium px-4 py-1 rounded-full shadow-sm ${
              selectedOrder.payment.paymentStatus.toLowerCase() === "completed"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {selectedOrder.payment.paymentStatus}
            </span>
            <p className="text-md font-semibold text-gray-800 mt-1">
              Total: Rs. {Number(selectedOrder.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedOrder.orderDetails.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-xl overflow-hidden flex items-center space-x-4 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={item.product.productImage}
                alt={item.product.productName}
                className="w-20 h-20 object-cover rounded-l-lg"
                loading="lazy"
              />
              <div className="py-2 pr-3">
                <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">
                  {item.product.productName}
                </h3>
                <p className="text-sm text-gray-500">Qty: {item.orderQuantity}</p>
                <p className="text-sm font-semibold text-indigo-600">Rs. {item.product.productPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
