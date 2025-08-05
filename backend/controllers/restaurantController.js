const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel.js");

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});

// @desc    Fetch single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Public (for now)
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, cuisine, rating, imageUrl, menu } = req.body;
  const restaurant = new Restaurant({ name, cuisine, rating, imageUrl, menu });
  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

module.exports = { getRestaurants, getRestaurantById, createRestaurant };
