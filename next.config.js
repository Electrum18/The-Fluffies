const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const nextConfig = {
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },

  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
          publicExcludes: [
            "!img/**/*",
            "!icons/**/*",
            "!models/**/*",
            "!draco-gltf/**/*",
          ],
          buildExcludes: [/chunks\/.*.js$/],
        },
      },
    ],
  ],
  nextConfig
);
