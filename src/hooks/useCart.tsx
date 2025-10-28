import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

// Backward compatible hook - now uses UserContext
export const useCart = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useCart must be used within a UserProvider");
  }

  // Return only cart-related properties for backward compatibility
  return {
    userId: userContext.userId,
    setUserId: userContext.setUserId,
    cart: userContext.cart,
    addToCart: userContext.addToCart,
    isAddingToCart: userContext.isAddingToCart,
    removeFromCart: userContext.removeFromCart,
    isRemovingFromCart: userContext.isRemovingFromCart,
    refetchCart: userContext.refetchCart,
  };
};
