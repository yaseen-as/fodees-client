import { useSearchrestourent } from "@/api/RestourentApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdoune from "@/components/SortOptionDropdoune";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { result, isLoading } = useSearchrestourent(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((previousState) => ({
      ...previousState,
      sortOption,
      page: 1,
    }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((previousState) => ({
      ...previousState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((previousState) => ({
      ...previousState,
      page,
    }));
  };

  const setSearchQuery = (searchformData: SearchForm) => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchformData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      page: 1,
    }));
  };
  if (isLoading) {
    <span>Loading Serch page....</span>;
  }
  if (!result?.data || !city) {
    return <span>No Result found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        {" "}
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or Restourent name"
          onReset={resetSearch}
        />
        <div className="flex flex-col justify-between gap-3 lg:flex-row ">
          <SearchResultInfo city={city} total={result.pagination.total} />
          <SortOptionDropdoune
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {result.data.map((restourent) => (
          <SearchResultCard restourent={restourent} />
        ))}
        <PaginationSelector
          page={result.pagination.page}
          pages={result.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
