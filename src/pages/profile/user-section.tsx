import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/services/helpers";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import {
  CalendarBlankIcon,
  IdentificationCardIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react";

const UserSection = () => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return (
    <div className="flex flex-row gap-8">
      <Card className="p-8 basis-1/2 flex flex-row gap-8">
        <div className="flex flex-col justify-center items-center gap-4 basis-1/3">
          <Avatar
            src={user.pfp}
            name={user.name}
            showFallback
            size="lg"
            className="h-24 w-24 text-xl font-heading"
          />
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold font-heading">{user.name}</h2>
            <p className="text-default-500">{user.email}</p>
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center h-14 w-14 bg-primary-100 rounded-full">
              <PhoneCallIcon size={24} className="text-primary-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-default-500">Phone</span>
              <span className="font-medium">{user.phoneNumber}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center h-14 w-14 bg-primary-100 rounded-full">
              <CalendarBlankIcon size={24} className="text-primary-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-default-500">Date of Birth</span>
              <span className="font-medium">{formatDate(user.dob)}</span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="basis-1/2">
        <CardHeader>
          <h3 className="text-lg flex gap-2 font-heading px-2 pt-2">
            <IdentificationCardIcon className="text-primary-500" size={24} />
            Address
          </h3>
        </CardHeader>
        <CardBody>
          {user.address && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Input
                label="Address"
                value={user.address.street}
                readOnly
                className="col-span-3"
              />
              <Input
                label="City"
                value={user.address.city}
                readOnly
                className="col-span-2"
              />
              <Input
                label="State"
                value={user.address.state}
                readOnly
                className="col-span-1"
              />
              <Input
                label="Zip Code"
                value={user.address.zipCode}
                readOnly
                className="col-span-1"
              />
              <Input
                label="Country"
                value={user.address.country}
                readOnly
                className="col-span-2"
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserSection;
