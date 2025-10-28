import { ICartItem } from "@/interfaces";
import { OrderStatus } from "@/types";

const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "primary";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "default";
  }
};

const getColorStyles = (
  status:
    | "primary"
    | "warning"
    | "danger"
    | "default"
    | "success"
    | "secondary",
) => {
  switch (status) {
    case "success":
      return {
        bg: "bg-success-100",
        text: "text-success-700",
        border: "border-success-200",
      };
    case "primary":
      return {
        bg: "bg-primary-100",
        text: "text-primary-700",
        border: "border-primary-200",
      };
    case "warning":
      return {
        bg: "bg-warning-100 dark:bg-warning-100",
        text: "text-warning-500 dark:text-warning-600",
        border: "border-warning-200",
      };
    case "danger":
      return {
        bg: "bg-danger-100",
        text: "text-danger-700",
        border: "border-danger-200",
      };
    default:
      return {
        bg: "bg-default-100",
        text: "text-default-700",
        border: "border-default-200",
      };
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const calculateTotal = (cart: ICartItem[]) => {
  const productTotal = cart.reduce(
    (sum, item) => sum + item.product.price * (item.quantity || 1),
    0,
  );
  const taxes = productTotal * 0.07;
  const grandTotal = productTotal + taxes;
  return { productTotal, taxes, shipping: 10, grandTotal };
};

const calculateShipping = (zipCode: string) => {
  const zipCodeNum = parseInt(zipCode, 10);
  if (zipCodeNum) {
    return Math.floor(zipCodeNum * 0.000001);
  }
  return 0;
};

export {
  calculateShipping,
  calculateTotal,
  formatDate,
  getColorStyles,
  getOrderStatusColor,
};
