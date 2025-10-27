import { products } from "@/services/mock";
import { Button, ButtonGroup } from "@heroui/button";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const product = products.find(
    (p) => `/products/${p.id}` === location.pathname,
  );

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/cart");
    }, 1000);
  };

  return (
    <div className="bg-default-100 h-[calc(100vh-65px)]">
      <div className="flex flex-row items-center gap-2 p-4 text-sm">
        <Button
          as={"a"}
          variant="light"
          href="/"
          size="sm"
          isIconOnly
          radius="full"
        >
          <ArrowLeftIcon size={18} />
        </Button>
        <p>Back to catalog</p>
      </div>
      {product ? (
        <section className="flex flex-col lg:flex-row p-8 gap-16 lg:px-16">
          <div className="basis-2/5">
            <Image
              src={product?.imageUrl || ""}
              alt={product?.name}
              isBlurred
              shadow="lg"
              className="w-full aspect-square"
            />
          </div>
          <Card className="flex flex-col gap-16 p-16 grow">
            <div className="flex flex-col gap-8">
              <h1 className="font-heading text-2xl font-bold">
                {product.name}
              </h1>
              <p className="mt-4">{product.description}</p>
            </div>
            <p className="font-heading text-3xl font-semibold mt-8">
              R$ {product.price}
            </p>
            <div className="flex flex-row gap-8 items-center">
              <Button
                variant="shadow"
                isLoading={loading}
                size="lg"
                color="primary"
                className="basis-1/2"
                endContent={<ShoppingCartIcon size={20} weight="bold" />}
                onPress={handleAddToCart}
              >
                Add to Cart
              </Button>
              <ButtonGroup color="primary" className="basis-1/2">
                <Button
                  isIconOnly
                  size="lg"
                  isDisabled={quantity === 1}
                  onPress={() => setQuantity((prev) => prev - 1)}
                >
                  <MinusIcon size={16} weight="bold" />
                </Button>
                <div className="px-6 h-12 border-y box-border border-default-200 flex justify-center items-center grow">
                  <span>{quantity}</span>
                </div>
                <Button
                  isIconOnly
                  size="lg"
                  onPress={() => setQuantity((prev) => prev + 1)}
                >
                  <PlusIcon size={16} weight="bold" />
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </section>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
