# 🚀 Getting Started with 5SCENT

**Get the project running in 5 minutes!**

---

## 📋 Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **PHP** v8.2 or higher
- **Composer** ([Download](https://getcomposer.org/))
- **MySQL** v8.0 or higher
- **Git**

Check installations:
```bash
node --version
npm --version
php --version
composer --version
mysql --version
```

---

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd 5SCENT
```

### 2️⃣ Setup Backend

```bash
cd backend/laravel-5scent

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database (open .env and update):
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=db_5scent
# DB_USERNAME=root
# DB_PASSWORD=

# Create database
mysql -u root -p -e "CREATE DATABASE db_5scent;"

# Run migrations
php artisan migrate

# Start Laravel server (keep this terminal open)
php artisan serve
```

The backend will be running at: **http://localhost:8000**

### 3️⃣ Setup Frontend (Open New Terminal)

```bash
cd frontend/web-5scent

# Install dependencies
npm install --legacy-peer-deps

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be running at: **http://localhost:3000**

### 4️⃣ Done! 🎉

Open http://localhost:3000 in your browser and you'll see the 5SCENT homepage!

---

## 🛠️ Troubleshooting

### Node.js Not Found
```bash
# Add Node.js to PATH (Windows)
$env:Path += ";C:\nodejs"

# Then restart terminal and try again
node --version
```

### Port 8000 Already in Use (Laravel)
```bash
# Use a different port
php artisan serve --port=8001
# Update frontend .env.local to use http://localhost:8001/api
```

### Port 3000 Already in Use (Next.js)
```bash
# Use a different port
npm run dev -- -p 3001
```

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Verify .env settings match your database
# Check DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD
```

### npm Install Fails
```bash
# Clear npm cache
npm cache clean --force

# Try installing with legacy peer deps flag
npm install --legacy-peer-deps

# If still failing, delete node_modules and try again
rm -r node_modules
npm install --legacy-peer-deps
```

### Composer Install Fails
```bash
# Update composer
composer self-update

# Clear composer cache
composer clearcache

# Try install again
composer install
```

---

## 📁 Project Structure

```
5SCENT/
├── backend/laravel-5scent/     ← API Server (Port 8000)
│   ├── app/Http/Controllers/   ← API endpoints
│   ├── app/Models/             ← Database models
│   ├── database/migrations/    ← Database schema
│   ├── routes/api.php          ← API routes
│   └── .env                    ← Backend config (create from .env.example)
│
├── frontend/web-5scent/        ← Next.js App (Port 3000)
│   ├── app/                    ← Next.js pages
│   ├── components/             ← React components
│   ├── public/                 ← Images and assets
│   └── .env.local              ← Frontend config (create from .env.example)
│
└── Documentation/              ← Setup guides
```

---

## 🔑 Key Commands

### Backend
```bash
# Start server
php artisan serve

# Create migration
php artisan make:migration create_table_name

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Database seeding
php artisan db:seed

# Cache config (production)
php artisan config:cache
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run linter
npm run lint

# Format code
npm run format
```

---

## 📖 More Information

- **Full Setup Guide:** See `INSTALLATION_GUIDE.md`
- **API Documentation:** See `API_DOCUMENTATION.md`
- **Architecture:** See `ARCHITECTURE_OVERVIEW.md`
- **Deployment:** See `DEPLOYMENT_GUIDE.md`

---

## 🚨 Common Issues Checklist

- [ ] Node.js installed (v18+)
- [ ] PHP installed (v8.2+)
- [ ] Composer installed
- [ ] MySQL running
- [ ] Database created (`db_5scent`)
- [ ] Backend .env configured
- [ ] Frontend .env.local configured
- [ ] `php artisan migrate` completed
- [ ] Both servers running on correct ports
- [ ] API_BASE_URL in frontend matches backend port

---

## 💬 Need Help?

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Verify all prerequisites are installed**
3. **Check both terminal windows for error messages**
4. **Ensure database is created and migrations ran**
5. **Check .env files are properly configured**

---

**Happy coding!** 🎉

Next steps:
- Read `API_DOCUMENTATION.md` for API endpoints
- Check `ARCHITECTURE_OVERVIEW.md` for project structure
- Review component documentation in `frontend/COMPONENTS_PAGES.md`
