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

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, cuisine, rating, imageUrl, menu } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    restaurant.name = name || restaurant.name;
    restaurant.cuisine = cuisine || restaurant.cuisine;
    restaurant.rating = rating || restaurant.rating;
    restaurant.imageUrl = imageUrl || restaurant.imageUrl;
    restaurant.menu = menu || restaurant.menu;

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
// @access  Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Add menu item to restaurant
// @route   POST /api/restaurants/:id/menu
// @access  Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, isVeg, imageUrl } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    const newMenuItem = {
      name,
      description,
      price,
      isVeg,
      imageUrl,
    };

    restaurant.menu.push(newMenuItem);
    const updatedRestaurant = await restaurant.save();
    res.status(201).json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Update menu item
// @route   PUT /api/restaurants/:id/menu/:menuId
// @access  Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, isVeg, imageUrl } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    const menuItem = restaurant.menu.id(req.params.menuId);

    if (menuItem) {
      menuItem.name = name || menuItem.name;
      menuItem.description = description || menuItem.description;
      menuItem.price = price || menuItem.price;
      menuItem.isVeg = isVeg !== undefined ? isVeg : menuItem.isVeg;
      menuItem.imageUrl = imageUrl || menuItem.imageUrl;

      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404);
      throw new Error("Menu item not found");
    }
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Delete menu item
// @route   DELETE /api/restaurants/:id/menu/:menuId
// @access  Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    restaurant.menu.pull({ _id: req.params.menuId });
    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});

// @desc    Bulk create restaurants
// @route   POST /api/restaurants/bulk
// @access  Admin
const bulkCreateRestaurants = asyncHandler(async (req, res) => {
  const restaurants = req.body.restaurants;

  if (!restaurants || !Array.isArray(restaurants)) {
    res.status(400);
    throw new Error("Please provide an array of restaurants");
  }

  const createdRestaurants = await Restaurant.insertMany(restaurants);
  res.status(201).json({
    message: `Successfully created ${createdRestaurants.length} restaurants`,
    restaurants: createdRestaurants,
  });
});

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  bulkCreateRestaurants,
};
