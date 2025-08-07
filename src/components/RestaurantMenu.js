import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../Utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);

  const fetchRestaurantData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurants/${id}`
      );
      const data = await response.json();
      setRestaurant(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  const handleAddItem = (item) => {
    const cartItem = {
      id: item._id || Math.random().toString(),
      name: item.name,
      price: item.price,
      description: item.description,
      isVeg: item.isVeg,
      imageUrl: item.imageUrl,
      restaurantName: restaurant.name,
      restaurantId: restaurant._id,
    };
    dispatch(addItems(cartItem));
  };

  const getItemCount = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">
            Loading restaurant details...
          </p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-xl text-slate-600 font-medium">
            Restaurant not found
          </p>
          <p className="text-slate-500 mt-2">
            The restaurant you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Restaurant Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-cyan-600/20 to-blue-600/20"></div>
        <div className="relative pt-32 pb-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-48 h-48 rounded-3xl object-cover shadow-2xl border-4 border-white/20"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  {restaurant.rating}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {restaurant.cuisine.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 text-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Available Now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚚</span>
                    <span className="font-medium">30-35 mins delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💳</span>
                    <span className="font-medium">
                      All payment methods accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">Our Menu</h2>
          <p className="text-slate-600 text-lg">
            Discover our carefully curated selection of dishes
          </p>
        </div>

        {restaurant.menu && restaurant.menu.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {restaurant.menu.map((item, index) => (
              <div
                key={item._id || index}
                className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start h-full">
                  <div className="flex-1 pr-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`w-5 h-5 border-2 ${
                          item.isVeg
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-red-500 bg-red-50"
                        } rounded-lg flex items-center justify-center shadow-sm`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.isVeg ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isVeg
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isVeg ? "VEGETARIAN" : "NON-VEG"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center space-x-4">
                      <p className="text-3xl font-bold text-emerald-600">
                        ₹{item.price}
                      </p>
                      <span className="text-slate-400 text-sm">
                        per serving
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-4 flex-shrink-0">
                    {item.imageUrl && (
                      <div className="relative">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-32 h-32 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                      </div>
                    )}

                    <button
                      onClick={() => handleAddItem(item)}
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      <span>Add to Cart</span>
                      {getItemCount(item._id || index) > 0 && (
                        <span className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                          {getItemCount(item._id || index)}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Menu Coming Soon
            </h3>
            <p className="text-slate-600 text-lg">
              We're preparing something special for you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
