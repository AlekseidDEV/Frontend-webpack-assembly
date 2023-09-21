const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = ext => (isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`);

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js'),
        // ===========================================================
        // about: path.resolve(__dirname, 'src' , 'about.js'), example
        // ===========================================================
    },
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: './img/[name][ext]',
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 9000,
        compress: true,
        open: true,
        hot: true,
    },

    optimization: optimization(),

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            minify: {
                collapseWhitespace: isProd,
            },
        }),

        // =========================================================
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src/about.html'),
        //     filename: 'about.html',
        //     chunks: ['about'],
        //     minify: {
        //         collapseWhitespace: isProd
        //     }
        // }), example
        // =========================================================

        new MiniCssExtractPlugin({
            filename: `./style/${filename('css')}`,
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
            ],
        }),
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        },
                    },
                    'css-loader',
                ],
            },

            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|jpe?g)$/i,
                type: 'asset/resource',
                use: {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65,
                        },
                        pngquant: {
                            quality: [0.65, 0.9],
                            speed: 4,
                        },
                    },
                },
            },

            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/icon/[name][ext]',
                },
            },

            {
                test: /\.(ttf|otf|woff?2|eot)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },

            //==============================
            //   {
            //     test: /\.js$/i,
            //     exclude: /node_modules/,
            //     use: ['babel-loader'],
            //   }
            // at your look
            //==============================
        ],
    },
};
