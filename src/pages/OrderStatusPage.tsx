import { useGetOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Pizza } from "lucide-react";

export default function OrderStatusPage() {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) {
    <div className="flex justify-center mx-auto">
      <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
    </div>;
  }

  if (!orders || orders.lenth === 0) {
    return "No Order Found!";
  }
  return (
    <div className="space-y-10">
      {orders.map((order: any) => (
        <div className="space-y-10 bg-slate-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
