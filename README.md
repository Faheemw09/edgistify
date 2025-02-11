

**Overview**

This backend powers an e-commerce platform, enabling user authentication, product management, cart functionality, and order placement. It is deployed at:

Base URL: https://edgistify-bsgv.onrender.com


Postman Collection

A Postman collection is available for testing all API endpoints related to user registration, login, adding products to the cart, and placing orders.
https://documenter.getpostman.com/view/24250536/2sAYXBFerM

Tech Stack

Node.js with Express.js for building REST APIs

MongoDB with Mongoose for database management

JWT Authentication for session management

bcrypt.js for password hashing

Axios for HTTP requests

**Installation**

To set up the backend locally:



Install dependencies:

npm install

Set up environment variables (.env file):



Run the server:

npm start

API Endpoints

1. User Authentication

User Sign Up

Endpoint: POST /api/user-signup

Description: Register a new user.

Request Body:

{
  "fullName": "abc",
  "email": "abc@gmail.com",
  "password": "securepassword"
}

Response:

{
  "message": "User registered successfully",
 
}

User Sign In

Endpoint: POST /api/user-signin

Description: Authenticate user and return JWT token.

Request Body:

{
  "email": "abc@gmail.com",
  "password": "securepassword"
}

Response:

{
  "message": "Signin successful",
  "token": "jwt-token",
  "user": { "id": "12345", "email": "abc@example.com" }
}

2. Cart Management

Add Product to Cart

Endpoint: POST /api/add-to-cart



Request Body:

{
"userId":"user123",
  "productId": "product123",
  "quantity": 2
}

Response:

{
  "message": "Product added to cart successfully",
  "cart": {
    "userId": "12345",
    "items": [{ "productId": "product123", "quantity": 2 }]
  }
}

3. Order Management

Place Order

Endpoint: POST /api/order

Headers:

Authorization: Bearer <jwt-token>

Request Body:

{
  "shippingAddress": "123 Main St, City, Country"
}

Response:

{"message":"Order placed successfully","order":{"userId":"67aae5c6f9fc846b20fd1353","items":[{"productId":"67ab4c117a70ca3858b5453b","quantity":1,"price":199.99,"_id":"67ab673ed4a9c1823a5293ff"}],"totalPrice":199.99,"shippingAddress":"123 Street, City, Country","paymentStatus":"Pending","orderStatus":"Pending","_id":"67ab673ed4a9c1823a5293fe","createdAt":"2025-02-11T15:05:34.081Z","updatedAt":"2025-02-11T15:05:34.081Z","__v":0}}


Deployment



