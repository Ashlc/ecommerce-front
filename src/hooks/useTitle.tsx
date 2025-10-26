import { TitleContext, TitleContextType } from "@/contexts/TitleContext";
import { useContext } from "react";

export const useTitle = () => useContext(TitleContext) as TitleContextType;
