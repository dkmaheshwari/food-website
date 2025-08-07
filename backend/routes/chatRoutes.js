const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Add context to make the chatbot more restaurant-focused
    const prompt = `You are a helpful restaurant recommendation chatbot for Foodie, a food delivery platform. Your job is to help users find great restaurants and food options. Here's the user's message: "${message}"
    
    Please provide a helpful, friendly response about restaurants, food, or dining recommendations. Keep responses concise and focused on food-related topics.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error communicating with Google Generative AI:", error);
    console.error("Error details:", error.message);
    res.status(500).json({
      error: "Failed to get response from AI",
      details: error.message,
    });
  }
});

module.exports = router;
