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

const simpleSeed = async () => {
  try {
    console.log("Starting simple seed...");

    // Connect to database
    await connectDB();

    // Clear existing data
    await Restaurant.deleteMany();
    console.log("Cleared existing data");

    // Create a simple test restaurant
    const testRestaurant = {
      name: "Test Restaurant",
      cuisine: ["Indian", "North Indian"],
      rating: 4.2,
      imageUrl: "https://example.com/image.jpg",
      menu: [
        {
          name: "Butter Chicken",
          description: "Creamy tomato curry with tender chicken",
          price: 280,
          isVeg: false,
          imageUrl: "https://example.com/butter-chicken.jpg",
        },
        {
          name: "Dal Makhani",
          description: "Rich and creamy black lentils",
          price: 220,
          isVeg: true,
          imageUrl: "https://example.com/dal-makhani.jpg",
        },
      ],
    };

    await Restaurant.create(testRestaurant);
    console.log("Test restaurant created successfully");

    // Verify the data
    const restaurants = await Restaurant.find();
    console.log("Total restaurants in DB:", restaurants.length);
    console.log("Sample restaurant:", JSON.stringify(restaurants[0], null, 2));

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

simpleSeed();
