# Quick Commands Reference - Copy & Paste Ready

## Initial Setup (One Time)

### Terminal 1: Backend Setup (Laravel)

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"
composer create-project laravel/laravel laravel-5scent
cd laravel-5scent
php artisan key:generate
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
composer require --dev laravel/pint beyondcode/laravel-dump-server laravel/collision
composer require maatwebsite/excel barryvdh/laravel-dompdf
```

**Then create database using HeidiSQL or:**
```powershell
mysql -u root
CREATE DATABASE 5scent CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**Update .env file with database credentials, then:**
```powershell
php artisan migrate
php artisan serve
```

---

### Terminal 2: Frontend Setup (Next.js)

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

---

## Database Setup Commands

```powershell
# Run from backend/laravel-5scent folder

# Create all models with migrations
php artisan make:model Product -m
php artisan make:model ProductVariant -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
php artisan make:model Rating -m
php artisan make:model Favorite -m
php artisan make:model POSTransaction -m

# Create all controllers
php artisan make:controller AuthController
php artisan make:controller ProductController --resource
php artisan make:controller OrderController --resource
php artisan make:controller RatingController
php artisan make:controller FavoriteController
php artisan make:controller PaymentController
php artisan make:controller POSController

# Create Request/Resource classes
php artisan make:request StoreProductRequest
php artisan make:request UpdateProductRequest
php artisan make:request StoreOrderRequest
php artisan make:request UpdateOrderRequest
php artisan make:request StoreRatingRequest
php artisan make:resource ProductResource
php artisan make:resource OrderResource
php artisan make:resource RatingResource

# Run migrations
php artisan migrate
```

---

## Development Servers (Daily Use)

### Start Backend (Terminal 1)
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"
php artisan serve
# Accessible at: http://localhost:8000
```

### Start Frontend (Terminal 2)
```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm run dev
# Accessible at: http://localhost:3000
```

**Keep both running while developing!**

---

## Laravel Common Commands

```powershell
# Database
php artisan migrate                    # Run migrations
php artisan migrate:fresh              # Reset DB (DESTRUCTIVE!)
php artisan migrate:rollback           # Undo last migration
php artisan db:seed                    # Run seeders

# Development
php artisan tinker                     # Interactive shell
php artisan route:list                 # Show all routes
php artisan cache:clear                # Clear caches
php artisan config:clear               # Clear config cache
php artisan view:clear                 # Clear view cache

# Code Quality
./vendor/bin/pint                      # Format code
php artisan test                       # Run tests

# Models/Controllers
php artisan make:model ModelName -m    # Create model with migration
php artisan make:controller CtrlName   # Create controller
php artisan make:request RequestName   # Create form request
php artisan make:middleware MiddleName # Create middleware
```

---

## Next.js Common Commands

```powershell
npm run dev                             # Start development server
npm run build                           # Build for production
npm start                               # Start production server
npm run lint                            # Run ESLint
npm test                                # Run tests
npm install [package]                   # Install a package
npm uninstall [package]                 # Remove a package
npm list                                # List installed packages
npm update                              # Update all packages
```

---

## Database Management

```powershell
# Backup database
mysqldump -u root 5scent > backup.sql

# Restore database
mysql -u root 5scent < backup.sql

# Connect to MySQL CLI
mysql -u root -p 5scent

# In MySQL CLI:
SHOW DATABASES;
USE 5scent;
SHOW TABLES;
SELECT * FROM products;
DESC users;
EXIT;
```

---

## Git Commands (If Using Version Control)

```powershell
# Initialize
git init
git add .
git commit -m "Initial commit"

# Daily workflow
git status                              # Check changes
git add .                               # Stage all changes
git commit -m "Your message"            # Commit changes
git push                                # Push to remote
git pull                                # Pull latest changes

# Branches
git branch                              # List branches
git checkout -b feature-name            # Create new branch
git checkout main                       # Switch branch
git merge feature-name                  # Merge branch
```

---

## Testing API Endpoints with curl

```powershell
# Register user
curl -X POST http://localhost:8000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"John","email":"john@example.com","password":"password123","password_confirmation":"password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"john@example.com","password":"password123"}'

# Get current user (replace TOKEN)
curl -X GET http://localhost:8000/api/auth/user `
  -H "Authorization: Bearer TOKEN"

# Get products
curl -X GET "http://localhost:8000/api/products?category=female&time_type=day"

# Create order (replace TOKEN)
curl -X POST http://localhost:8000/api/orders `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer TOKEN" `
  -d '{"shipping_address":"123 Main St","payment_method":"QRIS","items":[{"variant_id":1,"quantity":2}]}'
```

---

## Composer Package Management

```powershell
# Install dependencies
composer install

# Update dependencies
composer update

# Require a package
composer require vendor/package

# Remove a package
composer remove vendor/package

# Show installed packages
composer show

# Update autoloader
composer dump-autoload

# Check for security updates
composer audit
```

---

## File Structure Quick Create

```powershell
# From backend/laravel-5scent
mkdir -p app/Services
mkdir -p app/Http/Resources
mkdir -p app/Http/Requests

# From frontend/web-5scent
mkdir -p components/Admin
mkdir -p components/UI
mkdir -p lib/api
mkdir -p lib/hooks
mkdir -p lib/store
mkdir -p lib/types
mkdir -p lib/utils
mkdir -p public/images
```

---

## Environment Configuration

```powershell
# Copy example to actual .env
# Backend
cd backend/laravel-5scent
cp .env.example .env

# Frontend
cd frontend/web-5scent
New-Item .env.local -type file
# Then edit with your values
```

---

## Clearing/Resetting During Development

```powershell
# Clear everything (backend)
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
composer dump-autoload

# Reset database (DESTRUCTIVE!)
php artisan migrate:fresh

# Clear everything (frontend)
rm -r node_modules
rm package-lock.json
npm install

# Hard reset Git (if needed)
git reset --hard
git clean -fd
```

---

## Quick Issue Fixes

```powershell
# "Class not found" errors
php artisan cache:clear
composer dump-autoload

# Database connection issues
# 1. Check .env DB_* variables
# 2. Make sure MySQL is running
# 3. Run: php artisan migrate

# CORS errors
# 1. Check CORS_ALLOWED_ORIGINS in .env
# 2. Check SANCTUM_STATEFUL_DOMAINS in .env
# 3. Restart servers

# npm issues
npm cache clean --force
rm -r node_modules
npm install

# Permission errors
# In PowerShell (may need admin):
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Production Deployment Commands

```powershell
# Backend
cd backend/laravel-5scent
composer install --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Frontend
cd frontend/web-5scent
npm run build
npm start
```

---

## Monitoring & Debugging

### Backend Logs
```powershell
# Real-time logs
tail -f storage/logs/laravel.log

# View recent logs
cat storage/logs/laravel.log | tail -20
```

### Frontend Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for errors and API calls in Network tab

### Database Debugging
```powershell
# Enable query logging in .env
APP_DEBUG=true

# In code:
DB::enableQueryLog();
// ... your code ...
dd(DB::getQueryLog());
```

---

## Useful Links

| Resource | URL |
|----------|-----|
| Laravel Docs | https://laravel.com/docs/12.x |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Sanctum | https://laravel.com/docs/12.x/sanctum |
| Axios | https://axios-http.com |
| Midtrans | https://docs.midtrans.com |
| Headless UI | https://headlessui.com |
| Heroicons | https://heroicons.com |

---

## Keyboard Shortcuts

### PowerShell
- `Ctrl + C` - Stop running process
- `Ctrl + L` - Clear screen
- `Up/Down Arrow` - Previous/next command
- `Tab` - Auto-complete

### VS Code
- `Ctrl + ~` - Open terminal
- `Ctrl + P` - Quick file open
- `Ctrl + K, Ctrl + S` - Keyboard shortcuts
- `F5` - Debug

### Browser DevTools
- `F12` - Open DevTools
- `Ctrl + Shift + J` - Open Console
- `Ctrl + Shift + I` - Open Inspector
- `Ctrl + Shift + E` - Open Elements

---

## Performance Checking

```powershell
# Check server response time
curl -o /dev/null -s -w "%{time_total}" http://localhost:8000/api/products

# Check Node process size
Get-Process node | Select-Object ProcessName, WorkingSet

# Check PHP process
Get-Process php | Select-Object ProcessName, WorkingSet

# Monitor real-time
# Terminal: Ctrl + Shift + Esc (Task Manager)
```

---

**Pro Tip:** Create batch files for common commands

Create `run-backend.bat`:
```batch
@echo off
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"
php artisan serve
```

Create `run-frontend.bat`:
```batch
@echo off
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm run dev
```

Double-click to start servers instantly!

---

**Last Updated:** November 2025
