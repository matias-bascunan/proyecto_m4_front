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

// If a public API URL is provided via env (used in Vercel), allow images from that host
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
    // ignore invalid URL
  }
}

const nextConfig: NextConfig = {
  images: {
    // cast to any because RemotePattern typing is strict; we construct patterns dynamically
    remotePatterns: remotePatterns as any,
    // allow common external hosts used in examples (e.g. tailwind example images)
    domains: ['tailwindcss.com'],
  },
};

export default nextConfig;
