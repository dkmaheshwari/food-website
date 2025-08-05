<div align="center" id="#readme-top">
  <h1><b>Foodie - A Full-Stack Food Ordering Platform</b></h1>
  <p>A Swiggy-inspired, feature-rich food ordering web application built with the MERN stack.</p>
</div>

<!-- TABLE OF CONTENTS -->

- [About The Project](#about)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Live Demo](#live-demo)

<!-- ABOUT THE PROJECT -->

## 🥘 About The Project <a name="about"></a>

Foodie is a comprehensive, full-stack web application inspired by Swiggy. It allows users to browse restaurants, view menus, and add items to their cart. The project features a complete user authentication system and is built with a modern MERN (MongoDB, Express, React, Node.js) stack.

---

### 💻 Tech Stack <a name="tech-stack"></a>

**Frontend:**

- **React.js:** For building the user interface.
- **Redux Toolkit:** For robust state management.
- **React Router:** For client-side routing and navigation.
- **Tailwind CSS:** For modern and responsive styling.

**Backend:**

- **Node.js & Express.js:** For building the RESTful API server.
- **MongoDB & Mongoose:** As the database and ODM for data modeling.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **bcryptjs:** For hashing user passwords.

**Development Tools:**

- **Parcel:** As the web application bundler.
- **Babel:** For JavaScript transpiling.

---

### 🧿 Key Features <a name="key-features"></a>

- **Full-Stack Application:** Complete MERN stack implementation from frontend to backend.
- **User Authentication:** Secure sign-up and sign-in functionality with JWT-based authentication.
- **Dynamic Backend API:** A robust backend that serves restaurant and menu data from a MongoDB database.
- **Restaurant & Menu Browsing:** Users can browse a list of restaurants and view their detailed menus.
- **Shopping Cart:** Fully functional cart to add and manage food items.
- **Protected Routes:** Secure application routes that are only accessible to authenticated users.
- **Data Seeding:** Includes a seeder script to populate the database with initial restaurant data.
- **Responsive Design:** A clean and modern UI that works seamlessly across all devices.

---

<!-- GETTING STARTED -->

## � Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js** and **npm** (or yarn) installed on your machine.
- A **MongoDB** instance (either local or a free Atlas cluster).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dkmaheshwari/food-website.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd food-website
    ```
3.  **Install frontend dependencies:**
    ```sh
    npm install
    ```
4.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```
5.  **Create a `.env` file** in the `backend` directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_strong_secret_key_for_jwt
    PORT=5000
    ```

### Running the Application

1.  **Seed the database** (run this from the `backend` directory):
    ```sh
    node seeder.js
    ```
2.  **Start the backend server** (run this from the `backend` directory):

    ```sh
    npm start
    ```

    The backend will be running on `http://localhost:5000`.

3.  **Start the frontend development server** (run this from the root `food-website` directory):
    ```sh
    npm start
    ```
    The frontend will open in your browser at `http://localhost:1234`.

---

### ✨ Live Demo <a name="live-demo"></a>

Check out the live demo here: [https://dkmaheshwari.github.io/food-website/](https://dkmaheshwari.github.io/food-website/)
