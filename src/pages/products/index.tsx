import PageTitle from "@/components/page-title";
import ProductCard from "@/components/products/product-card";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/interfaces";
import api from "@/services/api";
import { Button, ButtonGroup } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@phosphor-icons/react";
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

  const { data: related = [], isLoading: isLoadingRelated } = useQuery({
    queryKey: ["related", id],
    queryFn: async () => {
      const res = await api.get<IProduct[]>(`/catalog/related/${id}`);
      return res.data;
    },
  });

  const handleAddToCart = async () => {
    if (id) {
      await addToCart({ productId: id, quantity });
    }
    navigate("/cart");
  };

  const randomRating = Math.floor(Math.random() * 5) + 1;
  const emptyStars = 5 - randomRating;
  const randomAmount = Math.floor(Math.random() * 100) + 1;

  const isDiscount = true;
  const discountPercentage = isDiscount
    ? Math.floor(Math.random() * 31) + 10
    : 0;

  return (
    <div className="bg-default-100 min-h-[calc(100vh-65px)] dark:bg-default-50/50">
      <div className="pt-8 lg:px-16">
        <PageTitle title="Product Details" />
      </div>
      {product && !isLoading ? (
        <div className="flex flex-col lg:px-16 gap-16 pb-16">
          <section className="flex flex-col lg:flex-row gap-16 h-fit">
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
              <div className="flex flex-col gap-4">
                <h1 className="font-heading text-2xl font-bold">
                  {product.name}
                </h1>
                <div className="flex flex-row items-center">
                  {Array.from({ length: randomRating }).map((_, index) => (
                    <StarIcon
                      key={`filled-star-${index}`}
                      size={20}
                      weight="fill"
                      className="text-primary-400 inline-block"
                    />
                  ))}
                  {Array.from({ length: emptyStars }).map((_, index) => (
                    <StarIcon
                      key={`empty-star-${index}`}
                      size={20}
                      className="text-default-300 inline-block"
                    />
                  ))}
                  <p className="ml-2">({randomAmount} reviews)</p>
                </div>
                <p className="mt-4">{product.description}</p>
              </div>
              <div className="flex flex-row gap-4 items-center mt-4">
                <p className="font-heading text-3xl font-semibold">
                  R$ {product.price}
                </p>
                {isDiscount && (
                  <>
                    <p className="text-default-500 line-through">
                      R${" "}
                      {(
                        (product.price * (100 + discountPercentage)) /
                        100
                      ).toFixed(2)}
                    </p>
                    <Chip>{discountPercentage}% OFF</Chip>
                  </>
                )}
              </div>
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
          {related.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Related products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                {related.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => navigate(`/products/${product.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductPage;
