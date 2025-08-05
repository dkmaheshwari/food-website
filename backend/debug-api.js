const fetch = require("node-fetch");

const debugAPI = async () => {
  try {
    console.log("Fetching and analyzing Swiggy API response...");

    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6692&lng=77.4538&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    const data = await response.json();
    console.log("Status Code:", data.statusCode);
    console.log("Data keys:", Object.keys(data.data || {}));

    if (data.data && data.data.cards) {
      console.log("Number of cards:", data.data.cards.length);

      data.data.cards.forEach((card, index) => {
        console.log(`Card ${index}:`, Object.keys(card.card?.card || {}));

        if (card.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          console.log(
            `Found restaurants in card ${index}:`,
            card.card.card.gridElements.infoWithStyle.restaurants.length
          );
        }

        // Check other possible locations
        if (card.card?.card?.restaurants) {
          console.log(
            `Found restaurants directly in card ${index}:`,
            card.card.card.restaurants.length
          );
        }
      });
    }

    // Also save the structure to a file for analysis
    require("fs").writeFileSync(
      "api-response.json",
      JSON.stringify(data, null, 2)
    );
    console.log("Full response saved to api-response.json");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

debugAPI();
