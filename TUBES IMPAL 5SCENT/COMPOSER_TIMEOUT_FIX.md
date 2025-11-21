# 🔧 Fix: Composer Timeout Error with Packagist

**Error:** `curl error 28 while downloading https://packagist.org/providers/laravel/collision.js`

This means Composer took too long downloading packages. Here are 5 solutions:

---

## Solution 1: Increase Composer Timeout (FASTEST ⭐)

```powershell
# Set timeout to 600 seconds (10 minutes)
composer config --global process-timeout 600

# Verify it worked
composer config --global process-timeout
```

Then retry:
```powershell
composer create-project laravel/laravel laravel-5scent
```

---

## Solution 2: Clear Composer Cache

```powershell
# Clear the cache
composer clear-cache

# Then retry
composer create-project laravel/laravel laravel-5scent
```

---

## Solution 3: Use Composer Directly (Alternative Registry)

```powershell
# Add Aliyun mirror (faster for China/Asia)
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

# Verify
composer config -g repo.packagist

# Then retry
composer create-project laravel/laravel laravel-5scent
```

**To revert back to original:**
```powershell
composer config -g --unset repo.packagist
```

---

## Solution 4: Download with Verbose Output (Debug)

This helps see where it's stuck:

```powershell
# Run with verbose mode
composer create-project laravel/laravel laravel-5scent -vvv
```

Look at the output to see which package is causing the timeout.

---

## Solution 5: Manual Download (Last Resort)

If all else fails:

```powershell
# Step 1: Download Laravel manually
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"
composer create-project laravel/laravel laravel-5scent --no-interaction

# Step 2: If it still fails, use --no-dev (skip dev dependencies)
composer create-project laravel/laravel laravel-5scent --no-dev

# Step 3: Then install dev dependencies later
cd laravel-5scent
composer install
```

---

## Complete Recommended Setup Steps

Use this sequence to avoid timeout issues:

```powershell
# 1. Increase timeout first
composer config --global process-timeout 600

# 2. Clear cache
composer clear-cache

# 3. Create Laravel (may take 2-3 minutes)
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"
composer create-project laravel/laravel laravel-5scent

# 4. Navigate into project
cd laravel-5scent

# 5. Generate key
php artisan key:generate

# 6. Install Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 7. Install dev tools (one at a time to be safe)
composer require --dev laravel/pint
composer require --dev beyondcode/laravel-dump-server
composer require --dev laravel/collision
```

---

## Network Issues? Check Your Internet

```powershell
# Test if you can reach packagist
Test-NetConnection -ComputerName packagist.org -Port 443

# If you're on VPN or Proxy, you may need to configure Composer
# Composer config file: C:\Users\[YourUsername]\AppData\Roaming\Composer\config.json
```

---

## If All Else Fails: Use Docker/Offline

### Option A: Use Laravel Sail (Docker)
```powershell
# This handles all downloads automatically
composer create-project laravel/laravel laravel-5scent --with=laravel-sail
cd laravel-5scent
sail up
```

### Option B: Install Dependencies Later
```powershell
# Create project without downloading dependencies
composer create-project laravel/laravel laravel-5scent --no-interaction

# Try installing later when connection is better
cd laravel-5scent
composer install
```

---

## Quick Reference: Your Errors & Fixes

| Error | Fix |
|-------|-----|
| Timeout (28) | Increase timeout to 600s |
| Too many requests | Wait 5 minutes, clear cache |
| Connection refused | Check internet, test ping |
| SSL certificate error | `composer config -g secure-http false` |
| Package not found | Use `--no-dev` flag |

---

## Check Your Current Settings

```powershell
# View all Composer settings
composer config --global --list

# Check timeout specifically
composer config --global process-timeout

# Check repository
composer config --global repo.packagist
```

---

## Recommended Configuration

**Set these once to avoid future issues:**

```powershell
# 1. Increase timeout
composer config --global process-timeout 600

# 2. Allow insecure HTTP (if needed)
composer config --global secure-http false

# 3. Use GitHub token (optional, for higher rate limits)
composer config --global github-oauth.github.com your_github_token
```

---

## After Fixing: Verify Installation

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend\laravel-5scent"

# Check Laravel is installed
php artisan --version

# Should output: Laravel Framework 12.x.x
```

---

## If You Get Stuck

**Try this exact sequence:**

```powershell
# Set config
composer config --global process-timeout 600
composer clear-cache

# Create project
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\backend"
composer create-project laravel/laravel laravel-5scent

# If it fails, try with no-dev
# composer create-project laravel/laravel laravel-5scent --no-dev

# Navigate
cd laravel-5scent

# Generate key
php artisan key:generate

# Test
php artisan --version
```

---

## Success Indicators ✅

You'll know it worked when you see:

```powershell
# After 'composer create-project laravel/laravel laravel-5scent'
Application ready! Build something amazing.

# After 'php artisan key:generate'
Application key set successfully.

# After 'php artisan --version'
Laravel Framework 12.x.x
```

---

**The timeout issue is usually temporary. Just increase the timeout and try again!** ⏱️

Try **Solution 1** first - it works 90% of the time.
