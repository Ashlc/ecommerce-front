import PageTitle from "@/components/page-title";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/interfaces";
import api from "@/services/api";
import { Button, ButtonGroup } from "@heroui/button";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, isAddingToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get<IProduct>(`/products/${id}`);
      return res.data;
    },
  });

  const handleAddToCart = async () => {
    if (id) {
      await addToCart({ productId: id, quantity });
    }
    navigate("/cart");
  };

  return (
    <div className="bg-default-100 h-[calc(100vh-65px)] dark:bg-default-50/60">
      <div className="pt-8 lg:px-16">
        <PageTitle title="Product Details" />
      </div>
      {product && !isLoading ? (
        <section className="flex flex-col lg:flex-row gap-16 lg:px-16 h-fit">
          <div className="basis-2/5 flex-shrink-0">
            <Image
              src={product?.imageUrl || ""}
              alt={product?.name}
              isLoading={isLoading}
              shadow="md"
              className="w-full aspect-square object-cover"
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
                isLoading={isAddingToCart}
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
