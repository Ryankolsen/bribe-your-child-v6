/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};

module.exports = nextConfig;
