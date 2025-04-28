# 🛒 Hanouti Store | E-Commerce Platform

<div align="center">
  <img src="./client/public/assets/images/readme-banner.png" alt="Hanouti Store Banner" width="800px" style="border-radius: 10px; margin-bottom: 20px;" />
  
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
    <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  </p>
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Docker Setup](#-docker-setup)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

Hanouti Store is a full-featured e-commerce platform built with modern web technologies. The name "Hanouti" means "my shop" in Arabic, reflecting the platform's focus on providing a personalized shopping experience for users in Tunisia and beyond.

The application features a responsive design, robust user authentication, product management, shopping cart functionality, and secure payment processing with both online payments via Stripe and cash-on-delivery options.

## ✨ Features

### 🔐 User Authentication & Management

- Email-based registration with verification
- Login and logout functionality
- Google authentication integration
- Password recovery via OTP
- User profile management with avatar uploads

### 🏪 Product Management

- Category and subcategory organization
- Product search and filtering
- Product detail views with multiple images
- Admin dashboard for product management

### 🛒 Shopping Experience

- Add to cart functionality
- Cart management (update quantities, remove items)
- Address management for delivery
- Order tracking

### 💳 Payment Processing

- Stripe integration for online payments
- Cash on delivery option
- Order confirmation and history

### 👑 Admin Features

- Product upload and management
- Category and subcategory management
- Comprehensive dashboard

## 🛠 Tech Stack

### Frontend

- **Next.js**: React framework for server-rendered applications
- **Redux Toolkit**: State management with Redux Persist for local storage
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Hook Form**: Form validation
- **React Hot Toast**: Toast notifications

### Backend

- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: Authentication with JSON Web Tokens
- **Bcrypt**: Password hashing
- **Multer**: File uploads
- **Resend**: Email service integration
- **Stripe**: Payment processing

### DevOps

- **Docker & Docker Compose**: Containerization
- **Environment Variables**: Configuration management

## 📂 Project Structure

The project follows a client-server architecture with clear separation of concerns:

```
hanouti-store/
├── client/                  # Frontend Next.js application
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable UI components
│   ├── api/                 # API client configurations
│   ├── lib/                 # Utility functions
│   ├── providers/           # Context providers
│   ├── store/               # Redux store setup
│   └── public/              # Static assets
│
├── server/                  # Backend Express.js application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose data models
│   ├── routes/              # API routes
│   └── utils/               # Utility functions
│
└── docker-compose.yml       # Docker Compose configuration
```

## 📱 Screenshots

<div align="center">
  <p float="left">
    <img src="./client/public/assets/images/screenshot-home.png" width="48%" />
    <img src="./client/public/assets/images/screenshot-product.png" width="48%" />
  </p>
  <p float="left">
    <img src="./client/public/assets/images/screenshot-cart.png" width="48%" />
    <img src="./client/public/assets/images/screenshot-checkout.png" width="48%" />
  </p>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn
- Stripe account for payment processing
- Resend account for email services

### Installation

#### Without Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hanouti-store.git
   cd hanouti-store
   ```

2. Set up the server:

   ```bash
   cd server
   npm install
   # Create a .env file with necessary environment variables
   npm run dev
   ```

3. Set up the client:

   ```bash
   cd ../client
   npm install
   # Create a .env.local file with necessary environment variables
   npm run dev
   ```

4. Access the application at http://localhost:3000

## 🐳 Docker Setup

For easy deployment, the project is containerized using Docker:

1. Make sure Docker and Docker Compose are installed on your machine.

2. Create environment files:

   - Create `.env` in the server directory
   - Create `.env.local` in the client directory

3. Build and run the containers:

   ```bash
   docker-compose up -d
   ```

4. Access the application at http://localhost:3000

## 📚 API Documentation

The backend provides a RESTful API with the following main endpoints:

### Authentication

- `POST /api/user/signup` - Register a new user
- `POST /api/user/verify-email` - Verify user email
- `POST /api/user/signin` - User login
- `GET /api/user/signout` - User logout
- `POST /api/user/forget-password` - Password recovery
- `POST /api/user/verify-otp` - Verify OTP for password recovery
- `PUT /api/user/reset-password` - Reset password

### Products

- `GET /api/product/get-products` - Get products with pagination
- `GET /api/product/productDetails` - Get single product details
- `GET /api/product/search-product` - Search products
- `POST /api/product/create-product` - Create product (admin)
- `PUT /api/product/update-product` - Update product (admin)
- `DELETE /api/product/delete-product` - Delete product (admin)

### Categories

- `GET /api/category/get-categories` - Get all categories
- `POST /api/category/add-category` - Add category (admin)
- `PUT /api/category/update-category` - Update category (admin)
- `DELETE /api/category/delete-category` - Delete category (admin)

### Cart & Orders

- `GET /api/cart/get-cart` - Get user's cart
- `POST /api/cart/add-cart` - Add item to cart
- `PUT /api/cart/update-cart` - Update cart item
- `DELETE /api/cart/delete-cart` - Remove item from cart
- `POST /api/order/cash-on-delivery` - Create cash on delivery order
- `POST /api/order/payment` - Process online payment
- `GET /api/order/order-details` - Get user's orders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <h3>
    <a href="https://github.com/aminammar1/TunisianShop-NextJS.git">GitHub</a>
    <span> | </span>
    <a href="https://tunisian-shop-next-js.vercel.app/">Live Demo</a>
    <span> | </span>
    <a href="https://www.figma.com/design/wfGt8xdleKsyXQeFbcF47w/Hanouti.TN-Store?node-id=0-1&t=cFBsL2XkjU2MEk1Y-1">Figma Design</a>
  </h3>
  <p>Built with ❤️ by <a href="https://github.com/aminammar1">Mohamed Amine Ammar</a></p>
</div>
