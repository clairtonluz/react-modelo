const Merge = require('webpack-merge');
const webpack = require('webpack');
const _ = require('lodash');
const CommonConfig = require('./webpack.common.js');
const configMain = require('./config/main');
const configEnv= require('./config/prod');
const config = _.merge({}, configMain, configEnv);


module.exports = Merge(CommonConfig, {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            'APP_CONFIG': JSON.stringify(config)
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});