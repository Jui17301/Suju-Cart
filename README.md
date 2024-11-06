# Suju-Cart:E-Commerce Application

This is a full-stack e-commerce web application built with **Next.js** and **Node.js**, featuring both **Admin** and **User** roles. Admins can manage products, categories, users, orders, and payments, while users can browse products, manage their cart, and place orders.

## Table of Contents

- [Features](#features)
  - [Admin Features](#admin-features)
  - [User Features](#user-features)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Bonus Features](#bonus-features)

## Features

### Admin Features

- **User Management**: Create, view, edit, and delete user accounts.
- **Product Management**: Add, update, delete, and view products with details such as name, description, price, stock quantity, category, and images.
- **Category Management**: Organize products by adding, editing, and deleting categories.
- **Order Management**: View, update, and cancel user orders.
- **Payment Management**: Access payment records, with details of payment statuses.

### User Features

- **Product Browsing**: Search and filter products by category, price, and keywords.
- **Product Details**: View detailed product information and reviews.
- **Cart Management**: Add, view, and modify items in the shopping cart.
- **Checkout & Payment**: Complete orders and make secure online payments.
- **Order History**: View past orders with details such as date, products, total amount, and status.

## Pages

1. **Home Page (/)**

   - **Header**: Navigation links (Home, Products, Cart).
   - **Main Section**: Displays products with search, filtering, and pagination.
   - **Footer**: Links to contact, terms, and privacy policy.

2. **Product Details Page (/product/[id])**

   - **Product Images & Description**
   - **Price & Stock Information**
   - **Add to Cart Button**
   - **Reviews Section**: Submit new reviews.

3. **Cart Page (/cart)**

   - **Cart Summary**: Lists items, subtotal, and total prices.
   - **Modification Options**: Adjust quantities or remove items.

4. **Checkout Page (/checkout)**

   - **Checkout Form**: Shipping and billing details.
   - **Order Summary & Payment Processing**

5. **Order History Page (/orders)**

   - **Order List**: Displays previous orders with details and statuses.

6. **Admin Dashboard**
   - **User Management**: List, add, edit, or delete users.
   - **Product Management**: List, add, edit, or delete products.
   - **Order Management**: List orders with status updates.

## Technologies Used

- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, Express.js, TypeScript, MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe or AmarPay
- **Deployment**: Vercel (Next.js), alternative for backend deployment if needed (e.g., Vercel Serverless Functions or other platforms)

## Installation

Clone the Repository:

```bash Copy code
git clone https://github.com/my-username/Suju-Cart.git
git clone https://github.com/my-username/Suju-Cart-Server.git
```

### Install Dependencies:

```bash Copy code
npm install
```

### Backend Configuration:

Navigate to the backend folder:

```bash Copy code
cd Suju-Cart-Server
```

### Create .env File:

Create a .env file in the backend directory and add the following environment variables:

```plaintext Copy code
NODE_ENV=developement
PORT=your_port
DATABASE_URL=your_database_url
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_round
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=your_jwt_access_expires_in
JWT_REFRESH_EXPIRES_IN=your_jwt_refresh_expired_in
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Start the Backend Server:

```bash Copy code
npm run start:dev
```

### Frontend Configuration:

Navigate to the frontend folder:

```bash Copy code
cd Suju-Cart
```

### Install Frontend Dependencies:

```bash Copy code
npm install
```

### Start the Frontend Development Server:

```bash Copy code
npm run dev
```

### Create .env File:

Create a .env.local file in the backend directory and add the following environment variables:

```plaintext Copy code
NEXT_PUBLIC_BACKEND_URL= your_backend_url
NEXT_PUBLIC_STRIPE_PAYMENT_GATEWAY_PK=your_stripe_payment_gateway_pk

```

### License

This project is licensed under the MIT License. See the LICENSE file for more details.