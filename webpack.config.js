const HtmlWebPackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const babelConfig = require('./babel.config.json')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: babelConfig.presets,
                        plugins: babelConfig.plugins,
                    },
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
            //     use: [
            //         'url-loader'
            //     ]
            // },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, '.', 'src'),
        },
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        // contentBase: '.',
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        open: true,
        inline: true,
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, './src', 'index.html'),
            filename: 'index.html',
            hash: true,
        }),
        new CompressionPlugin(),
        new MinifyPlugin(),
    ],
    // performance: { hints: false }
}
