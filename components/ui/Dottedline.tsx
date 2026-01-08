import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

interface DottedLineWithBlobsProps {
  blobStyle?: string | CSSProperties; // Tailwind class or object
  lineStyle?: string | CSSProperties; // Tailwind class or object
  className?: string;                  // optional wrapper
}

const DottedLineWithBlobs: React.FC<DottedLineWithBlobsProps> = ({
  blobStyle,
  lineStyle,
  className = "",
}) => {
  const defaultBlob = "w-1 h-1 bg-white rounded-full";
  const defaultLine = "flex-1 border-t-2 w-10  border-dotted border-white ";

  // Handle string (Tailwind) or object (CSS)
  const getBlobClass = typeof blobStyle === "string" ? twMerge(defaultBlob, blobStyle) : defaultBlob;
  const getLineClass = typeof lineStyle === "string" ? twMerge(defaultLine, lineStyle) : defaultLine;
  const blobObjStyle = typeof blobStyle === "object" ? blobStyle : undefined;
  const lineObjStyle = typeof lineStyle === "object" ? lineStyle : undefined;

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      {/* Left blob */}
      <div className={getBlobClass} style={blobObjStyle}></div>

      {/* Line */}
      <div className={getLineClass} style={lineObjStyle}></div>

      {/* Right blob */}
      <div className={getBlobClass} style={blobObjStyle}></div>
    </div>
  );
};

export default DottedLineWithBlobs;
