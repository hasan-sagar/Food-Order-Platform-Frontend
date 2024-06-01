import CreateUserRequestType from "@/common/types/create-user-type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

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
