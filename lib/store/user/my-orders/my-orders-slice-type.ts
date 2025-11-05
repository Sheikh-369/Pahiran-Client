import { Status } from "@/lib/global/type";

export interface IMyOrdersData {
  id: string;
  totalAmount: number;
  createdAt: string;
  orderStatus:'pending'|'confirmed'|'shipped'|'delivered'|'cancelled';
  payment: {
    paymentStatus: "pending" | "completed" | "failed"
  };
  orderDetails: {
    orderQuantity: number;
    product: {
      productName: string;
      productImage:string;
      productPrice: string;
    };
  }[];
}


export interface IMyOrdersSliceState {
  orders: IMyOrdersData[] | null;
  selectedOrder: IMyOrdersData | null;
  status:Status
}