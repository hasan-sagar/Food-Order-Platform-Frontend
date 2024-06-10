import { RestaurantSearchType } from "@/common/types/restaurant-search-type";
import { RestaurantType } from "@/common/types/restaurant-type";
import { SearchState } from "@/pages/SearchPage";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
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
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<RestaurantType> => {
    const access_token = await getAccessTokenSilently();

    const response = await fetch(`${apiBaseUrl}/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Restaurant fetching error");
    }

    const data = await response.json();
    return data.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<RestaurantType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${apiBaseUrl}/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    const data = await response.json();
    return data.data;
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchType> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.toString());
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${apiBaseUrl}/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }

    return await response.json();
  };

  const { data: restaurantData, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { restaurantData, isLoading };
};

export const useGetSingleRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<RestaurantType> => {
    const response = await fetch(`${apiBaseUrl}/restaurant/${restaurantId}`);

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    const data = await response.json();
    return data.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchSignleRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};
