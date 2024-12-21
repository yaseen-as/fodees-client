import { Order, Restourent } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestourent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestourentRequest = async (): Promise<Restourent> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restourent`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("failed get restourent Request");
    }
    return response.json();
  };
  const { data: restourent, isLoading } = useQuery({
    queryKey: ["feachMyRestourent"],
    queryFn: getMyRestourentRequest,
  });
  return { restourent, isLoading };
};
export const useCreateMyRestourent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const CreateMyRestourentRequest = async (
    restourentFormData: FormData
  ): Promise<Restourent> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restourent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restourentFormData,
    });
    if (!response.ok) {
      throw new Error("failed create restourent Request");
    }
    return response.json();
  };
  const {
    mutate: createRestourent,
    isPending,
    isSuccess,
    error,
  } = useMutation({ mutationFn: CreateMyRestourentRequest });
  if (isSuccess) {
    toast.success("restourent created");
  }
  if (error) {
    toast.error("failed ");
  }
  return { createRestourent, isPending };
};

export const useUpdateMyRestourent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestourentRequest = async (
    restourentFormData: FormData
  ): Promise<Restourent> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restourent`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: restourentFormData,
    });
    if (!response) {
      throw new Error("failed create restourent Request");
    }
    return response.json();
  };
  const {
    mutate: updateRestourent,
    isPending,
    isSuccess,
    error,
  } = useMutation({ mutationFn: updateMyRestourentRequest });
  if (isSuccess) {
    toast.success("restourent updated");
  }
  if (error) {
    toast.error("failed update ");
  }
  return { updateRestourent, isPending };
};



export const useGetMyRestourentOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestourentOrdersRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("failed get restourent order Request");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetchMyRestourentOrders"],
    queryFn: getMyRestourentOrdersRequest,
  });
  return { orders, isLoading };
};


type UpdateOrderStatusRequest={
  orderId:string;
  status:string;
}

export const useUpdateMyRestourentOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestourentRequest = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ): Promise<Restourent> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restourent/order/:${updateStatusOrderRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status:updateStatusOrderRequest.orderId}),
    });
    if (!response) {
      throw new Error("failed update status");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRestourentStatus,
    isPending,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: updateMyRestourentRequest });
  if (isSuccess) {
    toast.success("order updated");
  }
  if (isError) {
    toast.error(" unable to update order ");
  }
  return { updateRestourentStatus, isPending };
};
