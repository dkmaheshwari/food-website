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

const importData = async () => {
  try {
    await connectDB();

    await Restaurant.deleteMany();
    console.log("Cleared existing restaurant data.");

    const listResponse = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6692&lng=77.4538&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );
    const listJson = await listResponse.json();

    let restaurantCards = [];
    const cards = listJson?.data?.cards || [];

    for (const card of cards) {
      const restaurants =
        card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      if (restaurants) {
        restaurantCards = restaurantCards.concat(restaurants);
      }
    }

    if (restaurantCards.length === 0) {
      console.error("Could not find restaurant list in API response. Exiting.");
      process.exit(1);
    }

    const restaurantsData = [];
    const limitedRestaurantCards = restaurantCards.slice(0, 10);

    for (const resData of limitedRestaurantCards) {
      const restaurantInfo = resData.info;

      let menuItems = [];
      try {
        const menuResponse = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6692&lng=77.4538&restaurantId=${restaurantInfo.id}`
        );

        const menuText = await menuResponse.text();
        let menuJson;
        try {
          menuJson = JSON.parse(menuText);
        } catch (e) {
          menuJson = null;
        }

        if (menuJson) {
          const menuCardGroups =
            menuJson?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
          if (menuCardGroups) {
            for (const group of menuCardGroups) {
              const itemCards = group?.card?.card?.itemCards;
              if (itemCards) {
                for (const item of itemCards) {
                  const itemInfo = item.card.info;
                  if (itemInfo) {
                    menuItems.push({
                      name: itemInfo.name,
                      description: itemInfo.description,
                      price: (itemInfo.price || itemInfo.defaultPrice) / 100,
                      isVeg: itemInfo.isVeg === 1,
                      imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`,
                    });
                  }
                }
              }
            }
          }
        }
      } catch (fetchError) {
        console.error(
          `An error occurred while fetching menu for ${restaurantInfo.name}:`,
          fetchError.message
        );
      }

      if (menuItems.length === 0) {
        menuItems.push(
          {
            name: "Margherita Pizza",
            description: "Classic delight with 100% real mozzarella cheese",
            price: 239,
            isVeg: true,
            imageUrl:
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/vj3ctw6k2urnr2c7gmdn",
          },
          {
            name: "Farmhouse Pizza",
            description:
              "Delightful combination of onion, capsicum, tomato & grilled mushroom",
            price: 459,
            isVeg: true,
            imageUrl:
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/vj3ctw6k2urnr2c7gmdn",
          }
        );
      }

      restaurantsData.push({
        name: restaurantInfo.name,
        cuisine: restaurantInfo.cuisines,
        rating: restaurantInfo.avgRating,
        imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantInfo.cloudinaryImageId}`,
        menu: menuItems,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (restaurantsData.length > 0) {
      await Restaurant.insertMany(restaurantsData);
      console.log(
        `Data Imported! ${restaurantsData.length} restaurants added.`
      );
    } else {
      console.log("No restaurants were processed to be imported.");
    }

    process.exit(0);
  } catch (error) {
    console.error("An error occurred in importData:", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
