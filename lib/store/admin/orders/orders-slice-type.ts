import { OrderStatus, PaymentMethods, PaymentStatus, Status } from "@/lib/global/type";

export interface IAdminOrderData {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  productImage: string | null;
  quantity: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethods | null;
  paymentStatus: PaymentStatus | null;
  qr: string | null;
  orderPlacedOn: string;
}

export interface IAdminOrderSliceState {
  orders: IAdminOrderData[];
  status:Status
}
