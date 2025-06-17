-GameHaven-API- Store Backend API
A modular and scalable Node.js + Express backend for an e-commerce platform focused on games. This API handles authentication, categories, game management, shopping cart, orders, wishlist, reviews, and admin operations.

**Features**
User Authentication (Register, Login, JWT)

Admin Panel APIs

Product Categories & Game Management

Shopping Cart Functionality

Order Processing

Wishlist Management

Game Reviews

Centralized Error Handling

Modular Routing

**Tech Stack**
Node.js

Express

MongoDB (recommended for use with Mongoose in routes)

dotenv

morgan (HTTP request logger)

**Installation**

git clone https://github.com/omniaosama548/-GameHaven-API-
cd -GameHaven-API-
npm install

**Environment Variables**
Create a .env file in the root with:

PORT=9093
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret

**Running the Server**

npm run dev

Or

node server.mjs

**API Endpoints**
Route Description
/api/auth/register Authentication (register)
/api/auth/login Authentication (login)
/api/categories Game categories
/api/games CRUD for games
/api/cart Shopping cart operations
/api/orders Place and manage orders
/api/wishlist User wishlist management
/api/reviews Submit and get game reviews

**Error Handling**
Handled globally by globalErrorHandler in controllers/errorController.mjs.
