import { useCart } from "@/hooks/useCart";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { BasketIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  return (
    <Badge
      content={cart.length > 0 ? cart.length : null}
      variant="shadow"
      color="primary"
      placement="bottom-right"
      size="sm"
    >
      <Button
        onPress={() => navigate("/cart")}
        isIconOnly
        variant="light"
        aria-label="Cart"
        size="sm"
        radius="full"
      >
        <BasketIcon className="w-5 h-5" />
      </Button>
    </Badge>
  );
};

export default Cart;
