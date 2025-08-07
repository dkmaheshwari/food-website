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
      <div className="body xl:max-w-[90%] mx-auto min-h-screen pt-32 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="mx-6 lg:mx-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-bold text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Discover Culinary Excellence
            </h1>
            <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the finest dining from premium restaurants in{" "}
              <span className="font-semibold text-emerald-600">{city}</span>
            </p>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-3xl">
                <input
                  type="text"
                  className="w-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm p-5 pl-14 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Search premium restaurants, cuisines, or dishes..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              <button
                onClick={() => handleFilter("")}
                className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg ${
                  filterType === ""
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25"
                    : "border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                All Restaurants
              </button>
              <button
                onClick={() => handleFilter("rating")}
                className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg ${
                  filterType === "rating"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25"
                    : "border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                ⭐ Top Rated
              </button>
              <button
                onClick={() => handleFilter("name")}
                className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg ${
                  filterType === "name"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25"
                    : "border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                🔤 A-Z
              </button>
              {(searchText || filterType) && (
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 text-white hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg font-semibold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Restaurant Grid Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl mb-4 text-slate-800">
                Featured Restaurants
              </h2>
              <p className="text-slate-600 text-lg">
                <span className="font-semibold text-emerald-600">
                  {filteredResList.length}
                </span>{" "}
                premium dining options available
              </p>
            </div>

            <div className="grid gap-8 mx-auto xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center">
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
