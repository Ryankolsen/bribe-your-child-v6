/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
