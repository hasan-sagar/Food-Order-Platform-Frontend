import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/components/forms/restaurant/ManageRestaurantForm";
import { Pizza } from "lucide-react";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetRestaurant();

  if (isGetLoading) {
    return (
      <div className="flex justify-center mx-auto">
        <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isLoading}
      restaurant={restaurant}
    />
  );
}
