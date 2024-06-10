import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDrowDown from "@/components/SortOptionDrowDown";
import { Pizza } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQueryKeywords: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export default function SearchPage() {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQueryKeywords: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { restaurantData, isLoading } = useSearchRestaurants(searchState, city);
  console.log(restaurantData);

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQueryKeywords: searchFormData.searchQueryKeywords,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQueryKeywords: "",
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto">
        <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (!restaurantData?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_2fr]">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpand={isExpanded}
          onExpandClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          onReset={resetSearch}
          onSubmit={setSearchQuery}
          placeHolder="Search by city"
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo
            total={restaurantData.pagination.total}
            city={city}
          />
          <SortOptionDrowDown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {restaurantData.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={restaurantData.pagination.page}
          pages={restaurantData.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
