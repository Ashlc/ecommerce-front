import { useUser } from "@/hooks/useUser";
import { IOrder } from "@/interfaces";
import api from "@/services/api";
import { formatDate, getOrderStatusColor } from "@/services/helpers";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import {
  ArrowsClockwiseIcon,
  CalendarBlankIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";

type Props = {
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
};

const OrderDetailsModal = ({ order, isOpen, onClose }: Props) => {
  const { refetchOrders } = useUser();
  const { mutate: processPayment, isPending } = useMutation({
    mutationFn: async () => {
      if (!order) return;
      await api.post(`/payments/process/`, {
        orderId: order.id,
        method: "credit_card",
      });
    },
    onSuccess: () => {
      onClose();
      refetchOrders();
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {order ? (
          <>
            <ModalHeader className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <ReceiptIcon className="text-primary-500" size={24} />
                <span className="font-heading">
                  Order #{order.id.slice(0, 8)}
                </span>
              </div>
            </ModalHeader>
            <ModalBody className="gap-4">
              <div className="flex justify-between items-center">
                <Chip
                  className="capitalize"
                  color={getOrderStatusColor(order.status)}
                  variant="flat"
                >
                  {order.status}
                </Chip>
                <div className="flex items-center gap-1 text-default-500">
                  <CalendarBlankIcon size={18} />
                  <p>{formatDate(order.orderDate || order.createdAt)}</p>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-default-600">Product Total:</span>
                  <span className="font-medium">
                    ${order.productTotal.toFixed(2)}
                  </span>
                </div>
                {order.shippingCost && (
                  <div className="flex justify-between">
                    <span className="text-default-600">Shipping:</span>
                    <span className="font-medium">
                      ${order.shippingCost.toFixed(2)}
                    </span>
                  </div>
                )}
                {order.taxes && (
                  <div className="flex justify-between">
                    <span className="text-default-600">Taxes:</span>
                    <span className="font-medium">
                      ${order.taxes.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <Divider />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <Divider />
              {order.products.length > 0 && (
                <div className="flex flex-col gap-4 p-4 bg-default-100 rounded-lg">
                  <p className="font-heading text-sm text-default-600">Items</p>
                  <div className="flex flex-col gap-2">
                    {order.products.slice(0, 3).map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="truncate flex-1">{product.name}</span>
                        <span className="font-medium ml-4">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="text-xs text-default-500">
                        +{order.products.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => processPayment()}
                color="primary"
                endContent={<ArrowsClockwiseIcon size={18} />}
                isLoading={isPending}
              >
                Process payment
              </Button>
            </ModalFooter>
          </>
        ) : (
          <Skeleton>
            <div className="h-64 w-lg" />
          </Skeleton>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsModal;
