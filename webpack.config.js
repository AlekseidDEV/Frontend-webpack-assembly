const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`




module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry:path.resolve(__dirname, 'src' , 'index.js'),
    output:{
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist')
    },

    module:{
        rules:[
            // ruls
        ]
    },
}