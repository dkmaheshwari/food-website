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
        description: "Classic cheese and tomato pizza with fresh basil",
        price: 12.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza with pepperoni slices and mozzarella cheese",
        price: 14.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Quattro Stagioni",
        description:
          "Four seasons pizza with ham, mushrooms, artichokes, and olives",
        price: 16.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Vegetarian Supreme",
        description:
          "Loaded with bell peppers, mushrooms, onions, and tomatoes",
        price: 15.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&auto=format&fit=crop&q=60",
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
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with all the fixings",
        price: 10.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "BBQ Bacon Burger",
        description: "Beef patty with BBQ sauce, bacon, and crispy onions",
        price: 13.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Chicken Deluxe",
        description: "Grilled chicken breast with avocado and mayo",
        price: 11.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1606755962773-d324e2d53352?w=300&auto=format&fit=crop&q=60",
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
        imageUrl:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Avocado Roll",
        description: "Simple and delicious avocado roll",
        price: 6.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Salmon Sashimi",
        description: "Fresh salmon slices, 6 pieces",
        price: 12.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Tuna Roll",
        description: "Fresh tuna with rice and nori",
        price: 9.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1615361200098-ed467d371ea8?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Spice Route",
    cuisine: ["Indian", "Curry", "Vegetarian"],
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken",
        price: 14.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Palak Paneer",
        description: "Cottage cheese cubes in spiced spinach gravy",
        price: 12.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Biryani",
        description: "Aromatic basmati rice with spices and meat/vegetables",
        price: 16.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Dal Tadka",
        description: "Yellow lentils tempered with spices",
        price: 9.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Taco Fiesta",
    cuisine: ["Mexican", "Tex-Mex"],
    rating: 4.3,
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38174c4a6b52?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Chicken Tacos",
        description: "Grilled chicken with salsa and lettuce in corn tortillas",
        price: 8.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1565299585323-38174c4a6b52?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Veggie Quesadilla",
        description: "Cheese and vegetable filled tortilla",
        price: 7.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Beef Burrito",
        description: "Large flour tortilla with seasoned beef and beans",
        price: 11.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Guacamole & Chips",
        description: "Fresh avocado dip with crispy tortilla chips",
        price: 5.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Pasta Paradise",
    cuisine: ["Italian", "Pasta"],
    rating: 4.4,
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with pancetta and parmesan",
        price: 13.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Penne Arrabbiata",
        description: "Spicy tomato sauce with garlic and chili",
        price: 11.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1621996346565-e3dbc353d8e5?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Fettuccine Alfredo",
        description: "Rich and creamy white sauce pasta",
        price: 12.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Lasagna",
        description: "Layered pasta with meat sauce and cheese",
        price: 15.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Dragon Wok",
    cuisine: ["Chinese", "Asian"],
    rating: 4.1,
    imageUrl:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Sweet & Sour Chicken",
        description: "Crispy chicken with sweet and sour sauce",
        price: 12.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls filled with fresh vegetables",
        price: 6.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Kung Pao Chicken",
        description: "Spicy chicken with peanuts and vegetables",
        price: 13.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Fried Rice",
        description: "Wok-fried rice with vegetables and soy sauce",
        price: 8.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    name: "Mediterranean Breeze",
    cuisine: ["Mediterranean", "Greek"],
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    menu: [
      {
        name: "Greek Salad",
        description: "Fresh tomatoes, cucumber, olives, and feta cheese",
        price: 9.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Chicken Gyros",
        description: "Grilled chicken with tzatziki in pita bread",
        price: 11.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Hummus Platter",
        description: "Traditional hummus with pita bread and vegetables",
        price: 7.99,
        isVeg: true,
        imageUrl:
          "https://images.unsplash.com/photo-1571197119185-1cdabc2d3e6a?w=300&auto=format&fit=crop&q=60",
      },
      {
        name: "Moussaka",
        description: "Layered eggplant and meat casserole",
        price: 14.99,
        isVeg: false,
        imageUrl:
          "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=300&auto=format&fit=crop&q=60",
      },
    ],
  },
];

module.exports = restaurants;
