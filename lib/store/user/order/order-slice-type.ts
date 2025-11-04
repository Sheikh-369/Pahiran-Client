import { PaymentMethods, Status } from "@/lib/global/type";


// 🛒 Product inside order
export interface IOrderProduct {
  productId: string;
  orderQuantity: string | number;
}

// 🧍 Customer order data for backend
export interface IOrderData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string; // Optional now
  province: string;
  district: string;
  city: string;
  tole: string;
  totalAmount: string | number;
  paymentMethod: PaymentMethods;
  qrScreenshot?: File | string | null; // added for QR uploads
  products: IOrderProduct[];
}

// 🧾 Order items stored in slice (minimal)
export interface IOrderItems {
  productId: string;
  quantity: number;
  orderId: string;
}

// 🗂️ Slice state
export interface IOrderSliceState {
  items: IOrderItems[];
  status: Status;
}
