# 🚀 DEPLOYMENT & REPOSITORY SETUP GUIDE

Complete instructions for pushing to repository and deploying the 5SCENT project.

---

## 📦 Preparing for Repository

### Step 1: Create `.gitignore` Files

Make sure these files exist and are properly configured:

**Root `.gitignore`:**
```bash
node_modules/
.env
.env.local
dist/
build/
.DS_Store
*.log
.idea/
.vscode/
storage/logs/
```

**Backend `backend/laravel-5scent/.gitignore`:**
```bash
/vendor/
node_modules/
npm-debug.log
yarn-error.log
.env
.env.local
.env.*.local
storage/
bootstrap/cache/
.idea/
.vscode/
*.swp
*.swo
*~
```

**Frontend `frontend/web-5scent/.gitignore`:**
```bash
node_modules/
.next/
.env.local
.env.*.local
dist/
build/
*.log
.idea/
.vscode/
.DS_Store
```

### Step 2: Remove Sensitive Data

Before pushing to repository, remove:
```bash
# Remove node_modules (will be installed via npm install)
rm -rf frontend/web-5scent/node_modules
rm -rf frontend/web-5scent/.next

# Remove vendor (will be installed via composer install)
rm -rf backend/laravel-5scent/vendor

# Remove .env files (developers will create their own)
rm backend/laravel-5scent/.env
rm frontend/web-5scent/.env.local
```

### Step 3: Create Example Environment Files

**`backend/laravel-5scent/.env.example`:**
```bash
APP_NAME=5SCENT
APP_ENV=local
APP_KEY=
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

MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=noreply@5scent.com
```

**`frontend/web-5scent/.env.example`:**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
```

### Step 4: Create README Files

Create comprehensive documentation:
- ✅ Main `README.md` (already done)
- ✅ `INSTALLATION_GUIDE.md` (for setup)
- ✅ `API_DOCUMENTATION.md` (for API reference)

---

## 📤 Pushing to Repository

### For GitHub

```bash
# Initialize git repository (if not already done)
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Check what will be committed
git status

# First commit
git commit -m "Initial commit: 5SCENT e-commerce platform"

# Add remote repository
git remote add origin https://github.com/yourusername/5SCENT.git

# Push to repository
git branch -M main
git push -u origin main
```

### For GitLab

```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

git add .
git commit -m "Initial commit: 5SCENT e-commerce platform"

git remote add origin https://gitlab.com/yourusername/5SCENT.git
git branch -M main
git push -u origin main
```

### For Bitbucket

```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

git add .
git commit -m "Initial commit: 5SCENT e-commerce platform"

git remote add origin https://bitbucket.org/yourusername/5SCENT.git
git branch -M main
git push -u origin main
```

---

## 👥 For Team Members - Cloning & Setting Up

### Quick Setup (5 minutes)

```bash
# 1. Clone repository
git clone <repository-url>
cd 5SCENT

# 2. Setup backend
cd backend/laravel-5scent
composer install
cp .env.example .env
php artisan key:generate
# Update .env with your database credentials
php artisan migrate
php artisan serve

# 3. Setup frontend (new terminal)
cd frontend/web-5scent
npm install
cp .env.example .env.local
npm run dev
```

**Done!** Access at `http://localhost:3000`

---

## 🚀 Production Deployment

### Backend Deployment (Linux Server)

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Clone repository
git clone <repository-url> /var/www/5scent
cd /var/www/5scent/backend/laravel-5scent

# 3. Install dependencies
composer install --optimize-autoloader --no-dev

# 4. Configure environment
cp .env.example .env
nano .env  # Edit with your production credentials

# 5. Generate key
php artisan key:generate

# 6. Set permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data /var/www/5scent

# 7. Run migrations
php artisan migrate --force

# 8. Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 9. Setup web server (Nginx example)
sudo nano /etc/nginx/sites-available/5scent
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/5scent/backend/laravel-5scent/public;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Frontend Deployment (Vercel - Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to Vercel (vercel.com)
# - Create new project
# - Select GitHub repository
# - Configure:
#   - Framework: Next.js
#   - Root Directory: frontend/web-5scent
#   - Environment Variables:
#     - NEXT_PUBLIC_API_BASE_URL: https://api.your-domain.com/api

# 3. Deploy
# Vercel will automatically deploy on push
```

### Frontend Deployment (Manual - Linux Server)

```bash
cd /var/www/5scent/frontend/web-5scent

# Install & build
npm install
npm run build

# Setup PM2 for process management
sudo npm install -g pm2
pm2 start npm --name "5scent-frontend" -- start
pm2 startup
pm2 save

# Setup reverse proxy with Nginx
sudo nano /etc/nginx/sites-available/frontend
```

**Nginx Frontend Config:**
```nginx
server {
    listen 80;
    server_name app.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Security Checklist

Before deployment:

- [ ] Remove all hardcoded passwords and API keys
- [ ] Set `APP_DEBUG=false` in production
- [ ] Enable HTTPS with SSL certificate
- [ ] Setup database backups
- [ ] Configure firewall rules
- [ ] Enable database encryption
- [ ] Setup rate limiting
- [ ] Configure CORS properly
- [ ] Use strong session timeouts
- [ ] Implement logging & monitoring

---

## 📊 Directory Structure for Repository

```
5SCENT/
├── backend/
│   └── laravel-5scent/
│       ├── app/
│       ├── bootstrap/
│       ├── config/
│       ├── database/
│       ├── public/
│       ├── routes/
│       ├── storage/
│       ├── tests/
│       ├── vendor/                (ignored in .gitignore)
│       ├── .env.example
│       ├── .gitignore
│       ├── composer.json
│       └── composer.lock
│
├── frontend/
│   └── web-5scent/
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── public/
│       ├── node_modules/           (ignored in .gitignore)
│       ├── .env.example
│       ├── .gitignore
│       ├── package.json
│       ├── package-lock.json
│       └── tsconfig.json
│
├── Documentation/
│   ├── README.md
│   ├── INSTALLATION_GUIDE.md
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── CONTRIBUTING.md
│
├── .gitignore                     (root level)
└── README.md                      (main overview)
```

---

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Format: Type: Description

# Examples:
git commit -m "feat: Add hero carousel component"
git commit -m "fix: Fix API 500 error in bestsellers"
git commit -m "docs: Update README with setup instructions"
git commit -m "refactor: Improve component structure"
git commit -m "style: Update color scheme"
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Styling
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Tests
- `chore:` - Maintenance

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: php-actions/composer@v6
        with:
          working_dir: backend/laravel-5scent
      - name: Run tests
        run: cd backend/laravel-5scent && php artisan test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend/web-5scent && npm install
      - run: cd frontend/web-5scent && npm run lint
      - run: cd frontend/web-5scent && npm run build
```

---

## 📞 Support for Developers

### Repository Rules

1. **Always pull before push**
   ```bash
   git pull origin main
   ```

2. **Create branches for features**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make pull requests for review**
   - Describe changes
   - Link related issues
   - Request reviewer

4. **Keep commits atomic**
   - One feature per commit
   - Clear messages
   - Related changes grouped

---

## 🎉 All Set!

Your project is now ready for:
- ✅ Repository hosting
- ✅ Team collaboration
- ✅ Production deployment
- ✅ Continuous integration

**Happy coding!** 🚀
