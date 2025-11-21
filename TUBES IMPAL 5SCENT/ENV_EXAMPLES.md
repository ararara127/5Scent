# Example Environment Files

## Backend: .env.example
Place this in: `backend/laravel-5scent/.env`

```env
APP_NAME=5SCENT
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=5scent
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@5scent.com
MAIL_FROM_NAME=5SCENT

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000,localhost:8000

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Midtrans Payment Gateway
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
MIDTRANS_IS_PRODUCTION=false

# Payment Configuration
PAYMENT_SHIPPING_FEE=10000

# Admin Configuration
ADMIN_EMAIL=admin@5scent.com
```

---

## Frontend: .env.local
Place this in: `frontend/web-5scent/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key_here
NEXT_PUBLIC_APP_NAME=5SCENT
```

---

## Backend: Production .env
For deployment (replace with actual values):

```env
APP_NAME=5SCENT
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.5scent.com

LOG_CHANNEL=stack
LOG_LEVEL=warning

DB_CONNECTION=mysql
DB_HOST=your-db-host.com
DB_PORT=3306
DB_DATABASE=5scent_prod
DB_USERNAME=db_user
DB_PASSWORD=strong_password_here

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@5scent.com
MAIL_FROM_NAME=5SCENT

SANCTUM_STATEFUL_DOMAINS=5scent.com,www.5scent.com
CORS_ALLOWED_ORIGINS=https://5scent.com,https://www.5scent.com

# Production Midtrans Keys
MIDTRANS_SERVER_KEY=production_server_key_here
MIDTRANS_CLIENT_KEY=production_client_key_here
MIDTRANS_IS_PRODUCTION=true

PAYMENT_SHIPPING_FEE=15000
```

---

## Frontend: Production .env.production
For deployment (replace with actual values):

```env
NEXT_PUBLIC_API_BASE_URL=https://api.5scent.com/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=production_client_key_here
NEXT_PUBLIC_APP_NAME=5SCENT
```

---

## Notes on Getting Midtrans Keys

1. Create account at https://midtrans.com
2. Go to Dashboard → Settings → Access Keys
3. Copy Server Key and Client Key
4. Paste into .env files
5. Use Sandbox keys for testing, Production keys for live

---

## Database Credentials

### Local Development (Laragon Default)
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=5scent
DB_USERNAME=root
DB_PASSWORD=         # Usually empty for Laragon
```

### Shared Hosting Example
```env
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=yoursite_5scent
DB_USERNAME=yoursite_dbuser
DB_PASSWORD=strong_password
```

### Cloud Hosting (AWS RDS Example)
```env
DB_HOST=5scent-db.xxxxxxx.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=5scent
DB_USERNAME=admin
DB_PASSWORD=your_strong_password
```

---

## Security Best Practices

1. **Never commit .env files** - they contain secrets
2. **Always use .env.example** to document required variables
3. **Keep keys secret** - don't share in chat, email, or public repos
4. **Rotate keys periodically** especially if compromised
5. **Use environment variables in CI/CD** - not hardcoded
6. **Different keys for dev/staging/production**

---

## Quick Setup Script

Save as `setup-env.ps1` and run in PowerShell:

```powershell
# Backend
cd backend\laravel-5scent
cp .env.example .env

# Update with your values (use Notepad)
notepad .env

# Frontend
cd ..\..\frontend\web-5scent
New-Item .env.local -type file
notepad .env.local

# Fill with values from above
```
