const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
} = require("../controllers/restaurantController.js");

router.route("/").get(getRestaurants).post(createRestaurant);
router.route("/:id").get(getRestaurantById);

module.exports = router;
