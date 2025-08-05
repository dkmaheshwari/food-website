import React, { useState } from "react";
import useRestaurantData from "../Hooks/useRestaurantData";
import RestaurantCard from "./RestaurantCard";
import HomeShimmer from "./HomeShimmer";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [resList, filteredResList, setFilteredResList] = useRestaurantData();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const locDetails = useSelector((store) => store.location.locationDetails);
  const locationSearchVisibility = useSelector(
    (store) => store.locSearch.visible
  );
  const city = locDetails[0]?.district || "your city";

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredResList(resList);
      return;
    }

    const filtered = resList.filter((res) => {
      const searchLower = searchText.toLowerCase();
      return (
        res.name.toLowerCase().includes(searchLower) ||
        res.cuisine.some((cuisine) =>
          cuisine.toLowerCase().includes(searchLower)
        )
      );
    });
    setFilteredResList(filtered);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    let filtered = resList;

    // Apply search filter first if there's search text
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = resList.filter((res) => {
        return (
          res.name.toLowerCase().includes(searchLower) ||
          res.cuisine.some((cuisine) =>
            cuisine.toLowerCase().includes(searchLower)
          )
        );
      });
    }

    if (type === "rating") {
      const sorted = [...filtered].sort((a, b) => b.rating - a.rating);
      setFilteredResList(sorted);
    } else if (type === "name") {
      const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      setFilteredResList(sorted);
    } else {
      setFilteredResList(filtered);
    }
  };

  const handleReset = () => {
    setSearchText("");
    setFilterType("");
    setFilteredResList(resList);
  };

  return resList?.length === 0 ? (
    <HomeShimmer />
  ) : (
    <>
      <div className="body xl:max-w-[80%] mx-auto min-h-screen pt-40">
        <div className="mx-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Discover Delicious Food
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Order from the best restaurants in {city}
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-4 pl-12 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Search for restaurants, cuisines..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => handleFilter("")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === ""
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                All
              </button>
              <button
                onClick={() => handleFilter("rating")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === "rating"
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Top Rated
              </button>
              <button
                onClick={() => handleFilter("name")}
                className={`px-6 py-2 rounded-full transition-all ${
                  filterType === "name"
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                A-Z
              </button>
              {(searchText || filterType) && (
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="mb-12">
            <h2 className="font-bold text-2xl mb-6 text-center">
              {filteredResList.length} restaurants found
            </h2>
            <div className="grid place-items-center gap-8 mx-auto px-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {filteredResList.map((res) => (
                <RestaurantCard
                  name={res.name}
                  cloudinaryImageId={res.imageUrl}
                  avgRating={res.rating}
                  cuisines={res.cuisine}
                  locationSearchVisibility={locationSearchVisibility}
                  key={res._id}
                  id={res._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer footerCities={[]} />
    </>
  );
};

export default Home;
