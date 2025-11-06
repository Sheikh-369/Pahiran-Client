export enum Status{
    IDLE="idle",
    ERROR="error",
    LOADING="loading",
    SUCCESS="success"
}

export enum PaymentMethods {
  COD = "cod",
  QR = "qr",
}

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export enum PaymentStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
}