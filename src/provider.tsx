import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { useHref, useNavigate } from "react-router-dom";
import { TitleProvider } from "./contexts/TitleContext";
import { UserProvider } from "./contexts/UserContext";
import { qc } from "./services/queryClient";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <QueryClientProvider client={qc}>
        <UserProvider>
          <TitleProvider>{children}</TitleProvider>
        </UserProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
