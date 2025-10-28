import { UserContext, UserContextType } from "@/contexts/UserContext";
import { useContext } from "react";

export const useUser = () => useContext(UserContext) as UserContextType;

