import { CartContext, CartContextType } from "@/contexts/CartContext";
import { useContext } from "react";

export const useCart = () => useContext(CartContext) as CartContextType;
