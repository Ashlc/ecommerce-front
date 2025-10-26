import { createContext, ReactNode, useState } from "react";

export interface TitleContextType {
  title?: string;
  setTitle: (title: string) => void;
  icon: ReactNode | undefined;
  setIcon: (icon: ReactNode | undefined) => void;
}

export const TitleContext = createContext({});

export const TitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitleState] = useState("");
  const [icon, setIcon] = useState<ReactNode | undefined>(undefined);

  const setTitle = (title: string) => {
    setTitleState(title);
    document.title = title ? `${title} - E-commerce` : "E-commerce";
  };

  return (
    <TitleContext.Provider value={{ title, setTitle, icon, setIcon }}>
      {children}
    </TitleContext.Provider>
  );
};
