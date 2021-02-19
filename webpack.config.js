const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtraxtPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV === 'development';

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        // eslint-disable-next-line no-param-reassign
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    return {
        entry: './src/main.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            chunkFilename: '[id].[chunkhash].js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts'],
        },
        module: {
            rules: [{
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                    },
                },
                {
                    test: /\.(s*)css$/,
                    exclude: /node_modules/,
                    use: [{
                            loader: MiniCssExtraxtPlugin.loader,
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: false,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|gif|jpg|svg|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: nodeEnv ? 'assets/[name].[ext]' : 'assets/[hash].[ext]',
                        },
                    }],
                },
            ],
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico',
                filename: './index.html',
            }),
            new MiniCssExtraxtPlugin({
                filename: nodeEnv ? 'assets/[name].css' : 'assets/[name].css',
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        optimization: {
            runtimeChunk: 'multiple',
        },
    }
};