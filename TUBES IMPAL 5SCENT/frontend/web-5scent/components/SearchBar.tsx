'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative -mt-10 flex w-full justify-center px-4 md:-mt-14">
      <form
        onSubmit={handleSearch}
        className="relative w-full max-w-4xl overflow-hidden rounded-full bg-white shadow-[0_18px_60px_-25px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center gap-3 px-5 py-4 md:px-7 md:py-5">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your perfume..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 md:text-base"
          />
          <button
            type="submit"
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
