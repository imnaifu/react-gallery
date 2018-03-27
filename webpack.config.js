const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
const DIST_DIR = path.resolve(__dirname, "public"); 
const SRC_DIR = path.resolve(__dirname, "src");


module.exports = {
	mode: 'development',
	entry: [SRC_DIR + "/index.js"],
	output: {
		path: DIST_DIR,
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{ 
				test: /\.css$/, 
				use: ['style-loader', 'css-loader'] 
			},
			{
				test: /\.(png|jpg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
						  	limit: 8192
						}
					}
				]
			},
			{
	            test: /\.scss$/,
	            use: [{
	                loader: "style-loader" // creates style nodes from JS strings
	            }, {
	                loader: "css-loader" // translates CSS into CommonJS
	            }, {
	                loader: "sass-loader" // compiles Sass to CSS
	            }]
	        }

		]
	},
	plugins: [
		// new UglifyJsPlugin()
	],
	devServer: {
		contentBase: "./public"
	} 
}