"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, LogIn, ShoppingCart, User } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setShowDropdown(false);
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.24em] text-black"
        >
          5SCENT
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {!loading && isAuthenticated && (
            <>
              <Link
                href="/wishlist"
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-black"
                title="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                href="/cart"
                className="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-black"
                title="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </>
          )}

          {!loading && (
            <>
              {!isAuthenticated ? (
                <div className="flex items-center gap-3 md:gap-4 text-sm">
                  <Link
                    href="/auth/signup"
                    className="font-medium text-gray-700 hover:text-black"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-900"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="font-semibold">Login</span>
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 hover:border-gray-300"
                  >
                    <User className="h-5 w-5 text-gray-700" />
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.name?.split(' ')[0] || 'Profile'}
                    </span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-100 bg-white shadow-lg">
                      <div className="border-b px-4 py-3">
                        <p className="text-xs text-gray-500">Logged in as</p>
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        My Account
                      </Link>

                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        My Orders
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full border-t px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
