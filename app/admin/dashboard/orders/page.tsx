// "use client";
// import React, { useEffect, useState } from "react";
// import { Status } from "@/lib/global/type";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
// import { fetchAllOrdersForAdmin } from "@/lib/store/admin/orders/orders-slice";

// const AdminOrdersTable: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { orders, status } = useAppSelector((state) => state.adminOrdersSlice);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     dispatch(fetchAllOrdersForAdmin());
//   }, [dispatch]);

//   // Filter orders by customer name or phone
//   const filteredOrders = orders.filter(
//     (o) =>
//       o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       o.phoneNumber.includes(searchTerm)
//   );

//   return (
//     <div className="p-6 bg-sky-100 min-h-screen text-sm">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Orders Dashboard</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by customer name or phone..."
//           className="w-full md:w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-sky-200 shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-blue-400">
//             <tr>
//               {[
//                 "Product",
//                 "Customer Name",
//                 "Phone",
//                 "Quantity",
//                 "Total Amount",
//                 "Order Status",
//                 "Payment Method",
//                 "Payment Status",
//                 "QR",
//                 "Order Placed On",
//               ].map((heading) => (
//                 <th
//                   key={heading}
//                   className="px-4 py-3 text-left text-gray-600 text-xs font-semibold uppercase tracking-wide"
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-100">
//             {filteredOrders.map((order) => (
//               <tr
//                 key={order.orderId}
//                 className="hover:bg-blue-300 transition duration-150 ease-in-out"
//               >
//                 <td className="px-4 py-3">
//                   {order.productImage ? (
//                     <img
//                       src={order.productImage}
//                       alt="product"
//                       className="w-10 h-10 object-cover rounded-md shadow-sm border border-gray-200"
//                     />
//                   ) : (
//                     <span className="text-gray-400 italic">No image</span>
//                   )}
//                 </td>

//                 <td className="px-4 py-3 font-medium">{order.customerName}</td>

//                 <td className="px-4 py-3">{order.phoneNumber}</td>

//                 <td className="px-4 py-3 text-center">{order.quantity}</td>

//                 <td className="px-4 py-3 text-center font-semibold">
//                   Rs. {order.totalAmount.toLocaleString()}
//                 </td>

//                 <td
//                   className={`px-4 py-3 text-center font-medium ${
//                     order.orderStatus === "pending"
//                       ? "text-yellow-500"
//                       : order.orderStatus === "delivered"
//                       ? "text-green-600"
//                       : "text-blue-600"
//                   }`}
//                 >
//                   {order.orderStatus}
//                 </td>

//                 <td className="px-4 py-3 text-center">{order.paymentMethod}</td>

//                 <td
//                   className={`px-4 py-3 text-center font-medium ${
//                     order.paymentStatus === "pending"
//                       ? "text-yellow-500"
//                       : order.paymentStatus === "completed"
//                       ? "text-green-600"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {order.paymentStatus}
//                 </td>

//                 <td className="px-4 py-3 text-center">
//                   {order.qr ? (
//                     <a
//                       href={order.qr}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       View
//                     </a>
//                   ) : (
//                     <span className="text-gray-400 italic">N/A</span>
//                   )}
//                 </td>

//                 <td className="px-4 py-3 text-center text-gray-600">
//                   {new Date(order.orderPlacedOn).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}

//             {filteredOrders.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={10}
//                   className="text-center py-6 text-gray-400 italic text-sm"
//                 >
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminOrdersTable;

//2nd
"use client";

import React, { useEffect, useState } from "react";
import { Status, OrderStatus, PaymentStatus } from "@/lib/global/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { fetchAllOrdersForAdmin, editAdminOrder } from "@/lib/store/admin/orders/orders-slice";

const AdminOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.adminOrdersSlice);

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Editing state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  // Use string for dropdown state, allow fallback for null
  const [tempOrderStatus, setTempOrderStatus] = useState<string>(OrderStatus.Pending);
  const [tempPaymentStatus, setTempPaymentStatus] = useState<string>(PaymentStatus.Pending);

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchAllOrdersForAdmin());
  }, [dispatch]);

  // Filter orders by customer name or phone
  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phoneNumber.includes(searchTerm)
  );

  // Start editing a row
  const startEditing = (order: typeof filteredOrders[0]) => {
    setEditingOrderId(order.orderId);
    setTempOrderStatus(order.orderStatus ?? OrderStatus.Pending);
    setTempPaymentStatus(order.paymentStatus ?? PaymentStatus.Pending);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingOrderId(null);
    setTempOrderStatus(OrderStatus.Pending);
    setTempPaymentStatus(PaymentStatus.Pending);
  };

  // Save changes
  const saveEditing = async (orderId: string) => {
    await dispatch(
      editAdminOrder({
        orderId,
        orderStatus: tempOrderStatus,
        paymentStatus: tempPaymentStatus,
      })
    );
    cancelEditing();
  };

  return (
    <div className="p-6 bg-sky-100 min-h-screen text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders Dashboard</h1>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          className="w-full md:w-1/3 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-sky-200 shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400">
            <tr>
              {[
                "Product",
                "Customer Name",
                "Phone",
                "Quantity",
                "Total Amount",
                "Order Status",
                "Payment Method",
                "Payment Status",
                "QR",
                "Order Placed On",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-gray-600 text-xs font-semibold uppercase tracking-wide"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-blue-300 transition duration-150 ease-in-out"
              >
                {/* Product */}
                <td className="px-4 py-3">
                  {order.productImage ? (
                    <img
                      src={order.productImage}
                      alt="product"
                      className="w-10 h-10 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>

                {/* Customer Name */}
                <td className="px-4 py-3 font-medium">{order.customerName}</td>

                {/* Phone */}
                <td className="px-4 py-3">{order.phoneNumber}</td>

                {/* Quantity */}
                <td className="px-4 py-3 text-center">{order.quantity}</td>

                {/* Total Amount */}
                <td className="px-4 py-3 text-center font-semibold">
                  Rs. {order.totalAmount.toLocaleString()}
                </td>

                {/* Order Status */}
                <td className="px-4 py-3 text-center font-medium">
                  {editingOrderId === order.orderId ? (
                    <select
                      value={tempOrderStatus}
                      onChange={(e) => setTempOrderStatus(e.target.value)}
                      className={`border px-2 py-1 rounded ${
                        tempOrderStatus === OrderStatus.Pending
                          ? "text-yellow-500"
                          : tempOrderStatus === OrderStatus.Delivered
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`${
                        order.orderStatus === OrderStatus.Pending
                          ? "text-yellow-500"
                          : order.orderStatus === OrderStatus.Delivered
                          ? "text-green-600"
                          : "text-blue-600"
                      } cursor-pointer`}
                      onClick={() => startEditing(order)}
                    >
                      {order.orderStatus ?? OrderStatus.Pending}
                    </span>
                  )}
                </td>

                {/* Payment Method */}
                <td className="px-4 py-3 text-center">{order.paymentMethod}</td>

                {/* Payment Status */}
                <td className="px-4 py-3 text-center font-medium">
                  {editingOrderId === order.orderId ? (
                    <select
                      value={tempPaymentStatus}
                      onChange={(e) => setTempPaymentStatus(e.target.value)}
                      className={`border px-2 py-1 rounded ${
                        tempPaymentStatus === PaymentStatus.Pending
                          ? "text-yellow-500"
                          : tempPaymentStatus === PaymentStatus.Paid
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {Object.values(PaymentStatus).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`${
                        order.paymentStatus === PaymentStatus.Pending
                          ? "text-yellow-500"
                          : order.paymentStatus === PaymentStatus.Paid
                          ? "text-green-600"
                          : "text-red-500"
                      } cursor-pointer`}
                      onClick={() => startEditing(order)}
                    >
                      {order.paymentStatus ?? PaymentStatus.Pending}
                    </span>
                  )}
                </td>

                {/* QR */}
                <td className="px-4 py-3 text-center">
                  {order.qr ? (
                    <a
                      href={order.qr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>

                {/* Order Placed On */}
                <td className="px-4 py-3 text-center text-gray-600">
                  {new Date(order.orderPlacedOn).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex justify-center gap-2">
                  {editingOrderId === order.orderId && (
                    <>
                      <button
                        onClick={() => saveEditing(order.orderId)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {/* No Orders */}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="text-center py-6 text-gray-400 italic text-sm"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Loading / Error */}
      {status === Status.LOADING && (
        <div className="text-center py-4 text-gray-500">Loading orders...</div>
      )}
      {status === Status.ERROR && (
        <div className="text-center py-4 text-red-500">
          Failed to load orders. Please try again.
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;

