# 🎮 GameHaven API – Store Backend

A modular and scalable **Node.js + Express** backend for an e-commerce platform focused on games. This API handles authentication, categories, game management, shopping cart, orders, wishlist, reviews, and admin operations.

## ✨ Features

- 🔐 User Authentication (Register, Login, JWT)  
- 🛠️ Admin Panel APIs  
- 🗂️ Product Categories & Game Management  
- 🛒 Shopping Cart Functionality  
- 📦 Order Processing  
- ❤️ Wishlist Management  
- ⭐ Game Reviews  
- ❌ Centralized Error Handling  
- 📁 Modular Routing  

## 🧰 Tech Stack

- **Node.js**  
- **Express**  
- **MongoDB** (Recommended with Mongoose)  
- **dotenv**  
- **morgan** (HTTP request logger)  

## 📦 Installation

git clone https://github.com/omniaosama548/-GameHaven-API-

cd -GameHaven-API-

npm install

## 🔐 Environment Variables

Create a .env file in the root directory with the following:

PORT=9093

MONGO_URI=your_mongo_db_connection_string

JWT_SECRET=your_jwt_secret


## 🚀 Running the Server

To start the development server:

npm run dev

or

node server.mjs

## 🔗 API Endpoints

| Method | Route                | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | User Registration            |
| POST   | `/api/auth/login`    | User Login                   |
| GET    | `/api/categories`    | Fetch Game Categories        |
| CRUD   | `/api/games`         | Game Management (Admin)      |
| CRUD   | `/api/cart`          | Shopping Cart Operations     |
| CRUD   | `/api/orders`        | Order Placement & Management |
| CRUD   | `/api/wishlist`      | Wishlist Management          |
| CRUD   | `/api/reviews`       | Submit & View Game Reviews   |


## ⚠️ Error Handling

All unhandled errors are processed by the centralized error handler located in:

controllers/errorController.mjs



