const mongoose = require("mongoose");
const dotenv = require("dotenv");
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

// Enhanced restaurant data with more variety
const restaurantsData = [
  {
    name: "Golden Spoon Fine Dining",
    cuisine: ["Continental", "French", "European"],
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Beef Wellington",
        description:
          "Premium beef tenderloin wrapped in puff pastry with mushroom duxelles",
        price: 45.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Lobster Thermidor",
        description: "Fresh lobster in creamy sauce with cheese and herbs",
        price: 38.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Truffle Risotto",
        description: "Creamy arborio rice with black truffle and parmesan",
        price: 28.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Street Food Junction",
    cuisine: ["Street Food", "Indian", "Snacks"],
    rating: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Pani Puri",
        description:
          "Crispy shells filled with spiced water and chutneys (6 pieces)",
        price: 4.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Vada Pav",
        description: "Mumbai's famous potato fritter burger",
        price: 3.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Chicken Tikka Roll",
        description:
          "Grilled chicken wrapped in paratha with onions and mint chutney",
        price: 8.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Ocean's Bounty",
    cuisine: ["Seafood", "Mediterranean", "Grill"],
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Grilled Salmon",
        description:
          "Atlantic salmon with lemon herb butter and seasonal vegetables",
        price: 24.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Seafood Paella",
        description: "Traditional Spanish rice dish with mixed seafood",
        price: 28.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Fish & Chips",
        description: "Beer-battered cod with crispy fries and mushy peas",
        price: 16.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Vegan Garden",
    cuisine: ["Vegan", "Healthy", "Organic"],
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Buddha Bowl",
        description: "Quinoa, roasted vegetables, avocado, and tahini dressing",
        price: 13.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Jackfruit Tacos",
        description: "Seasoned jackfruit with cashew crema in corn tortillas",
        price: 11.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1565299585323-38174c4a6b52?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Raw Chocolate Cake",
        description: "No-bake chocolate cake with coconut and dates",
        price: 8.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "BBQ Smokehouse",
    cuisine: ["BBQ", "American", "Grill"],
    rating: 4.3,
    imageUrl:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Smoked Brisket",
        description: "12-hour slow-smoked beef brisket with BBQ sauce",
        price: 19.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Pulled Pork Sandwich",
        description: "Slow-cooked pork shoulder with coleslaw on brioche bun",
        price: 14.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Grilled Corn",
        description: "Chargrilled corn with herb butter and parmesan",
        price: 6.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Optional: Clear existing data
    // await Restaurant.deleteMany();
    // console.log("Cleared existing restaurant data.");

    // Add new restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurantsData);
    console.log(
      `Successfully added ${createdRestaurants.length} new restaurants!`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    console.log("Database cleared successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing database:", error.message);
    process.exit(1);
  }
};

// Command line usage:
// node add-more-data.js - to add more data
// node add-more-data.js -clear - to clear all data
if (process.argv[2] === "-clear") {
  clearDatabase();
} else {
  seedDatabase();
}
