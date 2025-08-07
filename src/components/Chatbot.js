import React, { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome! How can I help you find a great restaurant today?",
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

      // Create restaurant data context for the AI
      const restaurantContext =
        restaurants.length > 0
          ? `Available restaurants in our system:\n${restaurants
              .map(
                (r) =>
                  `- ${r.name}: ${r.cuisine.join(", ")} cuisine, Rating: ${
                    r.rating
                  }/5${r.menu ? `, Menu items: ${r.menu.length} items` : ""}`
              )
              .join("\n")}\n\n`
          : "Currently no restaurant data is available.\n\n";

      // Enhanced prompt with actual restaurant data
      const prompt = `You are a helpful restaurant recommendation chatbot for Foodie, a food delivery platform serving Ghaziabad and surrounding areas. You have access to our current restaurant database.

${restaurantContext}

User's message: "${currentInput}"

Instructions:
1. If the user asks for restaurant recommendations, use ONLY the restaurants from our database above
2. When recommending restaurants, mention specific names, cuisines, and ratings from our data
3. If asking about a specific cuisine, filter restaurants by that cuisine type
4. If asking about Ghaziabad specifically, mention that these are the restaurants we serve in the area
5. If no restaurants match their criteria, suggest alternatives from our available options
6. Keep responses helpful, friendly, and focused on our actual restaurant offerings
7. If the user asks about something unrelated to food/restaurants, politely redirect them to food-related topics

Please provide a helpful response:`;

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
              Find the best restaurants in town
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
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
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
