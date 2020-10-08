const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        context: path.resolve(__dirname),
        entry: ['./src/index.js', './src/sass/main.scss'],
        output: {
            path: path.join(__dirname, './build'),
            filename: 'script.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff)$/i,
                    loader: 'file-loader',
                    options: {
                      outputPath: 'assets',
                    },
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            root: '.'
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
                filename: "index.html",
            }),
            new HtmlWebpackPlugin({
                template: 'cart-full.html',
                filename: "cart-full.html",
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            })
        ]
    }

    return config;
}
