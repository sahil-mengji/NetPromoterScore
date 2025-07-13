/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.1.3:3000"], // your LAN IP
 reactStrictMode: true,
 images: {
  domains: ['example.com'],
 },
};
module.exports = nextConfig;