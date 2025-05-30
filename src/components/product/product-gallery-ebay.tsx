"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ui/image-modal";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductGalleryEbayProps {
  images: ProductImage[];
  className?: string;
}

export function ProductGalleryEbay({ images, className }: ProductGalleryEbayProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {/* Thumbnail Strip - Left Side */}
      <div className="flex w-20 flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border-2 transition-all",
              currentImage === index
                ? "border-primary ring-2 ring-primary"
                : "border-border opacity-70 hover:border-primary/50 hover:opacity-100"
            )}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="diagonal-lines relative aspect-square overflow-hidden rounded-lg border border-border bg-[rgb(40,40,40)]">
          {images.length > 0 && (
            <Image
              src={images[currentImage].url || "/placeholder.svg"}
              alt={images[currentImage].alt}
              fill
              className="object-cover"
              priority
            />
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-3 top-1/2 z-10 h-12 w-12 rounded-full border border-border bg-[rgb(48,48,48)]/80 backdrop-blur-sm transition-colors duration-200 hover:bg-[rgb(48,48,48)]"
                onClick={prevImage}
                style={{ transform: "translateY(-50%)" }}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-3 top-1/2 z-10 h-12 w-12 rounded-full border border-border bg-[rgb(48,48,48)]/80 backdrop-blur-sm transition-colors duration-200 hover:bg-[rgb(48,48,48)]"
                onClick={nextImage}
                style={{ transform: "translateY(-50%)" }}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full border border-border bg-[rgb(48,48,48)]/80 backdrop-blur-sm transition-colors duration-200 hover:bg-[rgb(48,48,48)]"
            onClick={() => setIsModalOpen(true)}
          >
            <Expand className="h-5 w-5" />
            <span className="sr-only">Expand image</span>
          </Button>
        </div>
      </div>

      <ImageModal
        images={images}
        currentIndex={currentImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageChange={setCurrentImage}
      />
    </div>
  );
}
