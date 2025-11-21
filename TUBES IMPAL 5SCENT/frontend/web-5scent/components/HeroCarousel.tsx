'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images: CarouselImage[] = [
    { id: 1, src: '/images/Ara_1.png', alt: 'Ara Fragrance' },
    { id: 2, src: '/images/rehan_1.png', alt: 'Rehan Fragrance' },
    { id: 3, src: '/images/ryan_1.png', alt: 'Ryan Fragrance' },
    { id: 4, src: '/images/hapis_1.png', alt: 'Hapis Fragrance' },
    { id: 5, src: '/images/lif_1.png', alt: 'Lif Fragrance' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full min-h-[78vh] overflow-hidden bg-gray-900">
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
      </div>

      <div className="absolute inset-0 z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          Discover Your Signature Scent
        </h1>
        <p className="mb-8 text-base text-gray-100 md:text-lg">
          Experience luxury fragrances crafted for the modern connoisseur
        </p>
        <Link
          href="/products"
          className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-900"
        >
          Shop Now
        </Link>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur hover:bg-black/45"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur hover:bg-black/45"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2.5 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
