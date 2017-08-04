const Merge = require('webpack-merge');
const webpack = require('webpack');
const _ = require('lodash');
const CommonConfig = require('./webpack.common.js');
const configMain = require('./config/main');
const configEnv= require('./config/dev');
const config = _.merge({}, configMain, configEnv);

module.exports = Merge(CommonConfig, {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            },
            'APP_CONFIG': JSON.stringify(config)
        })
    ]
});