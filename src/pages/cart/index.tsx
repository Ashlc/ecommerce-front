import PageTitle from "@/components/page-title";
import CartedProduct from "@/components/products/carted-product";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/interfaces";
import { calculateShipping, calculateTotal } from "@/services/helpers";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import {
  BasketIcon,
  CaretRightIcon,
  CaretUpIcon,
  ReceiptIcon,
  TruckIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [checkoutItems, setCheckoutItems] = useState<Set<ICartItem>>(new Set());
  const [shipping, setShipping] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const { cart, removeFromCart, isRemovingFromCart } = useCart();
  const [total, setTotal] = useState({
    productTotal: 0,
    taxes: 0,
    grandTotal: 0,
  });
  const navigate = useNavigate();

  const handleTotals = () => {
    const shipping = calculateShipping(zipCode.replace("-", ""));
    setShipping(shipping);
    const totals = calculateTotal(cart);
    setTotal({
      productTotal: totals.productTotal,
      taxes: totals.taxes,
      grandTotal: totals.grandTotal + shipping,
    });
  };

  useEffect(() => {
    handleTotals();
  }, [checkoutItems, shipping]);

  const onSubmit = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-default-100 dark:bg-default-50/50 md:h-[calc(100vh-65px)]">
      <div className="relative container basis-2/3">
        <ScrollShadow
          className="max-sm:overflow-visible lg:px-4 relative h-full"
          ref={scrollRef}
        >
          <PageTitle title="Your cart" icon={BasketIcon} />
          <div className="flex flex-col gap-8 lg:pb-24">
            {cart.map((item: ICartItem) => (
              <CartedProduct
                key={item.id}
                product={item.product}
                quantity={item.quantity}
                onDelete={() => removeFromCart(item.id)}
                onClick={() => navigate(`/products/${item.id}`)}
              />
            ))}
          </div>
        </ScrollShadow>
        <Button
          isIconOnly
          color="primary"
          radius="full"
          variant="shadow"
          size="lg"
          className="max-sm:hidden absolute right-6 bottom-6"
          onPress={() => {
            scrollRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <CaretUpIcon size={20} />
        </Button>
      </div>
      <Card className="basis-1/3">
        <CardHeader className="flex flex-row gap-2 p-4 items-center">
          <ReceiptIcon
            size={32}
            className="text-primary-500"
            weight="duotone"
          />
          <h2 className="font-heading font-medium text-primary">
            Order Summary
          </h2>
        </CardHeader>
        <CardBody className="gap-8">
          <div className="flex flex-col gap-2 pt-4 border-t border-default-200">
            {cart.length === 0 && (
              <p className="text-default-500">No items selected.</p>
            )}
            {cart.map((item) => (
              <div
                className="flex flex-row justify-between items-center"
                key={item.id}
              >
                <p>
                  <span className="whitespace-nowrap truncate">
                    {item.product.name}
                  </span>{" "}
                  &times; {item.quantity}
                </p>
                <p>${(item.product.price * (item.quantity || 1)).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex flex-row justify-between w-full gap-4 text-lg border-y py-4 mt-2 border-default-200">
              <p>Product total:</p>
              <p className="font-semibold">${total.productTotal.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <TruckIcon
                size={24}
                className="mb-4 text-primary-500"
                weight="duotone"
              />
              <h2 className="font-heading text-primary">
                Shipping Information
              </h2>
            </div>
            <div className="flex flex-row gap-4 items-start">
              <InputMask
                mask="99999-999"
                value={zipCode}
                onChange={(e) => {
                  console.log(e);
                  setZipCode(e.target.value);
                }}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    label="ZIP code"
                    placeholder="00000-000"
                    size="sm"
                  />
                )}
              </InputMask>
              <Button
                color="primary"
                size="lg"
                onPress={() => calculateShipping(zipCode)}
              >
                Calculate
              </Button>
            </div>
            <div className="flex flex-row justify-between w-full gap-4 mt-4 p-4 border border-default-200 rounded-xl bg-default-50">
              <span>Estimated Shipping:</span>
              <span className="font-bold">${shipping.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full gap-4 border-y py-4 border-default-200">
            <span>Estimated taxes:</span>
            <span className="font-medium">${total.taxes.toFixed(2)}</span>
          </div>
          <div className="flex flex-row justify-between w-full gap-4 text-xl border-default-200">
            <span>Total:</span>
            <span className="font-bold">${total.grandTotal.toFixed(2)}</span>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            size="lg"
            className="w-full mt-4"
            color="primary"
            onPress={() => onSubmit()}
            endContent={<CaretRightIcon size={20} />}
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartPage;
