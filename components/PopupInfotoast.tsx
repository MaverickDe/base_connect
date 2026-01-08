import React, { useState, useEffect, useRef } from "react";

export default function PopupInfoToastBefore({ text, children }: { text: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Hide tooltip if click/tap outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}  // show on hover
      onMouseLeave={() => setVisible(false)} // hide on hover leave
    >
      {/* Trigger element */}
      <div onClick={() => setVisible(!visible)} className="cursor-pointer">
        {children}
      </div>

      {/* Tooltip / popup */}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
          transition-opacity duration-200
          bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap z-50
          ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {text}
      </div>
    </div>
  );
}
