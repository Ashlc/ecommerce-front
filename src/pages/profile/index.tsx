import PageTitle from "@/components/page-title";
import OrderDetailsModal from "@/components/profile/order-details";
import { useUser } from "@/hooks/useUser";
import { IOrder } from "@/interfaces";
import { UserIcon } from "@phosphor-icons/react";
import { useState } from "react";
import OrderSection from "./order-section";
import UserSection from "./user-section";

const ProfilePage = () => {
  const { user, isLoadingUser } = useUser();
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();

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
    <div className="bg-default-100 dark:bg-default-50/50 min-h-[calc(100vh-65px)] p-8 lg:px-16">
      <PageTitle title="My Profile" icon={UserIcon} />
      <div className="flex flex-col gap-16">
        <UserSection />
        <OrderSection onSelectOrder={(order) => setSelectedOrder(order)} />
      </div>
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(undefined)}
      />
    </div>
  );
};

export default ProfilePage;
