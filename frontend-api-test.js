// Simple test to check if frontend can reach backend
// Open browser console and run this code to test API connection

console.log("🧪 Testing API connection...");

fetch("http://localhost:5000/api/restaurants")
  .then((response) => {
    console.log("✅ Response status:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("✅ Data received:", data.length, "restaurants");
    console.log(
      "📊 Restaurant names:",
      data.map((r) => r.name)
    );
    console.log("🍽️ First restaurant:", data[0]);
  })
  .catch((error) => {
    console.error("❌ Error fetching data:", error);
  });

// Also test if the hook is working properly
console.log("🔍 Checking if useRestaurantData hook is working...");
console.log("Current URL:", window.location.href);
console.log("Backend should be at: http://localhost:5000/api/restaurants");
