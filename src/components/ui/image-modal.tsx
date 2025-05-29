"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  images: Array<{ id: string; url: string; alt: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onImageChange: (index: number) => void;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onImageChange,
}: ImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "+":
        case "=":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "r":
        case "R":
          e.preventDefault();
          handleRotate();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      onImageChange(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      onImageChange(currentIndex - 1);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="escrow-bg relative z-10 flex h-full w-full flex-col">
        {/* Header */}
        <div className="diagonal-lines-subtle flex items-center justify-between border-b border-border/30 bg-gradient-to-r from-[rgb(48,48,48)] to-[rgb(40,40,40)] p-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              {currentImage?.alt || `Image ${currentIndex + 1}`}
            </h2>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {images.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="h-9 w-9 transition-colors duration-200"
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>

            <span className="min-w-[4rem] text-center text-sm text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 5}
              className="h-9 w-9 transition-colors duration-200"
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>

            {/* Rotate Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleRotate}
              className="h-9 w-9 transition-colors duration-200"
            >
              <RotateCw className="h-4 w-4" />
              <span className="sr-only">Rotate</span>
            </Button>

            {/* Download Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const link = document.createElement("a");
                link.href = currentImage?.url || "";
                link.download = currentImage?.alt || "image";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="h-9 w-9 transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>

            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="diagonal-lines relative flex-1 overflow-hidden">
          <div
            className="flex h-full w-full items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={currentImage?.url || "/placeholder.svg"}
                alt={currentImage?.alt || "Product image"}
                width={800}
                height={800}
                className="max-h-[80vh] max-w-[80vw] object-contain"
                priority
                draggable={false}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 h-12 w-12 rounded-full border border-border bg-[rgb(48,48,48)]/80 backdrop-blur-sm transition-colors duration-200 hover:bg-[rgb(48,48,48)]"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                style={{ transform: "translateY(-50%)" }}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 h-12 w-12 rounded-full border border-border bg-[rgb(48,48,48)]/80 backdrop-blur-sm transition-colors duration-200 hover:bg-[rgb(48,48,48)]"
                onClick={goToNext}
                disabled={currentIndex === images.length - 1}
                style={{ transform: "translateY(-50%)" }}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="diagonal-lines-subtle border-t border-border/30 bg-gradient-to-r from-[rgb(48,48,48)] to-[rgb(40,40,40)] p-4">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={cn(
                    "relative aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-200",
                    currentIndex === index
                      ? "border-primary ring-2 ring-primary"
                      : "border-border opacity-70 hover:border-primary/50 hover:opacity-100"
                  )}
                  onClick={() => onImageChange(index)}
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
          </div>
        )}

        {/* Help Text */}
        <div className="diagonal-lines-subtle border-t border-border/30 bg-[rgb(31,31,31)] px-4 py-2">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span>Use arrow keys to navigate</span>
            <span>Mouse wheel to zoom</span>
            <span>Drag to pan when zoomed</span>
            <span>Press R to rotate</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
