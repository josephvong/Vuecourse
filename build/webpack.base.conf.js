var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  // 入口js文件
  entry: {
    app: './src/main.js'
  },
  // js文件输出配置
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'], // 拓展名配置，设置的文件类型可以自动补全后缀名
    fallback: [path.join(__dirname, '../node_modules')], //fallback控制 调用模块时 去“node_modules“ 文件夹内调用
    alias: {  // 一些别名，在调用一些组件 时 可以 用配置好的路径别名 来代替一些组件的路径
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    // preLoaders 会在 loader 之前 处理， 优先处理 vue 和 es6 js
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot, // include 表示只对 指定路径进行编译
        exclude: /node_modules/ // exclude 表示排除对 指定路径进行编译
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {  // query 里面有 limit 选项
          limit: 10000, // 当图片小于10kb 时，图片以base64 形式打包到 build.js 里面， 若超过10kb，另外生成一个文件存放
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 定义超过10kb的图片重新生成时的命名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 配置eslint， 当检查到语法错误时，会提示友好语法错误信息提示
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    // 在此处配置 cssLoader 解析 vue 文件内的额css
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
