import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RestaurantCard = ({
  id,
  name,
  cloudinaryImageId, // This is now the full URL
  avgRating,
  cuisines,
  locationSearchVisibility,
}) => {
  return (
    <div
      key={id}
      className={`${
        locationSearchVisibility ? "-z-10" : ""
      } w-72 h-auto transition-all ease-in delay-100 hover:scale-95 hover:origin-center cursor-pointer`}
    >
      <Link to={"/restaurant/" + id} key={id}>
        <div className="relative w-full h-48 overflow-hidden rounded-2xl shadow-lg">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            src={cloudinaryImageId} // Use the full URL directly
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="px-4 pt-3">
          <h1 className="truncate text-xl font-bold text-gray-800" title={name}>
            {name}
          </h1>

          <div className="flex items-center font-semibold text-base gap-2 my-1">
            <FontAwesomeIcon
              icon={faStar}
              className="bg-green-600 text-xs text-white p-1 rounded-full"
            />
            <span className="text-gray-700">{avgRating}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">30-35 mins</span>
          </div>

          <div className="truncate mb-2">
            <p className="text-gray-600 text-sm">{cuisines.join(", ")}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
