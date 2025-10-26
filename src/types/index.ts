import { SVGProps } from "react";

export type Role = "admin" | "user" | "guest";
export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "boleto";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type ShipmentStatus =
  | "pending"
  | "in_transit"
  | "delivered"
  | "returned";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
