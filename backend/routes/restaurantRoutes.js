const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  bulkCreateRestaurants,
} = require("../controllers/restaurantController.js");

// Restaurant CRUD routes
router.route("/").get(getRestaurants).post(createRestaurant);
router.route("/bulk").post(bulkCreateRestaurants);
router
  .route("/:id")
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

// Menu item routes
router.route("/:id/menu").post(addMenuItem);
router.route("/:id/menu/:menuId").put(updateMenuItem).delete(deleteMenuItem);

module.exports = router;
