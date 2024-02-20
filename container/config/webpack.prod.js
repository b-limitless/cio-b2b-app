const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const commonConfig = require(`./webpack.common`);
const ModuleFederationPlugin = require(`webpack/lib/container/ModuleFederationPlugin`);
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN || 'http://pasal.dev';

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: `auth@${domain}/auth/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
