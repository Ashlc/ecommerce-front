import { ICart, ICartItem, IOrder, IUser } from "@/interfaces";
import api from "@/services/api";
import {
  QueryObserverResult,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

export interface UserContextType {
  // User identity
  userId: string;
  setUserId: (userId: string) => void;
  user: IUser | undefined;
  isLoadingUser: boolean;

  // Cart functionality
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

  // Orders
  orders: IOrder[];
  isLoadingOrders: boolean;
  refetchOrders: () => Promise<QueryObserverResult<IOrder[], Error>>;
  refetchAll: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userIdState, setUserIdStateInternal] = useState<string>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId || "";
  });

  const setUserId = (newUserId: string) => {
    setUserIdStateInternal(newUserId);
    if (newUserId) {
      localStorage.setItem("userId", newUserId);
    } else {
      localStorage.removeItem("userId");
    }
  };

  const userId = userIdState;

  // Fetch user information
  const { data: user, isLoading: isLoadingUser } = useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await api.get<IUser>(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId, // Only fetch when userId exists
  });

  // Fetch cart
  const { data: cart = [], refetch: refetchCart } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await api.get<ICart>(`/cart/${userId}`);
      return res.data?.products || [];
    },
    enabled: !!userId, // Only fetch when userId exists
  });

  // Add to cart mutation
  const { mutate: addToCart, isPending: isAddingToCart } = useMutation<
    void,
    unknown,
    { productId: string; quantity: number }
  >({
    mutationFn: async ({ productId, quantity }) => {
      await api.post(`/cart/${userId}/items`, { productId, quantity });
    },
    onSuccess: () => {
      refetchCart();
    },
  });

  // Remove from cart mutation
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

  // Fetch orders
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    refetch: refetchOrders,
  } = useQuery<IOrder[]>({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const res = await api.get<IOrder[]>(`/orders/user/${userId}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!userId, // Only fetch when userId exists
  });

  const refetchAll = () => {
    refetchCart();
    refetchOrders();
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        user,
        isLoadingUser,
        cart,
        addToCart,
        isAddingToCart,
        removeFromCart,
        isRemovingFromCart,
        refetchCart,
        orders,
        isLoadingOrders,
        refetchOrders,
        refetchAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
