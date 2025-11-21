# Complete 5SCENT Installation Guide for Windows

This guide walks through setting up the entire 5SCENT monorepo on Windows from scratch.

## Prerequisites Check

Before starting, ensure you have:
- PHP 8.2+ (install via Laragon)
- Composer (auto-installed with Laragon)
- Node.js 18+ (from nodejs.org)
- MySQL/MariaDB (auto-included in Laragon)
- Git (optional, for version control)
- A code editor (VS Code recommended)

## Quick Start (Copy & Paste)

### Part 1: Backend (Laravel) Setup

**Open PowerShell and run these commands in order:**

```powershell
# Navigate to root directory
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"

# Create Laravel project
composer create-project laravel/laravel laravel-5scent

cd laravel-5scent

# Generate app key
php artisan key:generate

# Install Sanctum for authentication
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Install development tools
composer require --dev laravel/pint beyondcode/laravel-dump-server laravel/collision

# Optional: Excel & PDF export
composer require maatwebsite/excel barryvdh/laravel-dompdf

# Start Laravel development server (run in Terminal 1)
php artisan serve
```

**Expected Output:**
```
   INFO  Server running on http://127.0.0.1:8000
```

Server will be available at: **http://localhost:8000**

---

### Part 2: Configure Laravel .env

**In the same PowerShell terminal (or new window):**

1. Open `backend/laravel-5scent/.env` in your editor
2. Update these lines:

```env
APP_NAME=5SCENT
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=5scent
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000

MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
MIDTRANS_IS_PRODUCTION=false

MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@5scent.com
MAIL_FROM_NAME=5SCENT
```

3. Save the file

---

### Part 3: Database Already Exists ✅

**Your database `db_5scent` is already created with all tables!**

Simply ensure your .env is configured correctly (see Part 2 above).

Database connection details:
- **Database Name:** db_5scent
- **Host:** 127.0.0.1
- **Port:** 3306
- **Username:** root
- **Password:** (empty by default)

**Update your .env if needed:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_5scent
DB_USERNAME=root
DB_PASSWORD=
```

---

### Part 4: Database Tables Already Exist ✅

**Your database `db_5scent` already has all 25 tables created!**

No migrations needed. Your tables are:
- ✅ admin
- ✅ cache, cache_locks
- ✅ cart
- ✅ failed_jobs, jobs, job_batches
- ✅ migrations
- ✅ notification
- ✅ orderdetail, orders
- ✅ password_reset
- ✅ payment
- ✅ personal_access_tokens
- ✅ pos_item, pos_transaction
- ✅ product, productimage
- ✅ rating
- ✅ sessions
- ✅ user
- ✅ wishlist

**You can directly start building your Laravel API!**

If you need to verify the database connection works:

```powershell
php artisan tinker
>>> DB::connection()->getPDO();
# Should show connection info without errors
>>> exit
```

---

### Part 5: Frontend (Next.js) Setup

**Open a NEW PowerShell terminal:**

```powershell
# Navigate to frontend folder
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend"

# Create Next.js project
npx create-next-app@latest web-5scent `
  --typescript `
  --tailwind `
  --eslint `
  --app `
  --no-git `
  --no-src-dir `
  --import-alias '@/*'

cd web-5scent

# Install additional dependencies
npm install axios framer-motion @headlessui/react @heroicons/react lucide-react zustand react-hook-form date-fns

# Start Next.js development server
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 16.x
  - Local:        http://localhost:3000
```

Server will be available at: **http://localhost:3000**

---

### Part 6: Configure Next.js .env.local

**Create `frontend/web-5scent/.env.local` file:**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key_here
```

---

## Verify Everything Works

### Check Backend
1. Open browser: http://localhost:8000
2. You should see the Laravel welcome page
3. Check API: http://localhost:8000/api (might show 404, that's OK)

### Check Frontend
1. Open browser: http://localhost:3000
2. You should see the Next.js welcome page

### Check Database Connection
**In PowerShell (backend folder):**

```powershell
php artisan tinker
>>> DB::connection()->getPDO();
# Should show connection info without errors
>>> exit
```

---

## Database Tables Already Ready ✅

Your database `db_5scent` is fully set up with all 25 tables and relationships!

No additional setup needed for the database. You can proceed directly to:
1. Setting up your Laravel models
2. Creating controllers
3. Building the API routes

---

## Create Models & Controllers

**Run these commands in `backend/laravel-5scent`:**

```powershell
# Create Models
php artisan make:model Product -m
php artisan make:model ProductVariant -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
php artisan make:model Rating -m
php artisan make:model Favorite -m
php artisan make:model POSTransaction -m

# Create Controllers
php artisan make:controller AuthController
php artisan make:controller ProductController --resource
php artisan make:controller OrderController --resource
php artisan make:controller RatingController
php artisan make:controller FavoriteController
php artisan make:controller PaymentController
php artisan make:controller POSController

# Create Form Requests
php artisan make:request StoreProductRequest
php artisan make:request UpdateProductRequest
php artisan make:request StoreOrderRequest

# Create Resource classes
php artisan make:resource ProductResource
php artisan make:resource OrderResource
php artisan make:resource RatingResource
```

**Then paste the code from CONTROLLERS_ROUTES.md into the generated files.**

---

## Create Frontend Components & Pages

**Inside `frontend/web-5scent`, create these directories:**

```powershell
# Run from frontend/web-5scent folder
mkdir -p components/Admin, lib/api, lib/hooks, lib/store, lib/types, lib/utils

# Copy code from COMPONENTS_PAGES.md into respective files
```

**File structure:**
```
components/
  ├── Header.tsx
  ├── Footer.tsx
  ├── ProductCard.tsx
  └── Admin/

lib/
  ├── api/
  │   ├── client.ts
  │   ├── auth.ts
  │   ├── products.ts
  │   └── orders.ts
  ├── hooks/
  │   ├── useAuth.ts
  │   └── useCart.ts
  ├── store/
  │   └── cartStore.ts
  ├── types/
  │   └── index.ts
  └── utils/
```

---

## Running Both Servers

**Terminal 1 (Backend - Laravel):**
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"
php artisan serve
# Runs on http://localhost:8000
```

**Terminal 2 (Frontend - Next.js):**
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm run dev
# Runs on http://localhost:3000
```

Keep both terminals open during development!

---

## Testing the Connection

### Test API from Frontend

**Create a test file: `frontend/web-5scent/lib/api/test.ts`**

```typescript
import client from './client';

export async function testAPI() {
  try {
    const response = await client.get('/products');
    console.log('API Connection successful!', response.data);
    return true;
  } catch (error) {
    console.error('API Connection failed!', error);
    return false;
  }
}
```

**Use in a component:**
```typescript
import { testAPI } from '@/lib/api/test';

useEffect(() => {
  testAPI();
}, []);
```

---

## Common Issues & Solutions

### Issue: "Connection refused" when accessing database
**Solution:** 
- Start Laragon
- Check MySQL is running (green dot)
- Verify DB_HOST and credentials in .env

### Issue: CORS errors in browser console
**Solution:**
- Verify CORS_ALLOWED_ORIGINS in backend .env
- Verify NEXT_PUBLIC_API_BASE_URL in frontend .env.local
- Restart both servers

### Issue: npm packages not installing
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Issue: PHP version mismatch
**Solution:**
- Ensure PHP 8.2+ is active in Laragon
- Check: `php -v` in PowerShell

### Issue: "Class not found" errors in Laravel
**Solution:**
```powershell
php artisan cache:clear
php artisan config:clear
composer dump-autoload
```

---

## Next Development Steps

1. **Create all models** from MODELS_MIGRATIONS.md
2. **Create all controllers** from CONTROLLERS_ROUTES.md
3. **Set up API routes** in `routes/api.php`
4. **Create frontend pages** from COMPONENTS_PAGES.md
5. **Test API endpoints** using Postman or browser
6. **Implement authentication** (Login/Register)
7. **Build product pages** (Listing, Detail)
8. **Create cart system**
9. **Implement checkout**
10. **Add payment integration** (Midtrans)

---

## Useful Commands Reference

### Backend (Laravel)

```powershell
# Development
php artisan serve                          # Start dev server
php artisan tinker                         # Interactive shell
php artisan route:list                     # View all routes

# Database
php artisan migrate                        # Run migrations
php artisan migrate:fresh                  # Reset & migrate (destructive)
php artisan migrate:rollback               # Undo last migration
php artisan db:seed                        # Run seeders

# Code Quality
./vendor/bin/pint                          # Format code
php artisan test                           # Run tests

# Cache
php artisan cache:clear                    # Clear all caches
php artisan config:clear                   # Clear config cache
php artisan view:clear                     # Clear view cache
```

### Frontend (Next.js)

```powershell
npm run dev                                # Development server
npm run build                              # Build for production
npm start                                  # Start production server
npm run lint                               # Run ESLint
npm test                                   # Run tests
npm install [package-name]                 # Install package
npm uninstall [package-name]               # Remove package
```

---

## Database Backup & Restore

### Backup
```powershell
mysqldump -u root 5scent > backup.sql
```

### Restore
```powershell
mysql -u root 5scent < backup.sql
```

---

## Deployment Checklist

- [ ] All migrations run successfully
- [ ] API endpoints tested (Postman)
- [ ] Frontend connects to backend
- [ ] Authentication working
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] Database backups created
- [ ] All sensitive keys in .env (not committed)
- [ ] Tests pass
- [ ] Code formatted and linted

---

## Support Resources

- **Laravel Docs:** https://laravel.com/docs/12.x
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Laravel Sanctum:** https://laravel.com/docs/12.x/sanctum
- **Midtrans:** https://docs.midtrans.com

---

**Setup Complete! 🎉**

You now have a fully configured Laravel + Next.js monorepo ready for development!
