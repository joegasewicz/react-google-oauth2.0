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
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".png"],
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
            title: "React Google OAuth2.0 Demo",
            filename: "index.html",
            template: "./demo/index.html"
        }),
        new webpack.DefinePlugin({
           "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
        }),
    ],

};