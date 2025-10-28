import { useUser } from "@/hooks/useUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar também localStorage pois pode não ter carregado ainda
    const storedUserId = localStorage.getItem("userId");
    if (!userId && !storedUserId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // Se não tem userId, não renderiza nada (vai redirecionar)
  if (!userId && !localStorage.getItem("userId")) {
    return null;
  }

  return <>{children}</>;
};

