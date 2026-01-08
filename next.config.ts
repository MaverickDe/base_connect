import type { NextConfig } from "next";
import { SERVERDOMAIN } from "./const";

const nextConfig: NextConfig = {

//  eslint: {
//     // ✅ Do not run ESLint on builds
//     ignoreDuringBuilds: true,
//   },
  /* config options here */
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${SERVERDOMAIN}/api/:path*`, // Rewrite path
      },
    ];
  },
};

export default nextConfig;
