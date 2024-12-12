import { SearchState } from "@/Pages/SearchPage";
import { RestourentSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { URLSearchParams } from "url";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchrestourent = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestourentSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restourent/search/${city}?${params.toString()}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("failed the fetch search request");
    }
    return response.json();
  };

  const { data: result, isLoading } = useQuery({
    queryKey: ["searchRequestResult", searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });
  return {
    result,
    isLoading,
  };
};
