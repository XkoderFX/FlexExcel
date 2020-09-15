const MiniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
    plugins: [
        new MiniCss({
            filename: "bundle.css",
            path: path.resolve(__dirname, "dist"),
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
});
