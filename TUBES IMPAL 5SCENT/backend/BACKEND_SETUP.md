# Backend (Laravel 12) Setup Guide

## Prerequisites
- PHP 8.2+
- Composer
- MySQL/MariaDB (via Laragon)

## Installation Steps

### 1. Create Laravel 12 Project

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"
composer create-project laravel/laravel laravel-5scent
cd laravel-5scent
```

### 2. Generate Application Key

```powershell
php artisan key:generate
```

### 3. Install Laravel Sanctum

```powershell
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 4. Additional Recommended Packages

```powershell
# Development/debugging tools
composer require --dev laravel/pint laravel/sail beyondcode/laravel-dump-server laravel/collision

# Faker for seeding
composer require fakerphp/faker --dev

# Optional: Excel export
composer require maatwebsite/excel

# Optional: PDF export
composer require barryvdh/laravel-dompdf
```

### 5. Configure .env File

Create `.env` from `.env.example`:

```powershell
cp .env.example .env
```

Edit `.env` with your database credentials:

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

### 6. Create Database

Using MySQL CLI or Laragon interface:

```powershell
mysql -u root -p
CREATE DATABASE 5scent CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 7. Run Migrations

```powershell
php artisan migrate
```

### 8. Configure Sanctum (API Auth)

Edit `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000')),

'cors' => [
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', '*')),
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
],
```

### 9. Configure CORS (if needed separately)

Edit `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')),
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

### 10. Start Development Server

```powershell
php artisan serve
# Server runs on http://localhost:8000
```

## Project Structure

```
laravel-5scent/
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── ProductVariant.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── Rating.php
│   │   ├── Favorite.php
│   │   └── POSTransaction.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ProductController.php
│   │   │   ├── OrderController.php
│   │   │   ├── RatingController.php
│   │   │   ├── FavoriteController.php
│   │   │   ├── PaymentController.php
│   │   │   └── POSController.php
│   │   ├── Requests/ (Form validation)
│   │   └── Resources/ (API response formatting)
│   └── Services/
│       ├── PaymentService.php
│       └── OrderService.php
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   ├── create_products_table.php
│   │   ├── create_product_variants_table.php
│   │   ├── create_orders_table.php
│   │   ├── create_order_items_table.php
│   │   ├── create_ratings_table.php
│   │   ├── create_favorites_table.php
│   │   └── create_pos_transactions_table.php
│   ├── factories/
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   ├── api.php (API routes)
│   └── web.php (if needed for admin)
└── .env
```

## API Endpoints Summary

See main README.md for complete API documentation.

## Common Commands

```powershell
# Create migration
php artisan make:migration create_table_name

# Create model with migration
php artisan make:model ModelName -m

# Create controller
php artisan make:controller ControllerName

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migration (destructive)
php artisan migrate:fresh

# Seed database
php artisan db:seed

# Interactive Tinker shell
php artisan tinker

# Check routes
php artisan route:list

# Format code with Pint
./vendor/bin/pint

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

## Next Steps

1. Create models and migrations (see Models section)
2. Create controllers and routes (see API Routes section)
3. Set up authentication endpoints
4. Implement payment integration with Midtrans
5. Create seeders for sample data
