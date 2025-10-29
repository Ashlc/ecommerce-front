import { IAddress, ICartItem } from "@/interfaces";
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

const calculateShippingCost = (address: Partial<IAddress>): number => {
  if (!address.state || !address.city || !address.zipCode) {
    console.error("Incomplete address for shipping calculation");
    return 0;
  }

  // Simular cálculo de frete baseado no estado e CEP
  let baseCost = 15.99; // Custo base

  // Ajustar custo baseado no estado
  switch (address.state) {
    case "SP":
      baseCost = 12.99; // São Paulo - mais barato
      break;
    case "RJ":
      baseCost = 14.99; // Rio de Janeiro
      break;
    case "MG":
      baseCost = 16.99; // Minas Gerais
      break;
    case "RS":
    case "SC":
    case "PR":
      baseCost = 18.99; // Sul - mais caro
      break;
    case "AM":
    case "AC":
    case "RO":
    case "RR":
    case "AP":
      baseCost = 25.99; // Norte - mais caro
      break;
    default:
      baseCost = 19.99; // Outros estados
  }

  // Ajustar baseado no CEP (simulação)
  const zipCode = address.zipCode.replace(/\D/g, "");
  if (zipCode.startsWith("01") || zipCode.startsWith("02")) {
    baseCost += 5.0; // Zona central - mais caro
  }

  console.log(
    `🚚 Custo de frete calculado para ${address.city}/${address.state}: R$ ${baseCost.toFixed(2)}`,
  );
  return baseCost;
};

const calculateShipping = async (zipCode: string) => {
  try {
    const address = await fetch(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    ).then((res) => res.json());

    console.log(address);

    if (!address.logradouro || !address.uf || !address.localidade) {
      console.error("Invalid address");
      return 0;
    }

    const shippingAddress: Partial<IAddress> = {
      street: address.logradouro,
      city: address.localidade,
      state: address.uf,
      zipCode: zipCode,
    };

    setTimeout(() => {
      console.log(
        `Fetched address for CEP ${zipCode}: ${address.logradouro}, ${address.localidade} - ${address.uf}`,
      );
    }, 500);

    return 10;
  } catch (error) {
    console.error("Error calculating shipping:", error);
    return 0;
  }
};

export {
  calculateShipping,
  calculateTotal,
  formatDate,
  getColorStyles,
  getOrderStatusColor,
};
