import { useUser } from "@/hooks/useUser";
import { IUser } from "@/interfaces";
import api from "@/services/api";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Buscar usuário por email (assumindo que o backend tem essa funcionalidade)
      // Se não tiver, você pode buscar todos os usuários e encontrar pelo email
      const res = await api.get<IUser[]>("/api/users");
      const user = res.data.find((u: IUser) => u.email === email);

      if (!user) {
        setError("Usuário não encontrado");
        setIsLoading(false);
        return;
      }

      // Setar o userId e salvar no localStorage
      setUserId(user.id);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("_auth", "dummy_token");
      navigate("/");
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = () => {
    // Login rápido com o usuário fornecido
    setUserId(""); // Vai ser setado pelo input abaixo
    setEmail("joao@teste.com");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-default-100 dark:bg-default-50/50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-default-500 text-sm">Enter your credentials</p>
        </CardHeader>
        <CardBody className="gap-4 px-6 pb-6">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
          />
          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}
          <Button
            color="primary"
            size="lg"
            onClick={handleLogin}
            isLoading={isLoading}
            className="w-full"
          >
            Login
          </Button>
          <Button
            variant="light"
            size="sm"
            onClick={handleQuickLogin}
            className="w-full"
          >
            Use Test Account (joao@teste.com)
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;

