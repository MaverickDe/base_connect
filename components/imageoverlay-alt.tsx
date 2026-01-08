"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";

interface ImageWithOverlayProps {
  src: string;
  alt?: string;
  overlayContent?: React.ReactNode;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
}

export default function ImageWithOverlay({
  src,
  alt = "",
  overlayContent,
  objectFit = "cover",
  className = "",
}: ImageWithOverlayProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Load image to get natural size
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setSize({ width: img.naturalWidth, height: img.naturalHeight });
  }, [src]);

  if (size.width === 0 || size.height === 0) return null; // optional loader

  return (
    <div
      className={`relative inline-block w-full ${className}`}
    //   style={{ minWidth: size.width, minHeight: size.height }}
    >
      {/* Image behind */}
      <div className="absolute inset-0 -z-10">
        <NextImage
          src={src}
          alt={alt}
          fill
          style={{ objectFit }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlay content in flow */}
      {overlayContent && <div>{overlayContent}</div>}
    </div>
  );
}
