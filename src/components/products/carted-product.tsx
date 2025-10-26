import { IProduct } from "@/interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Image } from "@heroui/image";
import { CaretRightIcon } from "@phosphor-icons/react";
type Props = {
  product: IProduct;
  onChange?: (checked: boolean) => void;
};

const CartedProduct = ({ product, onChange }: Props) => {
  return (
    <Card className="w-full flex flex-row justify-between items-center p-4">
      <Checkbox size="lg" onValueChange={onChange}>
        <div className="ml-4 w-full flex flex-row gap-4 items-center text-base">
          <Image
            alt={product.name}
            src={product.imageUrl}
            radius="lg"
            height={96}
            className="object-cover"
          />
          <div className="py-4 w-full">
            <h3 className="font-heading text-sm">{product.name}</h3>
            <p className="text-default-500">
              Quantity: {product.cartedQuantity}
            </p>
          </div>
        </div>
      </Checkbox>
      <Button isIconOnly variant="light" radius="full">
        <CaretRightIcon size={20} />
      </Button>
    </Card>
  );
};

export default CartedProduct;
