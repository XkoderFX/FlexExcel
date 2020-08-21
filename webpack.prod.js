const MiniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commmon = require("./webpack.common");
const { merge } = require("webpack-merge");
const { isBundle } = require("typescript");

module.exports = merge(commmon, {
    plugins: [
        new MiniCss({
            filename: "bundle.css",
        }),
        new HtmlWebpackPlugin({
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
