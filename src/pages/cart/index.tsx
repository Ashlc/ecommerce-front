import CartedProduct from "@/components/products/carted-product";
import { IProduct } from "@/interfaces";
import { products } from "@/services/mock";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { CaretUpIcon, ReceiptIcon, TruckIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

const CartPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [checkoutItems, setCheckoutItems] = useState<Set<IProduct>>(new Set());
  const [total, setTotal] = useState({
    productTotal: 0,
    shipping: 5,
    taxes: 0,
    grandTotal: 0,
  });

  const calculateTotal = () => {
    const productTotal = Array.from(checkoutItems).reduce(
      (sum, item) => sum + item.price * (item.cartedQuantity || 1),
      0,
    );
    const taxes = productTotal * 0.07;
    const grandTotal = productTotal + total.shipping + taxes;

    setTotal({
      productTotal,
      shipping: total.shipping,
      taxes,
      grandTotal,
    });
  };

  const handleProductSelect = (product: IProduct, checked: boolean) => {
    setCheckoutItems((prev) => {
      const updated = new Set(prev);
      if (checked) {
        updated.add(product);
      } else {
        updated.delete(product);
      }
      return updated;
    });
    calculateTotal();
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-default-100 dark:bg-default-50 h-[calc(100vh-65px)]">
      <div className="relative container basis-2/3">
        <ScrollShadow className="p-4 h-full relative" ref={scrollRef}>
          <h2 className="font-heading mb-6 font-medium text-lg">Your Cart</h2>
          <div className="flex flex-col gap-8 pb-24">
            {products
              .filter(
                (product) =>
                  product.cartedQuantity && product.cartedQuantity > 0,
              )
              .map((product) => (
                <CartedProduct
                  key={product.id}
                  product={product}
                  onChange={(checked) => handleProductSelect(product, checked)}
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
          className="absolute right-6 bottom-6"
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
      <Card className="basis-1/3 h-fit">
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
            {Array.from(checkoutItems).map((item) => (
              <div
                className="flex flex-row justify-between items-center"
                key={item.id}
              >
                <p>
                  {item.name} &times; {item.cartedQuantity}
                </p>
                <p>${(item.price * (item.cartedQuantity || 1)).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex flex-row justify-between w-full gap-4 text-lg border-y py-4 mt-4 border-default-200">
              <p>Product total:</p>
              <p className="font-bold">${total.productTotal.toFixed(2)}</p>
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
            <div className="flex flex-row gap-4 items-end">
              <Input
                label="ZIP code"
                labelPlacement="outside"
                placeholder="00000"
              />
              <Button color="primary">Calculate</Button>
            </div>
            <div className="flex flex-row justify-between w-full gap-4 mt-4 p-4 border border-default-200 rounded-lg bg-default-50 dark:bg-default-900">
              <span>Estimated Shipping:</span>
              <span className="font-bold">${total.shipping.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full gap-4 border-t pt-4 border-default-200">
            <span>Estimated taxes:</span>
            <span className="font-bold">${total.taxes.toFixed(2)}</span>
          </div>
          <div className="flex flex-row justify-between w-full gap-4 text-xl border-t pt-4 border-default-200">
            <span>Total:</span>
            <span className="font-bold">${total.grandTotal.toFixed(2)}</span>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            size="lg"
            className="w-full mt-4"
            color="primary"
            onPress={() => onSubmit({ items: Array.from(checkoutItems) })}
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartPage;
