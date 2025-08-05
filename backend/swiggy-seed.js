const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const Restaurant = require("./models/restaurantModel.js");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const importFromSwiggy = async () => {
  try {
    console.log("Starting Swiggy data import...");

    // Connect to database
    await connectDB();

    // Clear existing data
    await Restaurant.deleteMany();
    console.log("Cleared existing data");

    // Fetch restaurant data
    console.log("Fetching from Swiggy API...");
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6692&lng=77.4538&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response received, status:", data.statusCode);

    // Extract restaurants from multiple cards
    let restaurants = [];
    if (data?.data?.cards) {
      for (const card of data.data.cards) {
        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          console.log(
            `Found ${card.card.card.gridElements.infoWithStyle.restaurants.length} restaurants in this card`
          );
          restaurants.push(
            ...card.card.card.gridElements.infoWithStyle.restaurants
          );
        }
      }
    }

    console.log("Found restaurants:", restaurants.length);

    if (restaurants.length === 0) {
      throw new Error("No restaurants found in API response");
    }

    // Process only first 5 restaurants for testing
    const processedRestaurants = restaurants.slice(0, 5).map((restaurant) => {
      const resInfo = restaurant.info;
      return {
        name: resInfo.name || "Unknown Restaurant",
        cuisine: resInfo.cuisines || ["Unknown"],
        rating: resInfo.avgRating || 0,
        imageUrl: resInfo.cloudinaryImageId
          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resInfo.cloudinaryImageId}`
          : "https://via.placeholder.com/300x200?text=No+Image",
        menu: [
          {
            name: "Sample Dish 1",
            description:
              "Delicious sample dish from " + (resInfo.name || "restaurant"),
            price: 250,
            isVeg: true,
            imageUrl: "https://via.placeholder.com/150x150?text=Dish+1",
          },
          {
            name: "Sample Dish 2",
            description: "Another great dish",
            price: 300,
            isVeg: false,
            imageUrl: "https://via.placeholder.com/150x150?text=Dish+2",
          },
        ],
      };
    });

    console.log("Processed restaurants:", processedRestaurants.length);
    console.log(
      "Sample restaurant:",
      JSON.stringify(processedRestaurants[0], null, 2)
    );

    // Save to database
    await Restaurant.insertMany(processedRestaurants);
    console.log(
      "Successfully imported",
      processedRestaurants.length,
      "restaurants"
    );

    // Verify
    const count = await Restaurant.countDocuments();
    console.log("Total restaurants in database:", count);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

importFromSwiggy();
