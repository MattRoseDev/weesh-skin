const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const babelConfig = require("./babel.config.json");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            cacheDirectory: true,
            presets: babelConfig.presets,
            plugins: babelConfig.plugins,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //     test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
      //     use: [
      //         'url-loader'
      //     ]
      // },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      Root: path.resolve(__dirname, ".", "src"),
    },
    extensions: [".js", ".jsx"],
  },
  devServer: {
    // contentBase: '.',
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    open: true,
    inline: true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "./src", "index.html"),
      filename: "index.html",
      hash: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000, // Minimum number of characters
    }),
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "./src/static"),
          to: "static",
        },
        {
          from: path.join(__dirname, "./seo"),
          to: ".",
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // performance: { hints: false }
};
