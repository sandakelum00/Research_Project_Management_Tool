const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
      },
    ],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
