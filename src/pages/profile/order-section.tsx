import OrderCard from "@/components/profile/order-card";
import { useUser } from "@/hooks/useUser";
import { IOrder } from "@/interfaces";
import { Card, CardBody } from "@heroui/card";
import { PackageIcon, ShoppingBagIcon } from "@phosphor-icons/react";

type Props = {
  onSelectOrder: (order: IOrder) => void;
};

const OrderSection = ({ onSelectOrder }: Props) => {
  const { orders, isLoadingOrders } = useUser();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <PackageIcon size={24} className="text-primary-500" />
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
      </div>

      {isLoadingOrders ? (
        <div className="flex justify-center items-center py-20">
          <p>Loading orders...</p>
        </div>
      ) : !Array.isArray(orders) || orders.length === 0 ? (
        <Card className="py-12">
          <CardBody className="flex flex-col items-center gap-4">
            <ShoppingBagIcon size={64} className="text-default-400" />
            <p className="text-default-500 text-lg">
              You haven't placed any orders yet
            </p>
          </CardBody>
        </Card>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => onSelectOrder(order)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSection;
