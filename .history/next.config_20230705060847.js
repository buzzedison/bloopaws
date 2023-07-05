const withVideos = require("next-videos");

const nextConfig = {
  output: "standalone",
};

module.exports = withVideos(nextConfig);