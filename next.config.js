/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    //FIX: not working
    return [
      {
        source: '/my-page',
        destination: '/my-page/profile',
      },
    ]
  },
}

module.exports = nextConfig
