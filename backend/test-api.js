const fetch = require("node-fetch");

console.log("Testing Swiggy API fetch...");

const testFetch = async () => {
  try {
    console.log("Making API request...");
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6692&lng=77.4538&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers.raw());

    const text = await response.text();
    console.log("Response length:", text.length);
    console.log("First 200 characters:", text.substring(0, 200));
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
  }
};

testFetch();
