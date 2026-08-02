"use client";

import Image from "next/image";
import { useState } from "react";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-[#F4F5F1] rounded-lg flex items-center justify-center">
        <Home className="w-16 h-16 text-gray-300" />
      </div>
    );
  }

  const prev = () =>
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-[#F4F5F1] rounded-lg overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        <span className="absolute bottom-3 right-3 px-2 py-1 text-xs bg-black/60 text-white rounded">
          {selectedIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-20 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-colors cursor-pointer ${
                i === selectedIndex
                  ? "border-[#1F4D3E]"
                  : "border-transparent hover:border-[#D8DBD3]"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
