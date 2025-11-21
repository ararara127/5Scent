'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface ProductImage {
  id: number;
  image_path: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images?: ProductImage[];
  average_rating?: number;
  total_ratings?: number;
}

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
        {
          params: {
            bestsellers: 6,
            per_page: 6,
          },
        }
      );

      const payload =
        response.data?.data?.data ?? response.data?.data ?? [];
      setProducts(Array.isArray(payload) ? payload : []);
      setError('');
    } catch (err) {
      console.error('Error fetching bestsellers:', err);
      setError('Failed to load bestsellers');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white pb-20 pt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black">Best Seller Perfumes</h2>
          <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-black" />
        </div>

        {loading && (
          <div className="mt-12 text-center text-gray-600">Loading bestsellers...</div>
        )}

        {error && !loading && (
          <div className="mt-12 text-center text-red-600">{error}</div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!loading && products.length > 0 ? (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center text-gray-600">
                <p>No bestsellers available at the moment</p>
              </div>
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-black px-7 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
