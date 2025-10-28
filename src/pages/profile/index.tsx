import PageTitle from "@/components/page-title";
import { useUser } from "@/hooks/useUser";
import { IOrder } from "@/interfaces";
import { OrderStatus } from "@/types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { ScrollShadow } from "@heroui/scroll-shadow";
import {
    CalendarBlankIcon,
    IdentificationCardIcon,
    PackageIcon,
    ReceiptIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "primary";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "default";
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OrderCard = ({ order }: { order: IOrder }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ReceiptIcon className="text-primary-500" size={20} />
            <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-default-500">
            <CalendarBlankIcon size={16} />
            <span>{formatDate(order.orderDate || order.createdAt)}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          order.status === 'delivered' ? 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300' :
          order.status === 'shipped' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' :
          order.status === 'pending' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300' :
          'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300'
        }`}>
          {order.status}
        </span>
      </CardHeader>
      <CardBody className="gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-default-600">Products:</span>
            <span className="font-medium">{order.products.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-600">Product Total:</span>
            <span className="font-medium">${order.productTotal.toFixed(2)}</span>
          </div>
          {order.shippingCost && (
            <div className="flex justify-between">
              <span className="text-default-600">Shipping:</span>
              <span className="font-medium">${order.shippingCost.toFixed(2)}</span>
            </div>
          )}
          {order.taxes && (
            <div className="flex justify-between">
              <span className="text-default-600">Taxes:</span>
              <span className="font-medium">${order.taxes.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-default-200">
            <span>Total:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {order.products.length > 0 && (
          <div className="flex flex-col gap-2 mt-4 p-4 bg-default-100 rounded-lg">
            <span className="text-sm font-semibold text-default-600">Items:</span>
            <div className="flex flex-col gap-2">
              {order.products.slice(0, 3).map((product, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="truncate flex-1">{product.name}</span>
                  <span className="font-medium ml-4">${product.price.toFixed(2)}</span>
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
      </CardBody>
    </Card>
  );
};

const ProfilePage = () => {
  const { user, isLoadingUser, orders, isLoadingOrders } = useUser();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-65px)]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-65px)] gap-4">
        <UserIcon size={48} className="text-default-400" />
        <p className="text-default-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-default-100 dark:bg-default-50/50 h-[calc(100vh-65px)]">
      <ScrollShadow className="h-full overflow-x-hidden">
        <div className="p-8">
          <PageTitle title="My Profile" icon={UserIcon} />

          <div className="flex gap-4 my-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-primary text-white"
                  : "bg-default-200 hover:bg-default-300 dark:bg-default-100"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-primary text-white"
                  : "bg-default-200 hover:bg-default-300 dark:bg-default-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <PackageIcon size={20} />
                <span>Orders ({orders.length})</span>
              </div>
            </button>
          </div>

          {activeTab === "profile" && (
            <Card className="max-w-3xl">
              <CardHeader className="flex gap-4 items-center pb-0">
                <Image
                  src={user.pfp}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                  radius="full"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-default-500">{user.email}</p>
                </div>
              </CardHeader>
              <CardBody className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <IdentificationCardIcon
                      size={24}
                      className="text-primary-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-default-500">ID</span>
                      <span className="font-medium">{user.identificationNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <UserIcon size={24} className="text-primary-500" />
                    <div className="flex flex-col">
                      <span className="text-sm text-default-500">Role</span>
                      <span className="font-medium capitalize">{user.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <IdentificationCardIcon
                      size={24}
                      className="text-primary-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-default-500">Phone</span>
                      <span className="font-medium">{user.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarBlankIcon
                      size={24}
                      className="text-primary-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-default-500">Date of Birth</span>
                      <span className="font-medium">{formatDate(user.dob)}</span>
                    </div>
                  </div>
                </div>

                {user.address && (
                  <div className="border-t border-default-200 pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <IdentificationCardIcon className="text-primary-500" size={20} />
                      Address
                    </h3>
                    <div className="bg-default-100 p-4 rounded-lg">
                      <p className="font-medium">{user.address.street}</p>
                      <p className="text-default-600">
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </p>
                      <p className="text-default-600">{user.address.country}</p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          {activeTab === "orders" && (
            <div className="max-w-4xl">
              {isLoadingOrders ? (
                <div className="flex justify-center items-center py-20">
                  <p>Loading orders...</p>
                </div>
              ) : (!Array.isArray(orders) || orders.length === 0) ? (
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
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default ProfilePage;

