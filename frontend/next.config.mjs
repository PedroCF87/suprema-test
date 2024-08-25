/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    authTokens: process.env.AUTHTOKENS
  }
}

export default nextConfig
