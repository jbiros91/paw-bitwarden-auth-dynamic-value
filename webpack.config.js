const path = require('path')


module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    bail: true, // Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling.
    stats: {
        errorDetails: true
    },
    entry: [
        'pbkdf2',
        'buffer',
        path.resolve( __dirname, './src/BitwardenAuthDynamicValue.js')
    ],
    output: {
        path: path.resolve(__dirname, './build'),

        filename: 'com.jozefbiros.PawExtensions.BitwardenAuthDynamicValue/BitwardenAuthDynamicValue.js'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }

}
