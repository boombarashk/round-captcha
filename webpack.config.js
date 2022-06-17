const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        app: './public/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 9000,
    }
};
