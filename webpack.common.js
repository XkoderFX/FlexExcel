const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");

const jsLoader = {
    loader: "babel-loader",
    options: {
        presets: ["@babel/preset-env"],
    },
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: ["@babel/polyfill", "./index.ts"], //fix regenerator error
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            core: path.resolve(__dirname, "core"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.svg"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCss.loader, "css-loader", "sass-loader"],
            },

            {
                test: /\.js$/i,
                use: jsLoader,
            },

            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: "ts-loader",
            },
        ],
    },
};
