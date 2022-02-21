const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
			static: path.resolve(__dirname, "./dist"),
		},
		entry: {
			main: path.resolve(__dirname, "./src/index.ts"),
		},
		output: {
			filename: "[name].[contenthash].js",
			path: path.resolve(__dirname, "./dist"),
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
					test: /\.ts$/i,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "ts-loader",
					},
				},
			],
		},
		plugins: [
			...(IS_PROD
				? [
						new MiniCssExtractPlugin({
							filename: "[name].[contenthash].css",
						}),
				  ]
				: []),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "./src/index.html"),
			}),
		],
	};
};
