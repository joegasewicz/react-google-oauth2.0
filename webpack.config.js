const path = require("path");

module.exports =  function(env, argv) {
    return {
        mode: env.mode ? "production" : "development",
        entry: argv["entry"],
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: [
                        /node_modules/,
                        path.resolve(__dirname, "./demo"),
                        path.resolve(__dirname, "./examples"),
                        path.resolve(__dirname, "./tests"),
                    ],
                }
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".png"],
        },
        externals: ["react", "react-dom"],
        output: {
            filename: argv["output-filename"],
            path: path.resolve(__dirname, argv["output-path"]),
            library: "react-google-oauth",
            libraryTarget: "commonjs2",
        },
};
};