const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src"
    },
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: '[name].map'
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        host: 'localhost',
        port: 3000,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            exclude: [
                'index.html',
                'favicon.ico',
                'manifest.json',
                'service-worker.js',
                'logo-192x192.png',
                'logo-512x512.png'
            ]
        }),
        new CopyWebpackPlugin([
            {from: './node_modules/font-awesome/css/font-awesome.min.css', to: 'assets/css'},
            {from: './node_modules/materialize-css/dist/css/materialize.min.css', to: 'assets/css'},
            {from: './node_modules/materialize-css/dist/fonts/', to: 'assets/fonts'},
            {from: './node_modules/font-awesome/fonts/', to: 'assets/fonts'},
            {from: './node_modules/materialize-css/dist/js/materialize.min.js', to: 'assets/js'},
            {from: './node_modules/jquery/dist/jquery.min.js', to: 'assets/js'}
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: ['babel-loader']},
            {test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: /node_modules/,
                use: 'file-loader?limit=100000&name=./assets/images/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    }
};