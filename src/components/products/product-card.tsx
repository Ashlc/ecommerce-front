import { IProduct } from "@/interfaces";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
type Props = {
  product: IProduct;
  onPress?: () => void;
};

const ProductCard = ({ product, onPress, ...rest }: Props) => {
  return (
    <Card
      isPressable
      onPress={onPress}
      {...rest}
      className="dark:shadow-white"
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt={product.name}
          radius="lg"
          className="w-full object-cover aspect-square"
          fallbackSrc="/images/fallback-image.png"
          isBlurred
          shadow="sm"
          src={product.imageUrl}
        />
      </CardBody>
      <CardFooter className="flex-col items-start gap-4">
        <b className="text-start text-sm w-full truncate whitespace-nowrap">
          {product.name}
        </b>
        <p className="text-xl text-primary-500 font-medium dark:text-default-900">
          R${" "}
          {product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
