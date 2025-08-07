import React, { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "🍽️ Welcome to Foodie! I can help you discover restaurants and their menu items. Try asking:\n\n• 'Show me Italian restaurants'\n• 'What food items does Pizza Palace have?'\n• 'List vegetarian options'\n• 'What's available in Chinese cuisine?'",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const chatBodyRef = useRef(null);

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCFBoOCSEQdQGjrhSTS8sU4oYeQLtQAnvA"
  );

  // Fetch restaurants data when component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat body when messages change
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create restaurant data context for the AI with detailed menu information
      const restaurantContext =
        restaurants.length > 0
          ? `Available restaurants in our system:\n${restaurants
              .map((r) => {
                let restaurantInfo = `\n🍽️ **${r.name}**\n- Cuisine: ${r.cuisine.join(", ")}\n- Rating: ${r.rating}/5 ⭐`;
                
                if (r.menu && r.menu.length > 0) {
                  restaurantInfo += `\n- Popular Menu Items:`;
                  r.menu.slice(0, 5).forEach(item => {
                    const vegIcon = item.isVeg ? "🌱" : "🍖";
                    restaurantInfo += `\n  • ${item.name} ${vegIcon} - ₹${item.price} ${item.description ? `(${item.description})` : ''}`;
                  });
                  if (r.menu.length > 5) {
                    restaurantInfo += `\n  • ...and ${r.menu.length - 5} more items`;
                  }
                }
                return restaurantInfo;
              })
              .join("\n")}\n\n`
          : "Currently no restaurant data is available.\n\n";

      // Enhanced prompt with actual restaurant data
      const prompt = `You are a helpful restaurant recommendation chatbot for Foodie, a food delivery platform serving Ghaziabad and surrounding areas. You have access to our current restaurant database with detailed menu information.

${restaurantContext}

User's message: "${currentInput}"

IMPORTANT FORMATTING INSTRUCTIONS:
1. When listing restaurants or food items, ALWAYS use bullet points (•) or numbered lists
2. When showing menu items, include:
   - Item name with veg/non-veg emoji (🌱 for veg, 🍖 for non-veg)
   - Price in rupees (₹)
   - Brief description if available
3. Use emojis to make responses more engaging (🍽️, ⭐, 🌱, 🍖, 🍕, 🍔, etc.)
4. Format example:
   **Restaurant Name** ⭐ 4.5/5
   Popular items:
   • Margherita Pizza 🌱 - ₹299 (Classic cheese and tomato)
   • Chicken Biryani 🍖 - ₹399 (Aromatic basmati rice with spices)

RESPONSE GUIDELINES:
1. If user asks for restaurant recommendations, use ONLY restaurants from our database
2. When recommending restaurants, mention specific names, cuisines, and ratings
3. When asked about specific cuisines, filter and show relevant restaurants with their menu items
4. When asked about food items or menu, list items in bullet points with emojis and prices
5. If asking about Ghaziabad specifically, mention these are restaurants we serve in the area
6. If no restaurants match criteria, suggest alternatives from available options
7. Keep responses helpful, friendly, and food-focused
8. If asked about unrelated topics, politely redirect to food/restaurant topics
9. Always format lists and menu items clearly with bullet points

Please provide a well-formatted, helpful response with proper bullet points and emojis:`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const botMessage = { text: text, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      let errorText =
        "Sorry, I'm having trouble connecting. Please try again later.";

      if (error.message.includes("API key")) {
        errorText =
          "There's an issue with the API configuration. Please check the setup.";
      } else if (
        error.message.includes("quota") ||
        error.message.includes("limit")
      ) {
        errorText =
          "The AI service is temporarily unavailable due to quota limits. Please try again later.";
      }

      const errorMessage = {
        text: errorText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-8 right-8 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 z-50"
          aria-label="Open chatbot"
        >
          <IoChatbubbleEllipsesOutline size={30} />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">
              🤖 Food Assistant - Menu Explorer
            </h3>
            <button onClick={toggleChat} aria-label="Close chatbot">
              <IoClose size={24} />
            </button>
          </div>

          {/* Body */}
          <div
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  style={{ 
                    lineHeight: msg.sender === "bot" ? "1.6" : "1.4",
                    fontSize: msg.sender === "bot" ? "14px" : "14px"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 rounded-r-md hover:bg-orange-600 disabled:bg-orange-300"
                disabled={isLoading}
              >
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
