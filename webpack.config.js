const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`




module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry:{
        index: path.resolve(__dirname, 'src' , 'index.js'),
        // about: path.resolve(__dirname, 'src' , 'about.js'), тест
    },
    output:{
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
    },

    devServer : {
        static : {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 9000, 
        compress: true,
        open : true,
        hot: true
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            minify: {
                collapseWhitespace: isProd
            }
        }),

        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/about.html'),
        //     filename: 'about.html',
        //     chunks: ['about'],
        //     minify: {
        //         collapseWhitespace: isProd
        //     }
        // }), пример подключения

        new MiniCssExtractPlugin({
            filename: `./style/${filename('css')}`
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                from: path.resolve(__dirname, "src/assets"),
                to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
    ],

    module:{
        rules:[
          {
                test : /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        },
                    },
                    'css-loader'
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use:[MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
}