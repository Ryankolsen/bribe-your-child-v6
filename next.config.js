/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    presets: [['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ]

};

module.exports = nextConfig;
