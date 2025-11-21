'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductImage {
  id: number;
  image_path: string;
}

interface Variant {
  id: number;
  size?: string;
  price?: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price?: number;
  min_price?: number;
  description: string;
  images?: ProductImage[];
  image?: string;
  variants?: Variant[];
  average_rating?: number;
  total_ratings?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const imageUrl =
    product.images?.[0]?.image_path || product.image || '/images/placeholder.jpg';

  const displayPrice =
    product.price ?? product.min_price ?? product.variants?.[0]?.price ?? 0;
  const displaySize = product.variants?.[0]?.size || '30ml';

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
        { product_id: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/${product.id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [] as JSX.Element[];
    const rounded = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      const filled = i < rounded;
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 text-black"
          strokeWidth={1.5}
          fill={filled ? '#111827' : 'none'}
        />
      );
    }
    return stars;
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_14px_40px_-24px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_18px_60px_-28px_rgba(0,0,0,0.45)]">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-black/85 px-3 py-1 text-xs font-semibold text-white">
          {product.category || 'Night'}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleWishlist();
          }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-md transition hover:text-black"
          aria-label="Add to wishlist"
        >
          <Heart
            className="h-5 w-5"
            strokeWidth={1.7}
            fill={isWishlisted ? '#111827' : 'none'}
          />
        </button>
      </div>

      <div className="space-y-3 px-5 pb-6 pt-5">
        <div>
          <h3 className="text-lg font-semibold text-black">{product.name}</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="flex gap-1">{renderStars(product.average_rating || 0)}</div>
          <span className="text-gray-500">({product.total_ratings || 0})</span>
        </div>

        <div>
          <p className="text-xl font-bold text-black">
            Rp{displayPrice.toLocaleString('id-ID')}
          </p>
          <p className="text-sm text-gray-500">{displaySize}</p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          disabled={isAddingToCart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShoppingCart className="h-4 w-4" />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
