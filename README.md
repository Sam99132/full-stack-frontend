NovaCart — An E-Commerce Website
Problem Statement

NovaCart is a modern, intuitive online storefront designed to let shoppers discover, search, and purchase products with minimal friction across devices. The platform delivers dynamic product catalogs, secure payments, responsive UI, and streamlined navigation—complemented by an administrative console for efficient product, order, and customer management.
The objective is to build a robust, scalable marketplace that elevates customer experience while simplifying day-to-day business operations.

System Architecture

NovaCart adopts a three-tier software architecture with clear separation of concerns across Frontend, Backend (API), and Database layers to ensure scalability, maintainability, and performance.

Frontend: Next.js

Backend (API): Node.js with Express.js

Database: MySQL with Prisma

Authentication: JWT (JSON Web Token)

Hosting:

Frontend: Vercel

Backend: Render

Database: NeonDB

Key Features

Authentication & Authorization: Secure signup, login, and logout flows via JWT with role-based access (Admin & User).

CRUD Operations: Manage products, users, and orders. Admins can update inventory and order statuses; users can view profiles and place orders.

Frontend Routing: Next.js pages for Home, Login/Signup, Dashboard, Product Details, Profile, and Cart & Checkout.

Product Discovery Enhancements: Keyword search, category filters, and price range sliders for optimized browsing.

Dynamic Content Loading: Infinite scroll or “Load More” for better performance and UX.

Cloud Deployment:

Frontend on Vercel

API on Render

Database on NeonDB (managed, scalable storage)

Tech Stack
Frontend

React

Next.js

Tailwind CSS

Backend

Node.js

Express.js

Database

MySQL

Prisma

Authentication

JWT (JSON Web Token)

Hosting

Vercel

Render

API Overview
Auth Routes

POST /api/auth/signup — Register a new user — Public

POST /api/auth/login — Authenticate user & issue JWT — Public

POST /api/auth/logout — Invalidate session token — Authenticated

User Routes

GET /api/users/:id — Retrieve user profile — Authenticated

Product Routes

GET /api/products — List all products — Public

GET /api/products/:id — Fetch product by ID — Public

POST /api/products — Create a new product — Admin only

PUT /api/products/:id — Update product info — Admin only

DELETE /api/products/:id — Delete a product — Admin only

Order Routes

POST /api/orders — Place a new order — Authenticated

GET /api/orders/:id — View order details — Authenticated
