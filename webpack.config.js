const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');
const path = require('path')

const mode = process.env.NODE_ENV || 'development'; 
// если среда NODE_ENV , или сам мод не установлены, то тогда будет выбираться mode production

const devMode = mode === 'development'
// булевый параметр , если режим сборки то true, иначе false, далее этот
// параметр используется в target и devtool

const target = devMode ? 'web' : 'browserslist' 
// если флаг true, то (режим разработки), то сборка будет предназначена для выполнения
// в браузере
// если false, то это говорит о том, цель устанавливается как 'browserslist', что позволяет Webpack автоматически выбирать  
// цель сборки на основе конфигурации Browserslist
const devtool = devMode ? 'source-map' : undefined 
// если режим разработки (true), создаются source maps для отладки кода, если нет, то
// тогда source map не будут созданы

module.exports = {
    mode,
    target,
    devtool,

    stats:{
        children: true
    },
    entry: path.resolve(__dirname,  'src', 'index.js'),

    output : {
        path : path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'main.[contenthash].js'
    },

    plugins:[
        ...glob.sync('src/**/*.html').map((item) => {
            return new HtmlWebpackPlugin({
                template: item,
                filename: path.relative('src', item)
            })
        })
        // глобально ищу все файлы с заданным расширением, сохраняю их пути в коллекцию
        // и вывожу каждый файл в папку dist со своим исходным именем
    ],
}