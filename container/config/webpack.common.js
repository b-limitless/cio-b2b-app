const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        issuer: /\.[jt]sx?$/,
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico)$/,
        exclude: path.resolve(__dirname, "../node_modules/"),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".svg",
      ".scss",
      ".sass",
      ".png",
      ".jpeg",
      ".gif",
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = commonConfig;
