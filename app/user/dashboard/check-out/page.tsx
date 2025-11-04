"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { createAnOrder } from "@/lib/store/user/order/order-slice";
import { IOrderData, IOrderProduct } from "@/lib/store/user/order/order-slice-type";
import { PaymentMethods } from "@/lib/global/type";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cartSlice);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [tole, setTole] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(PaymentMethods.COD);
  const [qrScreenshot, setQrScreenshot] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setQrScreenshot(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return alert("Your cart is empty.");

    const orderProducts: IOrderProduct[] = items
      .filter((item) => item.product.id !== undefined)
      .map((item) => ({
        productId: item.product.id!,
        orderQuantity: item.quantity,
      }));

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.product.productPrice) * item.quantity,
      0
    );

    const orderData: IOrderData = {
      firstName,
      lastName,
      phoneNumber,
      email: email || undefined,
      province,
      district,
      city,
      tole,
      totalAmount,
      paymentMethod,
      qrScreenshot: paymentMethod === PaymentMethods.QR ? qrScreenshot : undefined,
      products: orderProducts,
    };

    dispatch(createAnOrder(orderData));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.productPrice) * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Cart Items */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <img
                  src={typeof item.product.productImage === "string" ? item.product.productImage : "/images/placeholder.png"}
                  alt={item.product.productName || "Product image"}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 mx-3">
                  <p className="font-medium text-gray-900 text-sm">{item.product.productName}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-emerald-600 font-semibold text-sm">
                  Rs. {(Number(item.product.productPrice) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 p-4 rounded-xl bg-white shadow-md text-gray-900 text-sm">
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Shipping</span>
              <span>Rs. {shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-base">
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Checkout Form */}
        <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
            />

            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
              <input
                type="text"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
              <input
                type="text"
                placeholder="Tole"
                value={tole}
                onChange={(e) => setTole(e.target.value)}
                required
                className="border border-gray-200 p-2 rounded-lg w-full focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none transition"
              />
            </div>

            <div className="space-y-2">
              <p className="font-medium text-gray-700">Payment Method:</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value={PaymentMethods.COD}
                  checked={paymentMethod === PaymentMethods.COD}
                  onChange={() => setPaymentMethod(PaymentMethods.COD)}
                  className="accent-emerald-500 w-4 h-4"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value={PaymentMethods.QR}
                  checked={paymentMethod === PaymentMethods.QR}
                  onChange={() => setPaymentMethod(PaymentMethods.QR)}
                  className="accent-emerald-500 w-4 h-4"
                />
                QR Payment
              </label>
            </div>

            {paymentMethod === PaymentMethods.QR && (
              <div>
                <label className="block mb-1 font-medium text-gray-700">Upload QR Screenshot:</label>
                <input type="file" accept="image/*" className="w-full text-sm" onChange={handleFileChange} />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
