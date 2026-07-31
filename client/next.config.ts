import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits one directory up (../package-lock.json), so
  // Turbopack infers the parent as the workspace root and then fails to resolve
  // `tailwindcss`, which only exists in ./node_modules. Pin the root here.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
