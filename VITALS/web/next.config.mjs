/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Las fotos de demo se sirven desde el servicio de inteligencia (FastAPI /uploads).
  images: { remotePatterns: [{ protocol: "http", hostname: "127.0.0.1" }, { protocol: "http", hostname: "localhost" }] },
  async headers() {
    return [
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }] },
    ];
  },
};
export default nextConfig;
