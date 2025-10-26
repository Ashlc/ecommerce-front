import { products } from "@/services/mock";
import { Button, ButtonGroup } from "@heroui/button";
import { Image } from "@heroui/image";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const product = products.find(
    (p) => `/products/${p.id}` === location.pathname,
  );

  const handleAddToCart = () => {
    // Logic to add the product to the cart
  };

  return (
    <div>
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
        <section className="flex flex-col lg:flex-row p-8 lg:px-16">
          <div className="basis-2/5">
            <Image
              src={product?.imageUrl || ""}
              alt={product?.name}
              className="w-full aspect-square"
            />
          </div>
          <div className="flex flex-col gap-16 px-16 py-4">
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
                size="lg"
                color="primary"
                className="basis-1/2"
                startContent={<ShoppingCartIcon size={16} />}
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
          </div>
        </section>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
