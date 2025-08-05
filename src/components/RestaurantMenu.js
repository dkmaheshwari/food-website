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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-8">
      {/* Restaurant Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center space-x-6">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-32 h-32 rounded-lg object-cover shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-lg mb-2">{restaurant.cuisine.join(", ")}</p>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="bg-green-600 text-white p-1 rounded-full text-sm"
                />
                <span className="font-semibold">{restaurant.rating}</span>
                <span>•</span>
                <span>30-35 mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 max-w-4xl mt-8">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        {restaurant.menu && restaurant.menu.length > 0 ? (
          <div className="space-y-4">
            {restaurant.menu.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className={`w-4 h-4 border-2 ${
                          item.isVeg
                            ? "border-green-500 bg-green-100"
                            : "border-red-500 bg-red-100"
                        } rounded flex items-center justify-center`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-lg font-bold text-orange-600">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="ml-4 flex flex-col items-end">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover mb-3"
                      />
                    )}
                    <button
                      onClick={() => handleAddItem(item)}
                      className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      <span>Add</span>
                      {getItemCount(item._id || index) > 0 && (
                        <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-bold">
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Menu coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
