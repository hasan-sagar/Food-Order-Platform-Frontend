import {
  useCreateRestaurant,
  useGetRestaurant,
  useGetRestaurantOrders,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import ManageRestaurantForm from "@/components/forms/restaurant/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pizza } from "lucide-react";

export default function ManageRestaurantPage() {
  const { orders } = useGetRestaurantOrders();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;

  if (isGetLoading) {
    return (
      <div className="flex justify-center mx-auto">
        <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5  p-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
