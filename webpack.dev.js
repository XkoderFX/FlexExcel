const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");

const commmon = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commmon, {
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        watchContentBase: true,
    },
    devtool: "source-map",

    output: {
        filename: "bundle[hash].js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new MiniCss({
            filename: "bundle[hash].css",
        }),
    ],
});
