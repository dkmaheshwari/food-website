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
      } w-80 h-auto bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer border border-slate-100 overflow-hidden group`}
    >
      <Link to={"/restaurant/" + id} key={id}>
        <div className="relative w-full h-56 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={cloudinaryImageId} // Use the full URL directly
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faStar}
                className="text-emerald-500 text-sm"
              />
              <span className="text-slate-800 font-bold text-sm">
                {avgRating}
              </span>
            </div>
          </div>

          {/* Delivery Badge */}
          <div className="absolute bottom-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            30-35 mins
          </div>
        </div>

        <div className="p-6">
          <h1
            className="text-xl font-bold text-slate-800 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300"
            title={name}
          >
            {name}
          </h1>

          <div className="mb-4">
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {cuisines.join(" • ")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-slate-500 text-sm font-medium">
                Available Now
              </span>
            </div>
            <div className="text-emerald-600 font-semibold text-sm group-hover:text-emerald-700 transition-colors">
              Order Now →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
