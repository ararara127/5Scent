# Next.js Frontend - Component & Page Examples

## Key Components

### components/Header.tsx

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCart } from '@/lib/store/cartStore';

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          5SCENT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/products?time_type=day" className="hover:text-purple-600">
            Day
          </Link>
          <Link href="/products?time_type=night" className="hover:text-purple-600">
            Night
          </Link>
          <Link href="/products?category=male" className="hover:text-purple-600">
            Male
          </Link>
          <Link href="/products?category=female" className="hover:text-purple-600">
            Female
          </Link>
          <Link href="/products?category=unisex" className="hover:text-purple-600">
            Unisex
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search perfumes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link href="/favorites" title="Favorites">
            <Heart className="w-6 h-6 cursor-pointer hover:text-purple-600" />
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-purple-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <User className="w-6 h-6" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                {user ? (
                  <>
                    <div className="border-b pb-2 mb-2">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-2 py-1 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-2 py-1 hover:bg-gray-100">
                      My Orders
                    </Link>
                    {user.is_admin && (
                      <Link href="/admin/products" className="block px-2 py-1 hover:bg-gray-100">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-2 py-1 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/register" className="block px-2 py-1 hover:bg-gray-100">
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 p-4 flex flex-col gap-2">
          <Link href="/products?time_type=day">Day</Link>
          <Link href="/products?time_type=night">Night</Link>
          <Link href="/products?category=male">Male</Link>
          <Link href="/products?category=female">Female</Link>
          <Link href="/products?category=unisex">Unisex</Link>
        </div>
      )}
    </header>
  );
}
```

### components/ProductCard.tsx

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Call API to toggle favorite
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 cursor-pointer group">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleFavorite();
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {/* Product Info */}
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(product.ratings.average))}
            {'☆'.repeat(5 - Math.floor(product.ratings.average))}
          </div>
          <span className="text-xs text-gray-600">({product.ratings.count})</span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-600">
            Rp {product.min_price.toLocaleString('id-ID')}
          </span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
      </div>
    </Link>
  );
}
```

## Page Examples

### app/page.tsx (Home Page)

```typescript
'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import client from '@/lib/api/client';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBestsellers();
  }, []);

  const fetchBestsellers = async () => {
    try {
      const response = await client.get('/products?bestsellers=10');
      setBestsellers(response.data.data);
    } catch (error) {
      console.error('Error fetching bestsellers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to 5SCENT</h1>
          <p className="text-xl mb-8">Discover the perfect fragrance for every moment</p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for perfumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Bestsellers</h2>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category Links */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Day Perfumes', href: '/products?time_type=day' },
              { label: 'Night Perfumes', href: '/products?time_type=night' },
              { label: 'For Men', href: '/products?category=male' },
              { label: 'For Women', href: '/products?category=female' },
              { label: 'Unisex', href: '/products?category=unisex' },
            ].map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="p-8 bg-gray-100 rounded-lg text-center font-semibold hover:bg-purple-600 hover:text-white transition"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

### app/(shop)/products/[id]/page.tsx (Product Detail)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import client from '@/lib/api/client';
import { useCart } from '@/lib/store/cartStore';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await client.get(`/products/${productId}`);
      setProduct(response.data.product);
      if (response.data.product.variants.length > 0) {
        setSelectedVariant(response.data.product.variants[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      variant_id: selectedVariant.id,
      product_id: product!.id,
      product_name: product!.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity,
    });

    alert('Added to cart!');
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 min-h-96">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain"
              />
            ) : (
              <div className="text-gray-400">No Image Available</div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.ratings.average) ? 'fill-yellow-400' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Product Details */}
            {product.notes && (
              <div className="mb-4">
                <strong>Notes:</strong> {product.notes}
              </div>
            )}
            {product.longevity && (
              <div className="mb-4">
                <strong>Longevity:</strong> {product.longevity}
              </div>
            )}

            {/* Category Badges */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                {product.time_type}
              </span>
            </div>

            {/* Variant Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Bottle Size:</h3>
              <div className="flex gap-4">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border-2 rounded-lg transition ${
                      selectedVariant?.id === variant.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold">{variant.size}</div>
                    <div className="text-purple-600">Rp {variant.price.toLocaleString('id-ID')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {product.ratings.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.ratings.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <strong>{review.user_name}</strong>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <small className="text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### app/(shop)/cart/page.tsx (Cart Page)

```typescript
'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shippingFee = 10000;
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link href="/products" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.variant_id} className="flex gap-4 pb-4 border-b">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product_name}</h3>
                    <p className="text-sm text-gray-600">{item.size}</p>
                    <p className="text-purple-600 font-bold">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.variant_id, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-12 text-center border-x border-gray-300"
                    />
                    <button
                      onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right">
                    <p className="font-bold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                    <button
                      onClick={() => removeItem(item.variant_id)}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Rp {shippingFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-purple-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-bold hover:bg-purple-700">
              Proceed to Checkout
            </Link>

            <Link href="/products" className="block w-full mt-3 border-2 border-gray-300 text-center py-3 rounded-lg hover:border-purple-300">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### app/(account)/orders/page.tsx (Order History)

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import client from '@/lib/api/client';
import { useAuth } from '@/lib/hooks/useAuth';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await client.get('/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Packaging: 'bg-blue-100 text-blue-800',
      Shipping: 'bg-indigo-100 text-indigo-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancel: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = statusFilter
    ? orders.filter((order) => {
        if (statusFilter === 'processing')
          return ['Pending', 'Packaging'].includes(order.status);
        if (statusFilter === 'shipping') return order.status === 'Shipping';
        if (statusFilter === 'delivered') return order.status === 'Delivered';
        if (statusFilter === 'cancelled') return order.status === 'Cancel';
        return true;
      })
    : orders;

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {/* Status Filter */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setStatusFilter(null)}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === null
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === 'processing'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            Sedang Diproses
          </button>
          <button
            onClick={() => setStatusFilter('shipping')}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === 'shipping'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            Sedang Dikirim
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === 'delivered'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            Selesai
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            Dibatalkan
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-semibold">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">
                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold">Rp {order.total.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Key Points

- All components are client-side (`'use client'`)
- Use Tailwind CSS for styling
- Integrate with Axios to call Laravel API
- Use Zustand for cart state management
- Handle authentication with tokens in localStorage
- Responsive design with mobile-first approach
