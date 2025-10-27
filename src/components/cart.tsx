import { useCart } from "@/hooks/useCart";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { BasketIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  return (
    <Badge content={cart.length} color="primary">
      <Button
        onPress={() => navigate("/cart")}
        isIconOnly
        variant="light"
        aria-label="Cart"
        size="sm"
        radius="full"
      >
        <BasketIcon className="w-6 h-6" />
      </Button>
    </Badge>
  );
};

export default Cart;
