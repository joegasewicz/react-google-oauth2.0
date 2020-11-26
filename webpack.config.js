const path = require("path");

module.exports =  function(env, argv) {
    return {
        mode: env.production ? "production" : "development",
        entry: argv["entry"],
        devtool: env.production ? "inline-source-map" : "eval",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: [/node_modules/, path.resolve(__dirname, "./demo")],
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
            libraryTarget: "umd",
        },
};
};