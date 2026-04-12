// next.config.js
const apiBaseUrl = process.env.API_BASE_URL;

module.exports = {
  async rewrites() {
    if (!apiBaseUrl) {
      console.warn("API_BASE_URL is not set. API rewrites are disabled.");
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};
