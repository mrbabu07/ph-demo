# NextShop - Next.js E-commerce Application

A modern e-commerce application built with Next.js 16 (App Router) and Express.js backend.

## Project Description

NextShop is a full-stack e-commerce platform featuring a beautiful landing page, product catalog, authentication system, and protected admin routes for managing products. The application demonstrates modern web development practices with server-side rendering, API integration, and responsive design.

## Features Implemented

### ✅ Core Features

1. **Landing Page**

   - Hero section with call-to-action
   - Features showcase (Fast Delivery, Quality Products, Secure Payment)
   - About section
   - Services overview
   - Customer testimonials
   - Statistics section
   - Call-to-action section
   - Responsive navbar with navigation links
   - Footer with quick links and social media

2. **Authentication System**

   - Mock login with hardcoded credentials
   - Cookie-based session management
   - Protected routes using Next.js middleware
   - Credentials: `mockadmin@gmail.com` / `123456`
   - Automatic redirect to products page on successful login
   - Redirect to login page for unauthenticated access to protected routes

3. **Product List Page (Public)**

   - Fetches products from Express.js API
   - Displays product cards with:
     - Product image
     - Name
     - Description
     - Price
     - Stock availability
   - Responsive grid layout
   - Click to view product details

4. **Product Details Page (Public)**

   - Full product information display
   - Large product image
   - Detailed description
   - Category and stock information
   - Add to cart button (UI only)
   - Back navigation to products list

5. **Add Product Page (Protected)**

   - Only accessible when logged in
   - Form fields:
     - Product name
     - Description
     - Price
     - Stock quantity
     - Category
     - Image URL
   - Form validation
   - Toast notifications on success/error
   - Automatic redirect to products page after successful creation
   - Integration with Express.js API

6. **API Routes with Vercel KV**
   - RESTful API endpoints (Next.js API routes)
   - Vercel KV database for persistent storage
   - Endpoints:
     - `GET /api/products` - Get all products
     - `GET /api/products/:id` - Get single product
     - `POST /api/products` - Create new product
     - `PUT /api/products/:id` - Update product
     - `DELETE /api/products/:id` - Delete product
   - Pre-populated with sample products

## Technologies Used

- **Frontend:**

  - Next.js 16 (App Router)
  - React 19
  - Tailwind CSS 4
  - JavaScript (JSX)

- **Backend:**

  - Next.js API Routes (Serverless)
  - Vercel KV (Redis-compatible database)
  - Node.js

- **Authentication:**
  - Cookie-based sessions
  - Next.js middleware for route protection

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory:**

   ```bash
   cd nextjs-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`
   API endpoints available at `/api/products`

4. **Open your browser and visit:**
   - Landing page: `http://localhost:3000`
   - Products: `http://localhost:3000/products`
   - Login: `http://localhost:3000/login`

**Note:** In local development, products use default data. For persistent storage, deploy to Vercel and add Vercel KV database.

## Routes Summary

### Public Routes

- `/` - Landing page with 7 sections
- `/products` - Product list page
- `/products/[id]` - Product details page
- `/login` - Login page

### Protected Routes (Requires Authentication)

- `/dashboard` - Dashboard home
- `/dashboard/add-product` - Add new product form

## Login Credentials

For testing the authentication system:

- **Email:** `mockadmin@gmail.com`
- **Password:** `123456`

## API Endpoints

The Next.js API routes provide the following endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

All data is stored in Vercel KV database.

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── page.jsx                    # Landing page
│   │   ├── layout.js                   # Root layout
│   │   ├── globals.css                 # Global styles
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.js            # Products API (GET, POST)
│   │   │       └── [id]/
│   │   │           └── route.js        # Single product API (GET, PUT, DELETE)
│   │   ├── login/
│   │   │   └── page.jsx                # Login page
│   │   ├── products/
│   │   │   ├── page.jsx                # Products list
│   │   │   └── [slug]/
│   │   │       └── page.jsx            # Product details
│   │   └── dashboard/
│   │       ├── layout.jsx              # Dashboard layout
│   │       ├── page.jsx                # Dashboard home
│   │       └── add-product/
│   │           └── page.jsx            # Add product form
│   ├── (components)/
│   │   └── form/
│   │       └── loginForm.jsx           # Login form component
│   └── proxy.js                        # Route protection
├── package.json
├── vercel.json                         # Vercel configuration
└── README.md
```

## Features Explanation

### Landing Page Sections

1. **Navbar** - Sticky navigation with links to Products and Login
2. **Hero** - Eye-catching banner with CTA button
3. **Features** - Three key benefits (Fast Delivery, Quality, Security)
4. **About** - Company information
5. **Services** - Four service offerings
6. **Testimonials** - Customer reviews
7. **Stats** - Key metrics (customers, products, satisfaction)
8. **CTA** - Final call-to-action section
9. **Footer** - Links and social media

### Authentication Flow

- User enters credentials on login page
- On successful login, auth cookie is set
- User is redirected to products page
- Protected routes check for auth cookie via middleware
- Unauthenticated users are redirected to login

### Product Management

- Products are stored in Vercel KV database
- Next.js API routes handle CRUD operations
- Next.js fetches data using server-side rendering
- Add product form includes validation and toast notifications

## Development Scripts

- `npm run dev` - Start Next.js development server (includes API)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- The Next.js dev server includes both frontend and API routes
- Products are stored in Vercel KV database for production
- Images use Unsplash URLs for demonstration purposes
- Authentication is mock-based for demonstration (not production-ready)
- **For production:** Vercel KV provides persistent storage

## Deployment

### Quick Deploy to Vercel (2 minutes)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Done! 🎉

### Important for Production:

- Vercel's filesystem is read-only
- You need to add a database for persistent storage
- Recommended: Vercel Postgres, MongoDB Atlas, or Supabase

See **[VERCEL_API_MIGRATION.md](VERCEL_API_MIGRATION.md)** for details about the API structure.

## Future Enhancements

- Implement NextAuth.js for social login (Google)
- Add shopping cart functionality
- Implement real database (MongoDB, PostgreSQL)
- Add user registration
- Implement payment gateway
- Add product search and filtering
- Implement image upload functionality

---

Built with ❤️ using Next.js 16
