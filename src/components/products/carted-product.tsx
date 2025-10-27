import { IProduct } from "@/interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Image } from "@heroui/image";
import {
  CaretRightIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
type Props = {
  product: IProduct;
  onDelete?: () => void;
  onEdit?: () => void;
  onClick?: () => void;
  onChange?: (checked: boolean) => void;
};

const CartedProduct = ({
  product,
  onChange,
  onClick,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Card className="w-full flex flex-row justify-between items-center p-4">
      <Checkbox size="lg" onValueChange={onChange}>
        <div className="ml-4 w-full flex flex-row gap-4 items-center text-base flex-shrink-0">
          <Image
            alt={product.name}
            src={product.imageUrl}
            radius="lg"
            height={96}
            className="object-contain"
          />
          <div className="py-4 w-full">
            <h3 className="font-heading text-sm">{product.name}</h3>
            <p className="text-default-500">
              Quantity: {product.cartedQuantity}
            </p>
          </div>
        </div>
      </Checkbox>
      <div className="flex flex-row items-center">
        <Button
          isIconOnly
          color="danger"
          variant="light"
          radius="full"
          onPress={onDelete}
        >
          <TrashIcon size={20} />
        </Button>
        <Button isIconOnly variant="light" radius="full" onPress={onEdit}>
          <PencilSimpleIcon size={20} />
        </Button>
        <Button isIconOnly variant="light" radius="full" onPress={onClick}>
          <CaretRightIcon size={20} />
        </Button>
      </div>
    </Card>
  );
};

export default CartedProduct;
