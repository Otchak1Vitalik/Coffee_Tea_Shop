# Aroma Flow

An e-commerce platform for coffee and tea products featuring an administrative panel and a product catalog.

## Technologies

- **Backend:** Node.js, Express, Mongoose, JWT, MongoDB
- **Frontend:** React 18, React Router, Vite, Axios
- **Database:** MongoDB
- **Architecture:** REST API + SPA (Single Page Application)

## Features

### Customer (Client Side)
- Browse coffee and tea product catalogs categorized by type
- View detailed pages for individual products
- Add products to the cart and manage quantities (global state)
- Place orders and perform user profile authorization/registration

### Administrator (Admin Panel)
- List and manage system users
- Control and view submitted orders
- Manage the product catalog

## Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or cloud database)

### Automatic Startup (via script)
In the root directory of the project, you can use the `start.bat` launch file, which automatically configures and starts both parts of the project.

### Manual Startup

#### Backend (Server)

```bash
cd server
npm install
npm start
```

#### Frontend (Client)

```bash
cd client
npm install
npm run dev
```

The application will be available at: http://localhost:3000

## Project Structure
 
 ```
/client
 /public
   /assets           # Static resources (product images)
 /src
   /api              # Axios clients (auth, orders, products)
   /components       # UI blocks (header, footer, product card, grid)
   /context          # Global state (shopping cart, user data)
   /pages            # Pages (Home, Coffee/Tea, Product, Cart, Profile, Admin)
   App.jsx           # Route configurations (React Router)
   main.jsx          # React entry point
   styles.css        # General styles

/server
 /controllers        # Controller logic (auth, product, order, admin)
 /models             # MongoDB data schemas (User, Product, Order)
 /routes             # API routes (auth, products, orders, admin)
 server.js           # Main server file (Express, MongoDB connection)
 .env                # Environment variables
 package.json        # Backend dependencies
 ```

## Key Features

### Authentication & Security
- User registration and secure login (JWT)
- Role-based access control (Customer / Administrator)

### Cart & Orders
- Real-time product additions to the cart (using global state)
- Quick checkout process for coffee and tea products

### Administration
- Convenient product catalog management via the admin panel
- Review and control of user orders

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a user
- `POST /api/auth/login` — User login

### Products (`/api/products`)
- `GET /api/products` — Get a list of products
- `GET /api/products/:id` — Get details of a specific product

### Orders (`/api/orders`)
- `POST /api/orders` — Create a new order

### Admin Panel (`/api/admin`)
- `GET /api/admin/users` — List of users
- `GET /api/admin/orders` — List of all orders for the admin panel

## Order Statuses

|  Entity  |                          Statuses                         |
|----------|-----------------------------------------------------------|
|   Order  | pending -> processing -> shipped -> delivered / cancelled |