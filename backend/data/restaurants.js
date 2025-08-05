const restaurants = [
  {
    name: "Pizza Palace",
    cuisine: ["Italian", "Pizza"],
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza",
        price: 12.99,
        isVeg: true,
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza with pepperoni slices",
        price: 14.99,
        isVeg: false,
      },
    ],
  },
  {
    name: "Burger Barn",
    cuisine: ["American", "Burgers"],
    rating: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    menu: [
      {
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and cheese",
        price: 9.99,
        isVeg: false,
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with all the fixings",
        price: 10.99,
        isVeg: true,
      },
    ],
  },
  {
    name: "Sushi Station",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    menu: [
      {
        name: "California Roll",
        description: "Crab, avocado, and cucumber roll",
        price: 8.99,
        isVeg: false,
      },
      {
        name: "Avocado Roll",
        description: "Simple and delicious avocado roll",
        price: 6.99,
        isVeg: true,
      },
    ],
  },
];

module.exports = restaurants;
