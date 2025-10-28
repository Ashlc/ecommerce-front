import { useUser } from "@/hooks/useUser";
import { IUser } from "@/interfaces";
import api from "@/services/api";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";
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
      const res = await api.get<IUser[]>("/api/users");
      const user = res.data.find((u: IUser) => u.email === email);

      if (!user) {
        setError("User not found.");
        setIsLoading(false);
        return;
      }

      setUserId(user.id);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("_auth", "dummy_token");
      navigate("/");
    } catch (err) {
      addToast({
        title: "We couldn't log you in. Try again?",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = () => {
    setIsLoading(true);
    setUserId("cmh9l00gv000hted4jlbc59o7");
    localStorage.setItem("userId", "cmh9l00gv000hted4jlbc59o7");
    localStorage.setItem("_auth", "dummy_token");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 600);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-default-100 dark:bg-default-50/50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col px-6 pt-8">
          <h2 className="font-heading text-2xl font-medium">
            Log in to{" "}
            <span className="font-heading font-bold text-primary">iShop</span>
          </h2>
        </CardHeader>
        <CardBody className="gap-4 px-6 pb-12">
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
          <p className="text-sm text-right">
            Forgot your password?
            <span className="text-primary cursor-pointer ml-1">
              Click here!
            </span>
          </p>
          <Button
            color="primary"
            size="lg"
            onPress={handleLogin}
            isLoading={isLoading}
            className="w-full mt-4"
          >
            Login
          </Button>
          <Button
            variant="light"
            size="sm"
            onPress={handleQuickLogin}
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
