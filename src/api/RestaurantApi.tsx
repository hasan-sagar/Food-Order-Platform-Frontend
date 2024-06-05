import { RestaurantType } from "@/common/types/restaurant-type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<RestaurantType> => {
    const access_token = await getAccessTokenSilently();

    const response = await fetch(`${apiBaseUrl}/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("failed to create restaurant");
    }

    const data = await response.json();
    return data.data;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};
