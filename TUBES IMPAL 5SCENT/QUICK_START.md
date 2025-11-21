# ⚡ QUICK START - 3 STEPS TO RUNNING EVERYTHING

**Backend Status:** ✅ Running on http://localhost:8000  
**Frontend Status:** ⏳ Ready after npm install  
**Time needed:** 10 minutes total  

---

## STEP 1: Install Node.js (5 minutes)

### Windows:
1. Go to https://nodejs.org
2. Download LTS version (left side)
3. Run installer
4. Click "Next" until done
5. Restart PowerShell

### Verify:
```powershell
node --version
npm --version
```

Should show version numbers like `v18.17.0`

---

## STEP 2: Install Frontend Dependencies (3 minutes)

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm install
```

**Wait for it to finish** (might say "added 1000+ packages")

---

## STEP 3: Start Frontend (1 minute)

```powershell
npm run dev
```

**Output:** You'll see something like:
```
  ▲ Next.js 16
  - Local:        http://localhost:3000
```

Open http://localhost:3000 in your browser! ✅

---

## NOW YOU HAVE EVERYTHING RUNNING

```
✅ Backend API:    http://localhost:8000
✅ Frontend UI:    http://localhost:3000
✅ Database:       db_5scent connected
✅ API Routes:     30+ endpoints ready
✅ Components:     Ready to build
```

---

## WHAT'S NEXT?

### Option A: Build Pages
Create these pages in `frontend/web-5scent/app/`:
- Products listing
- Product detail
- Shopping cart
- Checkout
- Login/Register
- Order history

### Option B: Test API
Use Postman or curl to test endpoints:
```powershell
# Register user
curl -X POST http://localhost:8000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Get products
curl http://localhost:8000/api/products
```

### Option C: Read Documentation
- API endpoints: `API_DOCUMENTATION.md`
- Controller code: `backend/laravel-5scent/app/Http/Controllers/`
- Models: `backend/laravel-5scent/app/Models/`

---

## TROUBLESHOOTING

### Node not found after install
→ Restart PowerShell completely (close & reopen)

### npm install fails
```powershell
# Clear cache
npm cache clean --force
# Try again
npm install
```

### Port already in use
```powershell
# Run on different port
npm run dev -- -p 3001
```

### CORS errors
Make sure Laravel `.env` has:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

---

## FILE ORGANIZATION

```
Your Project Root: D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT

Terminal 1 - Backend:
$ cd backend\laravel-5scent
$ php artisan serve
→ Runs on http://localhost:8000

Terminal 2 - Frontend:
$ cd frontend\web-5scent
$ npm run dev
→ Runs on http://localhost:3000
```

---

## YOU'RE DONE WITH SETUP! 🎉

Everything is automated and ready. Just:
1. Install Node.js
2. Run npm install
3. Run npm run dev
4. Start building!

---

**Time to start coding:** 10 minutes  
**Lines of code already written:** 2000+  
**Models:** 13  
**Controllers:** 7  
**API Endpoints:** 30+  
**Happiness level:** Maximum 😄  

**LET'S BUILD!** 🚀
