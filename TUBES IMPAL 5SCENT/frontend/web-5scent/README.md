# 5SCENT Frontend - Next.js 16 + React 19 + TypeScript

This is the frontend application for the 5SCENT online perfume shop built with Next.js 16, React 19, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (Download from [nodejs.org](https://nodejs.org))
- npm or pnpm

### Installation

1. **Install dependencies:**
```bash
cd web-5scent
npm install
```

2. **Configure environment:**
Create `.env.local` with:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_key_here
```

3. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
web-5scent/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/
│   ├── api/            # API client & requests
│   ├── store/          # Zustand state management
│   ├── hooks/          # Custom React hooks
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
├── .env.local          # Environment variables
├── tailwind.config.ts  # Tailwind CSS config
└── package.json        # Dependencies
```

## 🔗 Backend Connection

The frontend connects to the Laravel backend running on `http://localhost:8000/api`.

Make sure:
1. Laravel backend is running (`php artisan serve`)
2. API base URL matches in `.env.local`
3. CORS is configured in Laravel

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

## 📦 Dependencies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Hook Form** - Form handling

## 🌟 Features

- ✅ Product listing with filters
- ✅ Product details page
- ✅ Shopping cart
- ✅ User authentication
- ✅ Order management
- ✅ Wishlist/Favorites
- ✅ Product ratings
- ✅ Responsive design

## 📝 Setup Checklist

- [ ] Node.js installed (`node -v`)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured
- [ ] Backend API running on port 8000
- [ ] Development server running (`npm run dev`)
- [ ] Can access http://localhost:3000

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
Check Laravel's `.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎯 Status

- Setup: ✅ Complete
- Configuration: ✅ Complete
- Core components: Ready to build
- API integration: Ready to implement

---

**Ready to build the frontend!** 🎉
