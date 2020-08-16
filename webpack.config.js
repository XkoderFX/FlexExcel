const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";
const isDev = !isProduction;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
            },
        },
    ];
    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            core: path.resolve(__dirname, "core"),
        },
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
        hot: isDev,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            /** we didn't select source
             becouse the context*/

            minify: {
                removeComments: isProduction,
                collapseWhitespace: isProduction,
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.svg"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new MiniCss({
            filename: filename("css"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCss.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.js$/i,
                use: jsLoaders(),
            },
        ],
    },
};
