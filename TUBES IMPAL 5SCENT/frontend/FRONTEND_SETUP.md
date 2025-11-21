# Frontend (Next.js 16) Setup Guide

## Prerequisites
- Node.js 18+
- npm or pnpm

## Installation Steps

### 1. Create Next.js Project with TypeScript

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend"

# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest web-5scent `
  --typescript `
  --tailwind `
  --eslint `
  --app `
  --no-git `
  --no-src-dir `
  --import-alias '@/*'

cd web-5scent
```

### 2. Install Additional Dependencies

```powershell
# HTTP client
npm install axios

# UI Components & Icons
npm install @headlessui/react @heroicons/react lucide-react

# Animations
npm install framer-motion

# State Management (optional - for cart context)
npm install zustand  # or use React Context API

# Form handling (optional)
npm install react-hook-form

# Date formatting
npm install date-fns

# Environment variables
npm install dotenv

# Development tools
npm install -D tailwindcss@latest postcss autoprefixer
```

### 3. Project Structure

```
web-5scent/
├── app/
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Home page
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (shop)/
│   │   ├── products/
│   │   │   └── page.tsx               # Product listing
│   │   ├── products/[id]/
│   │   │   └── page.tsx               # Product detail
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   ├── (account)/
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx               # Order history
│   │   └── orders/[id]/
│   │       └── page.tsx               # Order detail
│   ├── admin/
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   └── reports/
│   │       └── page.tsx
│   └── pos/
│       └── page.tsx                   # POS system
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── Cart/
│   │   └── CartSidebar.tsx
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── Admin/
│   │   ├── ProductForm.tsx
│   │   ├── OrderManagement.tsx
│   │   └── ReportViewer.tsx
│   └── UI/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Card.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts                  # Axios instance
│   │   ├── auth.ts                    # Auth endpoints
│   │   ├── products.ts                # Product endpoints
│   │   ├── orders.ts                  # Order endpoints
│   │   ├── ratings.ts                 # Rating endpoints
│   │   ├── favorites.ts               # Favorite endpoints
│   │   └── pos.ts                     # POS endpoints
│   ├── store/
│   │   ├── cartStore.ts               # Cart state (Zustand or Context)
│   │   └── authStore.ts               # Auth state
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useProducts.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── formatters.ts
│   └── types/
│       ├── index.ts                   # TypeScript types
│       └── api.ts                     # API response types
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 4. Create .env.local

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key_here
```

### 5. Update tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6', // Purple
        secondary: '#EC4899', // Pink
      },
    },
  },
  plugins: [],
}

export default config
```

### 6. Start Development Server

```powershell
npm run dev
# Runs on http://localhost:3000
```

## Key Files to Create

### lib/api/client.ts

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
```

### lib/types/index.ts

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_admin: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  notes?: string;
  longevity?: string;
  category: 'male' | 'female' | 'unisex';
  time_type: 'day' | 'night';
  image?: string;
  stock: number;
  min_price: number;
  max_price: number;
  variants: ProductVariant[];
  ratings: {
    average: number;
    count: number;
    reviews: Rating[];
  };
}

export interface ProductVariant {
  id: number;
  size: string; // "30ml", "50ml"
  price: number;
  stock: number;
}

export interface CartItem {
  variant_id: number;
  product_id: number;
  product_name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: 'Pending' | 'Packaging' | 'Shipping' | 'Delivered' | 'Cancel';
  shipping_address: string;
  shipping_number?: string;
  payment_method: 'QRIS' | 'COD';
  payment_status: 'unpaid' | 'paid' | 'pending';
  subtotal: number;
  shipping_fee: number;
  total: number;
  items: OrderItem[];
  created_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  variant_size: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Rating {
  id: number;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}
```

### lib/store/cartStore.ts (using Zustand)

```typescript
import { create } from 'zustand';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]') 
    : [],
  
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.variant_id === item.variant_id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = state.items.map((i) =>
          i.variant_id === item.variant_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, item];
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
      
      return { items: updatedItems };
    }),
  
  removeItem: (variantId) =>
    set((state) => {
      const updatedItems = state.items.filter((i) => i.variant_id !== variantId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    }),
  
  updateQuantity: (variantId, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.variant_id === variantId ? { ...i, quantity } : i
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    }),
  
  clearCart: () => {
    set({ items: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  },
  
  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
```

### lib/hooks/useAuth.ts

```typescript
import { useEffect, useState } from 'react';
import { User } from '../types';
import client from '../api/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await client.get('/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await client.post('/auth/login', { email, password });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(response.data.user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      await client.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  return { user, loading, token, login, logout };
};
```

## Development Workflow

### Terminal

```powershell
cd "D:\Kuliah\Tugas\sms 5\IMPAL\TUBES IMPAL 5SCENT\frontend\web-5scent"
npm run dev
```

Visit http://localhost:3000

## Building for Production

```powershell
npm run build
npm start
```

## Common npm Commands

```powershell
npm run dev          # Development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test            # Run tests (if configured)
npm install         # Install dependencies
```

## NextJS App Router Structure Notes

- Pages in `app/` directory
- Route groups: `(auth)`, `(shop)`, `(account)` organize without affecting URL
- Dynamic routes: `[id]` for product/{id}
- Nested layouts for shared UI
- API routes in `app/api/` (optional, since we have Laravel backend)

## Next Steps

1. Create components (Header, ProductCard, etc.)
2. Create page layouts
3. Implement API integration
4. Add authentication flow
5. Build cart functionality
6. Implement checkout page
