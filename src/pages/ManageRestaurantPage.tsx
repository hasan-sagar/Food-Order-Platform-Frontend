import { useCreateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/components/forms/restaurant/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateRestaurant();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  );
}
