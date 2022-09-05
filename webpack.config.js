const path = require('path');
module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.js', '.jsx'],
    },
    resolve: {
        extensions: ['.js', '.tsx', '.js', '.jsx'],
        alias: {
            'steamed/util': path.resolve(__dirname, 'src', 'code_modules', 'util'),
        },
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },

    context: __dirname, //set the context of your app to be the project directory
    node: {
        __dirname: true, //Allow use of __dirname in modules, based on context
    },
};
