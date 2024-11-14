import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequst = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const {getAccessTokenSilently}=useAuth0();

  const createMyUserRequst = async (user: CreateUserRequst) => {
    const accessToken=await getAccessTokenSilently()
    const respones = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization:`Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!respones.ok) {
      throw new Error("failed toe create new user");
    }
  };
  const {
    mutateAsync: createUser,
    isError,
    isSuccess,
    isPending,
  } = useMutation({ mutationFn: createMyUserRequst });
  return {
    createUser,
    isError,
    isSuccess,
    isPending,
  };
};
