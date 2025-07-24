    /** @type {import('next').NextConfig} */
    const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'http',
                    hostname: 'res.cloudinary.com',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'res.cloudinary.com',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'lh3.googleusercontent.com',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'cdn-icons-png.flaticon.com',
                    port: '',
                    pathname: '/**',
                },
            ],
            minimumCacheTTL: 60, // cache images for 60 seconds
        },
    }

    export default nextConfig
