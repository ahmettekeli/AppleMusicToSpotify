const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.bundle.js",
	},
	module: {
		rules: [
			{
				exclude: "/node_modules/",
				loader: "babel-loader",
			},
		],
	},
};
