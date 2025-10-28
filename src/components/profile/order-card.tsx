import { IOrder } from "@/interfaces";
import {
  formatDate,
  getColorStyles,
  getOrderStatusColor,
} from "@/services/helpers";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import {
  ArrowUpRightIcon,
  CalendarBlankIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";

type Props = {
  order: IOrder;
  onClick?: () => void;
};

const OrderCard = ({ order, onClick }: Props) => {
  const statusColor = getOrderStatusColor(order.status);
  const styles = getColorStyles(statusColor);
  return (
    <Card className="mb-3 flex  flex-row justify-between p-4">
      <div className="flex flex-row gap-2 grow">
        <div
          className={`flex items-center justify-center h-full aspect-square ${styles.bg} ${styles.text} rounded-full`}
        >
          <ReceiptIcon size={24} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg">#{order.id.replace('order_', '')}</p>
            <Chip
              className="capitalize"
              color={statusColor}
              variant="flat"
              size="sm"
            >
              {order.status}
            </Chip>
          </div>
          <div className="flex items-center gap-1 text-default-500">
            <CalendarBlankIcon size={18} />
            <p>{formatDate(order.orderDate || order.createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <div className="flex flex-col items-end">
          <div className="flex gap-2">
            <span className="font-medium">{order.products.length}</span>
            <span className="text-default-600">
              Item{order.products.length > 1 ? "s" : ""}
            </span>
          </div>
          <p className="flex gap-4 text-xl font-semibold">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
        <Button
          variant="ghost"
          isIconOnly
          size="lg"
          aria-label="View details"
          radius="full"
          onPress={onClick}
        >
          <ArrowUpRightIcon size={22} />
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
