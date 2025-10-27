import { ICart, ICartItem } from "@/interfaces";
import api from "@/services/api";
import {
  QueryObserverResult,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

export interface CartContextType {
  userId: string;
  setUserId: (userId: string) => void;
  cart: ICartItem[];
  addToCart: UseMutateFunction<
    void,
    unknown,
    { productId: string; quantity: number },
    unknown
  >;
  isAddingToCart: boolean;
  removeFromCart: UseMutateFunction<void, unknown, string, unknown>;
  isRemovingFromCart: boolean;
  refetchCart: () => Promise<QueryObserverResult<ICartItem[], Error>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>("cmh9l00gv000hted4jlbc59o7");
  const { data: cart = [], refetch: refetchCart } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await api.get<ICart>(`/cart/${userId}`);
      return res.data?.products || [];
    },
  });

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation<
    void,
    unknown,
    { productId: string; quantity: number }
  >({
    mutationFn: async ({ productId, quantity }) => {
      await api.post(`/cart/${userId}/items`, { productId, quantity });
    },
  });

  const { mutate: removeFromCart, isPending: isRemovingFromCart } = useMutation<
    void,
    unknown,
    string
  >({
    mutationFn: async (productId) => {
      await api.delete(`/cart/${userId}/items/${productId}`);
    },
    onSuccess: () => {
      refetchCart();
    },
  });

  return (
    <CartContext.Provider
      value={{
        userId,
        setUserId,
        cart,
        addToCart,
        isAddingToCart,
        removeFromCart,
        isRemovingFromCart,
        refetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
