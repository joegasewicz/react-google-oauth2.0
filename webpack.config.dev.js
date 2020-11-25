const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    console.log("Loading CLIENT_ID: ", process.env.CLIENT_ID);
}

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
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Base Forms Showcase",
            filename: "index.html",
            template: "./demo/index.html"
        }),
        new webpack.DefinePlugin({
           "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
        }),
    ],

};