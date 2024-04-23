const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@components": path.resolve(__dirname, "src", "components"),
            "@icon": path.resolve(__dirname, "src", "assets"),
            "@utils": path.resolve(__dirname, "src", "utils"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 5000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};