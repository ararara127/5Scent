import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 text-gray-700">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-[0.18em] text-black">5SCENT</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Discover your signature scent with our luxurious collection of premium fragrances.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-black">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-black">Categories</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shipping" className="hover:text-black">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-black">FAQ</Link></li>
              <li><Link href="/orders/track" className="hover:text-black">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-black">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href="tel:+6282644445311" className="hover:text-black">(+62) 826-4444-5311</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href="mailto:info@5scent.com" className="hover:text-black">info@5scent.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Jl. Telekomunikasi 1 Bandung, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row">
          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" aria-label="Facebook" className="rounded-full p-2 hover:text-black">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full p-2 hover:text-black">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-full p-2 hover:text-black">
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <p className="text-center text-xs text-gray-500 md:text-right">
            © 2025 5SCENT. All rights reserved. Crafted with elegance.
          </p>
        </div>
      </div>
    </footer>
  );
}
