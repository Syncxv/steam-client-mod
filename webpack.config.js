const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        FriendClient: './src/FriendClient/index.js',
        LibraryClient: './src/LibraryClient/index.js',
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
            'steamed/util': path.resolve(__dirname, 'src', 'modules', 'util'),
            'steamed/entities': path.resolve(__dirname, 'src', 'modules', 'entities'),
            'steamed/components': path.resolve(__dirname, 'src', 'modules', 'components'),
            'steamed/patcher': path.resolve(__dirname, 'src', 'modules', 'patcher'),
            'steamed/webpack': path.resolve(__dirname, 'src', 'modules', 'webpack'),
            steamed: path.resolve(__dirname, 'src', 'modules'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },

    context: __dirname, //set the context of your app to be the project directory
    node: {
        __dirname: true, //Allow use of __dirname in modules, based on context
    },
};
