import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { userId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!userId && !storedUserId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  if (!userId && !localStorage.getItem("userId")) {
    return null;
  }

  return <Outlet />;
};
