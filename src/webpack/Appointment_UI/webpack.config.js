const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const CopyPlugin = require("copy-webpack-plugin");

const styledComponentsTransformer = createStyledComponentsTransformer();

const getStyleLoader = (isProd) => {
  return isProd ? MiniCssExtractPlugin.loader : "style-loader";
};

module.exports = (env) => {
  const MODE = env.mode;
  const IS_DEV = MODE === "development";
  const IS_PROD = !IS_DEV;

  return {
    mode: MODE,
    devtool: IS_DEV ? "eval-source-map" : "source-map",
    devServer: {
      static: path.resolve(__dirname, "dist"),
      hot: false,
      historyApiFallback: true,
      open: true,
    },
    entry: {
      main: path.resolve(__dirname, "src", "index.tsx"),
    },
    target: "web",
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    optimization: {
      minimize: IS_PROD,
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            filename: "vendor/[name].[contenthash].js",
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [getStyleLoader(IS_PROD), "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [getStyleLoader(IS_PROD), "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[contenthash]",
            outputPath: "assets",
            publicPath: "assets",
          },
        },
        {
          test: /\.tsx?$/i,
          use: {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      IS_PROD &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "public", "assets"), to: path.resolve(__dirname, "dist", "assets") },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ].filter(Boolean),
  };
};
