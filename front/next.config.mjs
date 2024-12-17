/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nest-next-production.up.railway.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
