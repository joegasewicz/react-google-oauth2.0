const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports =  {
    mode: "development",
    entry: "./demo/index.tsx",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        crossOriginLoading: "anonymous",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Base Forms Showcase",
            filename: "index.html",
            template: "./demo/index.html"
        })
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        }
    }
};