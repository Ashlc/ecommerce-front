import PageTitle from "@/components/page-title";
import { cart } from "@/services/mock";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  CreditCardIcon,
  InvoiceIcon,
  ReceiptIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

type CheckoutFormValues = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState({
    productTotal: 0,
    taxes: 0,
    shipping: 10,
    grandTotal: 0,
  });

  useEffect(() => {
    const calculateTotal = () => {
      const productTotal = cart.reduce(
        (sum, item) => sum + item.price * (item.cartedQuantity || 1),
        0,
      );
      const taxes = productTotal * 0.07;
      const grandTotal = productTotal + taxes;

      setTotal({
        productTotal,
        taxes,
        shipping: 10,
        grandTotal,
      });
    };
    calculateTotal();
  }, []);

  const { control, handleSubmit } = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log("Order submitted", data);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-8 p-8 bg-default-100 md:h-[calc(100vh-65px)]"
    >
      <div className="container basis-2/3">
        <div className="flex flex-row gap-2">
          <PageTitle title="Checkout" icon={InvoiceIcon} backLink="/cart" />
        </div>

        <div className="flex flex-col gap-10">
          {/* Customer Information */}
          <Card>
            <CardHeader className="flex flex-row gap-2 p-4 items-center">
              <UserIcon size={20} className="text-primary-500" weight="bold" />
              <h2 className="font-heading font-medium text-primary">
                Customer Information
              </h2>
            </CardHeader>
            <CardBody className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Address"
                    placeholder="123 Main St"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="City"
                    placeholder="New York"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-1"
                  />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: "ZIP code is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="ZIP Code"
                    placeholder="10001"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-1"
                  />
                )}
              />
            </CardBody>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader className="flex flex-row gap-2 p-4 items-center">
              <CreditCardIcon
                size={20}
                className="text-primary-500"
                weight="bold"
              />
              <h2 className="font-heading font-medium text-primary">
                Payment Information
              </h2>
            </CardHeader>
            <CardBody className="gap-4">
              <Controller
                name="cardNumber"
                control={control}
                rules={{ required: "Card number is required" }}
                render={({ field, fieldState }) => (
                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        label="Card Number"
                        labelPlacement="outside"
                        placeholder="1234 5678 9012 3456"
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  </InputMask>
                )}
              />
              <div className="flex flex-row gap-4">
                <Controller
                  name="expiryDate"
                  control={control}
                  rules={{ required: "Expiry date is required" }}
                  render={({ field, fieldState }) => (
                    <InputMask
                      mask="99/99"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          label="Expiry Date"
                          labelPlacement="outside"
                          placeholder="MM/YY"
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    </InputMask>
                  )}
                />
                <Controller
                  name="cvv"
                  control={control}
                  rules={{ required: "CVV is required" }}
                  render={({ field, fieldState }) => (
                    <Input
                      label="CVV"
                      labelPlacement="outside"
                      placeholder="123"
                      type="password"
                      {...field}
                      isInvalid={!!fieldState.error}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="basis-1/3 h-fit mt-14">
        <CardHeader className="flex flex-row gap-2 p-4 items-center">
          <ReceiptIcon size={20} className="text-primary-500" weight="bold" />
          <h2 className="font-heading font-medium text-primary">
            Order Summary
          </h2>
        </CardHeader>
        <CardBody className="gap-4">
          <div className="flex flex-col gap-2 pt-4 border-t border-default-200">
            {cart.length === 0 && (
              <p className="text-default-500">No items selected.</p>
            )}
            {cart.map((item) => (
              <div
                className="flex flex-row justify-between items-center gap-6"
                key={item.id}
              >
                <div className="w-3/4 flex gap-2">
                  <p className="text-primary-500 w-7 flex-shrink-0">
                    {item.cartedQuantity} &times;
                  </p>
                  <p className="truncate">{item.name}</p>
                </div>
                <p>${(item.price * (item.cartedQuantity || 1)).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between w-full gap-4 pt-4 border-t border-default-200">
            <span>Subtotal:</span>
            <span className="font-medium">
              ${(total.productTotal || 0).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between w-full gap-4">
            <span>Shipping:</span>
            <span className="font-medium">
              ${(total.shipping || 0).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between w-full gap-4">
            <span>Taxes:</span>
            <span className="font-medium">
              ${(total.taxes || 0).toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row justify-between w-full gap-4 text-xl border-t pt-4 border-default-200">
            <span>Total:</span>
            <span className="font-bold">
              ${(total.grandTotal || 0).toFixed(2)}
            </span>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 pb-4">
          <Button size="lg" className="w-full" color="primary" type="submit">
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CheckoutPage;
