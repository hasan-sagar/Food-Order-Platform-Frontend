import CreateUserRequestType from "@/common/types/create-user-type";
import UpdateUserRequestType from "@/common/types/update-user-type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: CreateUserRequestType) => {
    const access_token = await getAccessTokenSilently();
    const response = await fetch(`${apiBaseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateUserRequestType) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${apiBaseUrl}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User Profile Updated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<UserType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${apiBaseUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};
