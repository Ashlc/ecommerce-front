import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Role,
  ShipmentStatus,
} from "@/types";

// ============================================================================
// CORE TYPES
// Primitive/shared types used across models
// ============================================================================

export interface ITimestamps {
  createdAt: string;
  updatedAt?: string;
}

export interface Identifiable {
  id: string;
}

export interface IEntity extends ITimestamps, Identifiable {}

// ============================================================================
// FOUNDATION MODELS
// Core entity models with no dependencies on other business entities
// ============================================================================

export interface IAddress extends IEntity {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IUser extends IEntity {
  name: string;
  email: string;
  dob: string;
  pfp: string;
  identificationNumber: string;
  phoneNumber: string;
  role: Role;
  address: IAddress;
}

export interface IProduct extends IEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  quantityInStock: number;
  imageUrl?: string;
  cartedQuantity?: number;
}

// ============================================================================
// CATALOG MODELS
// Product discovery and categorization models (depend on products)
// ============================================================================

export interface ICategory extends IEntity {
  name: string;
  description?: string;
}

export interface IRecommendation {
  idUser: string;
  product: IProduct;
}

// ============================================================================
// USER INTERACTION MODELS
// Models for user interactions with products
// ============================================================================

export interface IReview extends IEntity {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export interface ICartItem extends IEntity {
  productId: string;
  product: IProduct;
  quantity: number;
}

export interface ICart extends IEntity {
  userId: string;
  products: ICartItem[];
}

// ============================================================================
// TRANSACTION MODELS
// Order fulfillment and payment processing models (depend on users, products, and cart)
// ============================================================================

export interface IOrder extends IEntity {
  userId: string;
  products: IProduct[];
  productTotal: number;
  shippingCost?: number;
  taxes?: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate?: string;
  shipmentId?: string;
  paymentId?: string;
}

export interface IPayment extends IEntity {
  orderId: string;
  userId?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
}

export interface IShipment extends IEntity {
  orderId: string;
  shipmentDate: string;
  deliveryDate?: string;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
  userId?: string;
}
