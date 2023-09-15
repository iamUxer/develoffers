/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['localhost', '*'],
  // },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // removeConsole: {
    //   exclude: ['error']
    // },
    styledComponents: true,
    emotion: true,
  },
};

module.exports = nextConfig;
