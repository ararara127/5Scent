# ⚡ Quick Setup Guide - Database Already Exists

**Your database `db_5scent` with 25 tables is already created!**

This is a streamlined setup guide focusing only on what you need to do.

---

## ✅ What You Already Have

```
Database: db_5scent
Tables: 25 total
├── Users & Auth (user, admin, sessions, personal_access_tokens)
├── Products (product, productimage)
├── Shopping (cart, wishlist)
├── Orders (orders, orderdetail, notification)
├── Payments (payment)
├── Ratings (rating)
├── POS (pos_transaction, pos_item)
├── System (migrations, jobs, cache, failed_jobs)
└── ...and more!
```

---

## 🚀 What You Need to Do Now

### Step 1: Create Laravel Project (15 minutes)

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"

composer create-project laravel/laravel laravel-5scent

cd laravel-5scent

php artisan key:generate

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

composer require --dev laravel/pint beyondcode/laravel-dump-server laravel/collision
```

---

### Step 2: Configure .env (5 minutes)

**Edit `backend/laravel-5scent/.env`:**

```env
APP_NAME=5SCENT
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_5scent
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000

MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false

MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@5scent.com
MAIL_FROM_NAME=5SCENT
```

---

### Step 3: Test Database Connection (2 minutes)

```powershell
cd backend/laravel-5scent

php artisan tinker
>>> DB::connection()->getPDO();
# Should work without errors!
>>> exit
```

---

### Step 4: Create Models (matching your tables)

```powershell
# Models (without migrations, since tables exist)
php artisan make:model User
php artisan make:model Admin
php artisan make:model Product
php artisan make:model ProductImage
php artisan make:model Cart
php artisan make:model Wishlist
php artisan make:model Order
php artisan make:model OrderDetail
php artisan make:model Rating
php artisan make:model Payment
php artisan make:model Notification
php artisan make:model POSTransaction
php artisan make:model POSItem
```

**Then add relationships to each model in `app/Models/`**

---

### Step 5: Create Controllers

```powershell
php artisan make:controller AuthController
php artisan make:controller ProductController --resource
php artisan make:controller OrderController --resource
php artisan make:controller CartController --resource
php artisan make:controller RatingController
php artisan make:controller PaymentController
php artisan make:controller POSController
php artisan make:controller AdminController
```

**Then add methods from CONTROLLERS_ROUTES.md**

---

### Step 6: Set Up API Routes

**Edit `routes/api.php`:**

Copy the route definitions from `CONTROLLERS_ROUTES.md`

---

### Step 7: Start Backend Server

```powershell
# Terminal 1
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"
php artisan serve
```

**Should see:**
```
   INFO  Server running on http://127.0.0.1:8000
```

---

### Step 8: Create Next.js Frontend (20 minutes)

**Terminal 2 (NEW):**

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend"

npx create-next-app@latest web-5scent `
  --typescript `
  --tailwind `
  --eslint `
  --app `
  --no-git `
  --no-src-dir `
  --import-alias '@/*'

cd web-5scent

npm install axios framer-motion @headlessui/react @heroicons/react lucide-react zustand react-hook-form date-fns

npm run dev
```

**Should see:**
```
  ▲ Next.js 16.x
  - Local:        http://localhost:3000
```

---

### Step 9: Configure Frontend .env.local

**Create `frontend/web-5scent/.env.local`:**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key
```

---

## 🎯 Development Flow

### Both Servers Running

```
Terminal 1: php artisan serve (Backend on :8000)
Terminal 2: npm run dev (Frontend on :3000)
```

### What to Build Next

1. **Create Models** with relationships
   - Use `MODELS_MIGRATIONS.md` as reference for table structure
   - Add relationships between models

2. **Build Controllers** with API methods
   - Use `CONTROLLERS_ROUTES.md` for controller logic
   - Test each endpoint with Postman

3. **Build Frontend Pages** with React
   - Use `COMPONENTS_PAGES.md` for page examples
   - Connect to backend API

4. **Test API Integration**
   - Frontend calls backend
   - Data flows correctly
   - CORS working properly

---

## 📋 Your Database Tables

```
✅ admin (6 rows)
✅ cache (0 rows)
✅ cache_locks (0 rows)
✅ cart (5 rows)
✅ failed_jobs (0 rows)
✅ jobs (0 rows)
✅ job_batches (0 rows)
✅ migrations (9 rows)
✅ notification (2 rows)
✅ orderdetail (5 rows)
✅ orders (5 rows)
✅ password_reset (0 rows)
✅ payment (5 rows)
✅ personal_access_tokens (17 rows)
✅ pos_item (5 rows)
✅ pos_transaction (5 rows)
✅ product (6 rows)
✅ productimage (21 rows)
✅ rating (0 rows)
✅ sessions (2 rows)
✅ user (0 rows)
✅ wishlist (6 rows)
```

---

## 🔧 Useful Commands

```powershell
# Backend
php artisan serve                  # Start server
php artisan tinker                 # Test code
php artisan make:model User        # Create model
php artisan route:list             # View routes
php artisan cache:clear            # Clear cache

# Frontend
npm run dev                        # Dev server
npm install package               # Install package
npm run build                      # Build for prod
```

---

## ✨ You're Ready!

**Your database is done. Just build the Laravel API and Next.js frontend!**

Follow these steps and you'll be coding in 1-2 hours.

---

**Questions?** Check:
- `CONTROLLERS_ROUTES.md` - Controller code
- `MODELS_MIGRATIONS.md` - Model structure
- `COMPONENTS_PAGES.md` - Frontend examples
- `API_DOCUMENTATION.md` - Endpoint reference
