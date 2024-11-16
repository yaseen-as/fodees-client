import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser=()=>{
  const {getAccessTokenSilently}=useAuth0()
  const getCurentUserRequest=async(): Promise<User>=>{
    const accessToken=await getAccessTokenSilently();
    const response=await fetch(`${API_BASE_URL}/api/my/user`,{
      method:"get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!response) {
        throw new Error("get requst not responding")
    }
    return response.json();
  }
  const { data: userData, isLoading, error } = useQuery<User, Error>({
    queryKey: ["getuserData"],
    queryFn: getCurentUserRequest, 
  });  if(error){
    toast.error(error.toString())
  }
  return {userData,isLoading}
}

type CreateUserRequst = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequst = async (user: CreateUserRequst) => {
    const accessToken = await getAccessTokenSilently();
    const respones = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!respones.ok) {
      throw new Error("failed to create new user");
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

type UpdateMyUserRequest = {
  name: string;
  adressLine: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  console.log("bla at hook");
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    console.log("bla at be4 fetch req");
    const accessToken = await getAccessTokenSilently();
 
 
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {

        method: "put",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("bla at after fetch req");
      if (!response.ok) {
        throw new Error("update user is not ok");
      }
  };
  const {
    mutateAsync: updateUser,
    isSuccess,
    isPending,
    error,
    reset,
  } = useMutation({ mutationFn: updateMyUserRequest });
  if (isSuccess){
    toast.success("user updated");
  }
  if(error){
    toast.error(error.toString())
    reset()
  }
  return { updateUser, isPending };
};
