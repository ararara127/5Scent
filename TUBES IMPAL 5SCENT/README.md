# 5SCENT - Premium Perfume E-Commerce Platform

A full-stack e-commerce platform for selling premium perfumes with a modern Next.js frontend and Laravel backend.

## 🎯 Project Overview

5SCENT is a complete online perfume shop featuring:
- ✅ Product catalog with carousel and images
- ✅ User authentication & profiles
- ✅ Shopping cart & wishlist functionality
- ✅ Order management system
- ✅ Product ratings & reviews
- ✅ POS (Point of Sale) system
- ✅ Admin dashboard (extensible)
- ✅ Responsive design for all devices
- ✅ Professional UI/UX with custom fonts

**Status:** ✅ Production Ready

---

## 🏗️ Architecture

```
5SCENT/
├── backend/                         # Laravel 12 API
│   └── laravel-5scent/
│       ├── app/Http/Controllers/   # 7 API controllers
│       ├── app/Models/             # 13 database models
│       ├── routes/api.php           # 30+ endpoints
│       └── database/
│
├── frontend/                         # Next.js 16 Frontend
│   └── web-5scent/
│       ├── app/
│       ├── components/              # 7 React components
│       ├── lib/
│       └── public/
│           ├── images/              # Carousel images
│           └── product_images/      # Product images
│
└── Documentation files
```

### **Backend Stack**
- **Framework:** Laravel 12.39.0
- **Language:** PHP 8.3.26
- **Database:** MySQL 8.0.37
- **Authentication:** Laravel Sanctum (stateless, token-based)
- **API:** REST with 30+ endpoints

### **Frontend Stack**
- **Framework:** Next.js 16 (Turbopack)
- **Language:** TypeScript 5.0
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios 1.6
- **State Management:** Zustand 4.4
- **Fonts:** Poppins (headings, bold, letter-spaced), SF Pro (body text)
- **Forms:** React Hook Form 7.0
- **Date Handling:** date-fns 3.0
- **Animations:** Framer Motion 10.0

---

## 📋 Quick Start Guide

### Prerequisites
- **Node.js 18+** (for frontend)
- **PHP 8.3+** (for backend)  
- **Composer** (for Laravel dependencies)
- **MySQL 8.0+** (database server)

### 1️⃣ Backend Setup (Laravel)

### Step 1: Backend Setup

```powershell
# Navigate to root and create Laravel project
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT"
cd backend

# Create Laravel 12 project
composer create-project laravel/laravel laravel-5scent
cd laravel-5scent

# Generate application key
### 1️⃣ Backend Setup (Laravel)

```bash
# Navigate to backend folder
cd backend/laravel-5scent

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env file:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=db_5scent
# DB_USERNAME=root
# DB_PASSWORD=

# Run database migrations
php artisan migrate

# (Optional) Seed sample data
php artisan db:seed

# Start development server
php artisan serve
```

**Backend runs on:** `http://localhost:8000`

---

### 2️⃣ Frontend Setup (Next.js)

```bash
# Navigate to frontend folder
cd frontend/web-5scent

# Install dependencies
npm install

# Create .env.local file with:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_key_here

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

---

### 3️⃣ Access the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## 📁 Complete Project Structure

### Backend Files (`backend/laravel-5scent/`)

```
app/
├── Http/
│   ├── Controllers/              # 7 REST API controllers
│   │   ├── AuthController.php
│   │   ├── ProductController.php
│   │   ├── OrderController.php
│   │   ├── CartController.php
│   │   ├── FavoriteController.php
│   │   ├── RatingController.php
│   │   └── POSController.php
│   └── Middleware/
│       └── IsAdmin.php
│
├── Models/                        # 13 Eloquent models
│   ├── User.php, Product.php, Order.php, OrderDetail.php
│   ├── Cart.php, Wishlist.php, Rating.php, Payment.php
│   ├── Notification.php, POSTransaction.php, POSItem.php
│   ├── Admin.php, ProductImage.php

routes/
├── api.php                        # 30+ API endpoints
├── web.php
└── console.php

database/
├── migrations/                    # Database schema (25 tables)
├── factories/
└── seeders/

storage/
└── logs/                          # Check laravel.log for errors

public/
└── index.php                      # API entry point
```

### Frontend Files (`frontend/web-5scent/`)

```
app/
├── layout.tsx                     # Root layout
├── page.tsx                       # Homepage
└── globals.css                    # Global styles

components/                        # 7 React components
├── Header.tsx                     # Navigation
├── HeroCarousel.tsx               # Carousel
├── SearchBar.tsx                  # Search
├── ProductCard.tsx                # Product display
├── BestSellers.tsx                # Best sellers section
├── Features.tsx                   # Features
└── Footer.tsx                     # Footer

lib/
├── api/client.ts                  # Axios configuration
└── store/cartStore.ts             # Zustand store

public/
├── images/                        # Hero carousel images (5 files)
└── product_images/                # Product images (10 files)

Config Files:
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── tailwind.config.ts             # Tailwind config
├── next.config.ts                 # Next.js config
├── postcss.config.js              # PostCSS config
└── .env.local                     # API settings
```

---

## 🔌 API Endpoints (30+)

### Authentication (5 endpoints)
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout (requires token)
GET    /api/auth/user            # Get current user (requires token)
GET    /api/auth/profile         # Get user profile (requires token)
```

### Products (6 endpoints)
```
GET    /api/products             # List products (with filters)
GET    /api/products/{id}        # Get product detail
GET    /api/products/bestsellers/list  # Get top products
POST   /api/products             # Create (admin)
PUT    /api/products/{id}        # Update (admin)
DELETE /api/products/{id}        # Delete (admin)
```

### Shopping Cart (5 endpoints)
```
GET    /api/cart                 # Get cart
POST   /api/cart                 # Add to cart
PUT    /api/cart/{id}            # Update quantity
DELETE /api/cart/{id}            # Remove item
DELETE /api/cart/clear           # Clear cart
```

### Orders (7 endpoints)
```
POST   /api/orders               # Create order
GET    /api/orders               # List user's orders
GET    /api/orders/{id}          # Get order detail
PUT    /api/orders/{id}/cancel   # Cancel order
PUT    /api/orders/{id}/status   # Update status (admin)
PUT    /api/orders/{id}/delivered # Mark delivered
POST   /api/orders/{id}/tracking  # Add tracking
```

### Wishlist (3 endpoints)
```
GET    /api/wishlist             # Get wishlist
POST   /api/wishlist/{id}/toggle # Toggle item
GET    /api/wishlist/{id}/check  # Check if wishlisted
```

### Ratings (4 endpoints)
```
POST   /api/ratings              # Create rating
GET    /api/products/{id}/ratings # Get product ratings
GET    /api/ratings/user         # Get user's ratings
DELETE /api/ratings/{id}         # Delete rating
```

### POS (5 endpoints)
```
POST   /api/pos/transactions     # Create transaction
GET    /api/pos/transactions     # List transactions
GET    /api/pos/transactions/{id} # Get detail
GET    /api/pos/receipt/{id}     # Get receipt
GET    /api/pos/report/daily     # Daily report
```

---

## 🗄️ Database Schema
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000

MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=noreply@5scent.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key
```

## Development Workflow

### Terminal 1: Backend
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"
php artisan serve
```

### Terminal 2: Frontend
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/api

## Database Setup

### Create Database
```powershell
# Via Laragon or MySQL CLI
mysql -u root -p
CREATE DATABASE 5scent CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Run Migrations
```powershell
cd backend/laravel-5scent
php artisan migrate
```

### Seed Sample Data (Optional)
```powershell
php artisan db:seed
# Or manually use tinker to create sample products
php artisan tinker
# Then:
# User::factory(5)->create();
# Product::factory(20)->create();
```

## Testing

### Backend
```powershell
cd backend/laravel-5scent
php artisan test
```

### Frontend
```powershell
cd frontend/web-5scent
npm test
```

## Deployment Notes

- Backend: Deploy to a PHP 8.2+ hosting with Laravel support (Forge, Hetzner, etc.)
- Frontend: Deploy to Vercel, Netlify, or any static host
- Ensure environment variables are properly set in production
- Update CORS_ALLOWED_ORIGINS in .env
- Enable HTTPS
- Configure Midtrans production credentials

## Additional Resources

- [Laravel 12 Documentation](https://laravel.com/docs/12.x)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Midtrans Documentation](https://docs.midtrans.com)

## Support & Contact

For issues, please create a GitHub issue or contact the development team.

---

**Last Updated:** November 2025
**Project Status:** In Development
