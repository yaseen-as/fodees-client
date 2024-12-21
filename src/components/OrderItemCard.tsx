import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/Order-Status-Config";
import { useUpdateMyRestourentOrder } from "@/api/MyRestourentApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { isPending, updateRestourentStatus } = useUpdateMyRestourentOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status)
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestourentStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const OrderDateTime = new Date(order.createdAt);

    const minutes = OrderDateTime.getMinutes();
    const hours = OrderDateTime.getHours();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-4 gap-4 mb-3 justify-between">
            <div>
              Customer Name{" "}
              <span className="ml-2 font-normal">
                {order.deliveryDetails.name}
              </span>
            </div>
            <div>
              Delivery Address{" "}
              <span className="ml-2 font-normal">
                {order.deliveryDetails.addressLine} {order.deliveryDetails.city}
              </span>
            </div>
            <div>
              Time: <span className="ml-2 font-normal">{getTime()}</span>
            </div>
            <div>
              Total Coast{" "}
              <span className="ml-2 font-normal">
                {(order.totalAmount / 100).toFixed(2)}
              </span>
            </div>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {order.cartItems.map((item) => (
              <span>
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>
                {item.name}
              </span>
            ))}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">What is the status of this order</Label>
            <Select
              value={status}
              disabled={isPending}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItemCard;
