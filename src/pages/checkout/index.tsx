import PageTitle from "@/components/page-title";
import { useUser } from "@/hooks/useUser";
import api from "@/services/api";
import { PaymentMethod } from "@/types";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  CreditCardIcon,
  InvoiceIcon,
  MapPinIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

type CheckoutFormValues = {
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, refetchCart, user } = useUser();
  const [method, setMethod] = useState<PaymentMethod>("credit_card");
  const [total, setTotal] = useState({
    productTotal: 0,
    taxes: 0,
    shipping: 10,
    grandTotal: 0,
  });

  useEffect(() => {
    const calculateTotal = () => {
      const productTotal = cart.reduce(
        (sum, item) => sum + item.product.price * (item.quantity || 1),
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
  }, [cart]);

  const { control, handleSubmit } = useForm<CheckoutFormValues>({
    defaultValues: {
      street: user?.address.street.split(",")[0] || "",
      number: user?.address.street.split(",")[1]?.trim() || "",
      city: user?.address.city || "",
      state: user?.address.state || "",
      zipCode: user?.address.zipCode || "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {
      console.log("Placing order with data:", data);
      const response = await api.post("/orders/place", { userId: user?.id, method });
      
      // Processar pagamento automaticamente
      if (response.data.paymentUrl) {
        console.log("Processing payment...");
        const paymentUrl = response.data.paymentUrl;
        // Extrair o paymentId da URL
        // Formato: http://localhost:3000/api/payments/callback/pay_123?method=credit_card
        const paymentIdMatch = paymentUrl.match(/callback\/(pay_\d+)/);
        if (paymentIdMatch && paymentIdMatch[1]) {
          const paymentId = paymentIdMatch[1];
          await api.post(`/payments/callback/${paymentId}`);
        }
      }
      
      return response.data;
    },
    onSuccess: (data: any) => {
      console.log("Order placed successfully:", data);
      refetchCart();
      // Mostrar informações do pedido
      alert(`Pedido criado com sucesso!\nID: ${data.order.id}\nStatus: Pago`);
      navigate("/profile");
    },
    onError: (error: any) => {
      console.error("Error placing order:", error);
      alert("Erro ao processar pedido. Tente novamente.");
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    placeOrder(data);
  };

  const renderPaymentMethodFields = () => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return (
          <>
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
          </>
        );
      case "pix":
        return (
          <p className="mx-auto mt-2 mb-8">
            Your PIX code will be generated after placing the order.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-8 p-8 bg-default-100 dark:bg-default-50/50 md:min-h-[calc(100vh-65px)]"
    >
      <div className="container basis-1/2">
        <div className="flex flex-row gap-2">
          <PageTitle title="Checkout" icon={InvoiceIcon} backLink="/cart" />
        </div>

        <div className="flex flex-col gap-10">
          {/* Shipping Information */}
          <Card>
            <CardHeader className="flex flex-row gap-2 p-4 items-center">
              <MapPinIcon
                size={20}
                className="text-primary-500"
                weight="bold"
              />
              <h2 className="font-heading font-medium text-primary">
                Shipping Information
              </h2>
            </CardHeader>
            <CardBody className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
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
                    className="col-span-3"
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="State"
                    placeholder="NY"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-1"
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
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="district"
                control={control}
                rules={{ required: "District is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="District"
                    placeholder="Downtown"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                rules={{ required: "Street is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Street"
                    placeholder="123 Main St"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    className="col-span-3"
                  />
                )}
              />
              <Controller
                name="number"
                control={control}
                rules={{ required: "Number is required" }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Number"
                    placeholder="123"
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
            <CardHeader className="flex flex-row gap-2 p-4 items-center justify-between">
              <div className="flex flex-row gap-2">
                <CreditCardIcon
                  size={20}
                  className="text-primary-500"
                  weight="bold"
                />
                <h2 className="font-heading font-medium text-primary">
                  Payment method
                </h2>
              </div>
              <ButtonGroup>
                <Button
                  variant={method === "credit_card" ? "solid" : "light"}
                  color="primary"
                  onPress={() => setMethod("credit_card")}
                >
                  Credit Card
                </Button>
                <Button
                  variant={method === "debit_card" ? "solid" : "light"}
                  color="primary"
                  onPress={() => setMethod("debit_card")}
                >
                  Debit Card
                </Button>
                <Button
                  variant={method === "pix" ? "solid" : "light"}
                  color="primary"
                  onPress={() => setMethod("pix")}
                >
                  PIX
                </Button>
              </ButtonGroup>
            </CardHeader>
            <CardBody className="gap-4">{renderPaymentMethodFields()}</CardBody>
          </Card>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="basis-1/2 h-fit mt-14">
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
                    {item.quantity} &times;
                  </p>
                  <p className="truncate">{item.product.name}</p>
                </div>
                <p>${(item.product.price * (item.quantity || 1)).toFixed(2)}</p>
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
          <Button
            size="lg"
            className="w-full"
            color="primary"
            type="submit"
            isLoading={isPending}
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CheckoutPage;
