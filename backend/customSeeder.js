const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurant = require("./models/restaurantModel.js");

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env file");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const customRestaurants = [
  {
    name: "Pizza Palace",
    cuisine: ["Italian", "Pizzas"],
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Classic delight with 100% real mozzarella cheese",
        price: 250,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1598021680925-92e8d8e5b9cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hcmdoZXJpdGElMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Pepperoni Pizza",
        description:
          "A classic American taste! Relish the delectable flavor of pepperoni, cheese and capsicum",
        price: 320,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
      },
    ],
  },
  {
    name: "Burger Barn",
    cuisine: ["American", "Burgers"],
    rating: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    menu: [
      {
        name: "Classic Veg Burger",
        description:
          "A timeless classic with a juicy veg patty, fresh lettuce, and our secret sauce.",
        price: 150,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Spicy Chicken Burger",
        description:
          "Crispy chicken patty with a spicy kick, topped with jalapenos and cheese.",
        price: 180,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww",
      },
    ],
  },
  {
    name: "Taco Town",
    cuisine: ["Mexican", "Tacos"],
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-15d11e38cb68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3N8ZW58MHx8MHx8fDA%3D",
    menu: [
      {
        name: "Bean Burrito",
        description: "A hearty burrito packed with beans, rice, and cheese.",
        price: 160,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1626700051145-b0b523145935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVycnl0b3xlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Chicken Quesadilla",
        description: "Grilled tortilla filled with chicken and melted cheese.",
        price: 220,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVlc2FkaWxsYXxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
];

const importCustomData = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    console.log("Cleared existing restaurant data.");

    await Restaurant.insertMany(customRestaurants);
    console.log("Custom restaurant data imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing custom data:", error.message);
    process.exit(1);
  }
};

importCustomData();
