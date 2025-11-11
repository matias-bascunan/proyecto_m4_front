import type { NextConfig } from "next";

const remotePatterns: Array<{
  protocol?: string;
  hostname: string;
  port?: string;
  pathname?: string;
}> = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3001',
    pathname: '/**',
  },
  {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: '3001',
    pathname: '/**',
  },
];

if (process.env.NEXT_PUBLIC_API_URL) {
  try {
    const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
    const proto = apiUrl.protocol === 'https:' ? 'https' : 'http';
    remotePatterns.push({
      protocol: proto,
      hostname: apiUrl.hostname,
      port: apiUrl.port || undefined,
      pathname: '/**',
    });
  } catch (e) {
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remotePatterns as any,
    domains: [
      'tailwindcss.com',
      'www.swingcitymusic.com',
      'www.gibson.com',
      'graysonstunetown.com',
      'www.musicalesdoris.com',
      'musiccitycanada.com',
      'musicworks.cl',
      'www.sanrio.com',
      'cdn.shopify.com',
      'images.unsplash.com',
    ],
  },
};

export default nextConfig;
