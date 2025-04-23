/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    images: {
        domains: [
            "xpe.edu.br",
            "igtieadstorage.blob.core.windows.net"
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
