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

  useEffect(() => {
    const imgEl = new window.Image();
    imgEl.src = src;
    imgEl.onload = () => {
      setSize({ width: imgEl.naturalWidth, height: imgEl.naturalHeight });
    };
  }, [src]);

  if (size.width === 0 || size.height === 0) return null; // optional loader

  return (
    <div className={`relative w-full max-w-screen ${className}`} style={{ aspectRatio: size.width / size.height ,
        }}>
      <NextImage
        src={src}
        alt={alt}
        fill
        style={{ objectFit }}
        sizes="100vw"
        priority
      />
      {overlayContent && (
        <div className="absolute inset-0  ">
          {overlayContent}
        </div>
      )}
    </div>
  );
}
