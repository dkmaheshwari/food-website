// API Testing Script - Test all restaurant endpoints
// Run with: node test-restaurant-api.js

const BASE_URL = "http://localhost:5000/api/restaurants";

// Sample restaurant data for testing
const sampleRestaurant = {
  name: "Test Restaurant",
  cuisine: ["Italian", "Mediterranean"],
  rating: 4.5,
  imageUrl:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
  menu: [
    {
      name: "Test Pizza",
      description: "A delicious test pizza",
      price: 15.99,
      isVeg: true,
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=60",
    },
  ],
};

const sampleMenuItem = {
  name: "New Test Item",
  description: "A new test menu item",
  price: 12.99,
  isVeg: false,
  imageUrl:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&auto=format&fit=crop&q=60",
};

async function testAPI() {
  try {
    console.log("🧪 Testing Restaurant API Endpoints...\n");

    // Test 1: Get all restaurants
    console.log("1️⃣ Testing GET /api/restaurants");
    const getAllResponse = await fetch(BASE_URL);
    const allRestaurants = await getAllResponse.json();
    console.log(`✅ Found ${allRestaurants.length} restaurants\n`);

    // Test 2: Create a new restaurant
    console.log("2️⃣ Testing POST /api/restaurants");
    const createResponse = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleRestaurant),
    });
    const newRestaurant = await createResponse.json();
    console.log(
      `✅ Created restaurant: ${newRestaurant.name} (ID: ${newRestaurant._id})\n`
    );

    // Test 3: Get restaurant by ID
    console.log("3️⃣ Testing GET /api/restaurants/:id");
    const getByIdResponse = await fetch(`${BASE_URL}/${newRestaurant._id}`);
    const restaurantById = await getByIdResponse.json();
    console.log(`✅ Retrieved restaurant: ${restaurantById.name}\n`);

    // Test 4: Update restaurant
    console.log("4️⃣ Testing PUT /api/restaurants/:id");
    const updateData = {
      ...sampleRestaurant,
      name: "Updated Test Restaurant",
      rating: 4.8,
    };
    const updateResponse = await fetch(`${BASE_URL}/${newRestaurant._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const updatedRestaurant = await updateResponse.json();
    console.log(
      `✅ Updated restaurant: ${updatedRestaurant.name} (Rating: ${updatedRestaurant.rating})\n`
    );

    // Test 5: Add menu item
    console.log("5️⃣ Testing POST /api/restaurants/:id/menu");
    const addMenuResponse = await fetch(
      `${BASE_URL}/${newRestaurant._id}/menu`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleMenuItem),
      }
    );
    const restaurantWithNewMenu = await addMenuResponse.json();
    console.log(
      `✅ Added menu item: ${sampleMenuItem.name} (Total menu items: ${restaurantWithNewMenu.menu.length})\n`
    );

    // Test 6: Update menu item
    const menuItemId =
      restaurantWithNewMenu.menu[restaurantWithNewMenu.menu.length - 1]._id;
    console.log("6️⃣ Testing PUT /api/restaurants/:id/menu/:menuId");
    const updateMenuData = {
      ...sampleMenuItem,
      name: "Updated Test Item",
      price: 14.99,
    };
    const updateMenuResponse = await fetch(
      `${BASE_URL}/${newRestaurant._id}/menu/${menuItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateMenuData),
      }
    );
    const restaurantWithUpdatedMenu = await updateMenuResponse.json();
    console.log(
      `✅ Updated menu item: ${updateMenuData.name} (Price: $${updateMenuData.price})\n`
    );

    // Test 7: Bulk create restaurants
    console.log("7️⃣ Testing POST /api/restaurants/bulk");
    const bulkData = {
      restaurants: [
        {
          name: "Bulk Restaurant 1",
          cuisine: ["Fast Food"],
          rating: 4.0,
          imageUrl:
            "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&auto=format&fit=crop&q=60",
          menu: [
            {
              name: "Bulk Item 1",
              description: "A bulk test item",
              price: 9.99,
              isVeg: true,
            },
          ],
        },
        {
          name: "Bulk Restaurant 2",
          cuisine: ["Desserts"],
          rating: 4.2,
          imageUrl:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60",
          menu: [
            {
              name: "Bulk Dessert",
              description: "A sweet bulk test item",
              price: 7.99,
              isVeg: true,
            },
          ],
        },
      ],
    };

    const bulkResponse = await fetch(`${BASE_URL}/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bulkData),
    });
    const bulkResult = await bulkResponse.json();
    console.log(`✅ ${bulkResult.message}\n`);

    // Test 8: Delete menu item
    console.log("8️⃣ Testing DELETE /api/restaurants/:id/menu/:menuId");
    const deleteMenuResponse = await fetch(
      `${BASE_URL}/${newRestaurant._id}/menu/${menuItemId}`,
      {
        method: "DELETE",
      }
    );
    const restaurantAfterMenuDelete = await deleteMenuResponse.json();
    console.log(
      `✅ Deleted menu item (Remaining menu items: ${restaurantAfterMenuDelete.menu.length})\n`
    );

    // Test 9: Delete restaurant
    console.log("9️⃣ Testing DELETE /api/restaurants/:id");
    const deleteResponse = await fetch(`${BASE_URL}/${newRestaurant._id}`, {
      method: "DELETE",
    });
    const deleteResult = await deleteResponse.json();
    console.log(`✅ ${deleteResult.message}\n`);

    console.log("🎉 All API tests completed successfully!");
  } catch (error) {
    console.error("❌ API Test Error:", error.message);
  }
}

// Run the tests
testAPI();
