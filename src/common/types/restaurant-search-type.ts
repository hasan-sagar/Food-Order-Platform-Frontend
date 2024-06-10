import { RestaurantType } from "./restaurant-type";

export type RestaurantSearchType = {
  data: RestaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
