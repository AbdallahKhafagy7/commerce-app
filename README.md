# Commerce API

A RESTful API for managing users, categories, products, carts, and cart items with authentication (JWT). Built with **Node.js, Express, and MongoDB (Mongoose)**.

---

## Table of Contents

* [Features](#features)
* [Environment Variables](#environment-variables)
* [Installation](#installation)
* [Running the Project](#running-the-project)
* [API Endpoints](#api-endpoints)

  * [Auth](#auth)
  * [Users](#users)
  * [Categories](#categories)
  * [Products](#products)
  * [Cart](#cart)
  * [CartItems](#cartitems)
* [Notes](#notes)

---

## Features

* User signup, login, logout
* JWT authentication with `httpOnly` cookies
* CRUD for Categories and Products
* Cart creation/deletion per user
* Add, update, delete items in cart
* Ownership checks: Users can only access their own resources

---

## Environment Variables

Create a `.env` file at the project root:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/commerce
JWT_SECRET=your_super_secret_key
```

---

## Installation

```bash
# Clone repo
git clone https://github.com/yourusername/commerce-api.git
cd commerce-api

# Install dependencies
npm install
```

---

## Running the Project

```bash
# Start server in development mode
npm run dev

# Or start normally
npm start
```

Server will run on `http://localhost:PORT` (from `.env`).

---

## API Endpoints

> All endpoints that require authentication need the JWT cookie (sent automatically if using `credentials: "include"` from frontend).

---

### Auth

| Method | URL                | Description                                       |
| ------ | ------------------ | ------------------------------------------------- |
| POST   | `/api/auth/signup` | Signup a new user `{ username, email, password }` |
| POST   | `/api/auth/login`  | Login existing user `{ email, password }`         |
| POST   | `/api/auth/logout` | Logout user (clears cookie)                       |

---

### Users

| Method | URL          | Description                                            |
| ------ | ------------ | ------------------------------------------------------ |
| GET    | `/api/users` | Get current authenticated user                         |
| PATCH  | `/api/users` | Update current user `{ username?, email?, password? }` |

---

### Categories

| Method | URL                   | Description                               |
| ------ | --------------------- | ----------------------------------------- |
| GET    | `/api/categories`     | Get all categories                        |
| POST   | `/api/categories`     | Create category `{ name, description }`   |
| GET    | `/api/categories/:id` | Get single category                       |
| PATCH  | `/api/categories/:id` | Update category `{ name?, description? }` |
| DELETE | `/api/categories/:id` | Delete category                           |

---

### Products

| Method | URL                 | Description                                                |
| ------ | ------------------- | ---------------------------------------------------------- |
| GET    | `/api/products`     | Get all products created by the user                       |
| POST   | `/api/products`     | Create product `{ name, price, quantity, categoryID }`     |
| GET    | `/api/products/:id` | Get single product (owned by user)                         |
| PATCH  | `/api/products/:id` | Update product `{ name?, price?, quantity?, categoryID? }` |
| DELETE | `/api/products/:id` | Delete product                                             |

---

### Cart

| Method | URL         | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/api/cart` | Create a cart for current user |
| DELETE | `/api/cart` | Delete current user's cart     |

---

### CartItems

| Method | URL                          | Description                                           |
| ------ | ---------------------------- | ----------------------------------------------------- |
| GET    | `/api/cart/:cartID/items`    | Get all items of a cart (populated with product info) |
| POST   | `/api/cart/:cartID/items`    | Add item to cart `{ productID, quantity }`            |
| GET    | `/api/cartItems/:cartItemID` | Get single cart item info                             |
| PATCH  | `/api/cartItems/:cartItemID` | Update cart item `{ quantity }`                       |
| DELETE | `/api/cartItems/:cartItemID` | Delete cart item                                      |

---

## Notes

* **Ownership**: Users can only access/update/delete their own products, carts, and cart items.
* **CartItem product info**: CartItem only stores `productID`, actual product info (name, price) is populated when fetching.
* **JWT cookie**: Make sure frontend sends `credentials: "include"` when calling authenticated routes.
* **Logging**: Requests and errors are logged with timestamps using the logger middleware.

