const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isEnvProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '',
  chainWebpack (config) {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      .set('utils', resolve('src/utils'))
    config.plugin('html').tap(args => {
      if (isEnvProduction) {
        args[0].minify.minifyJS = true
        args[0].minify.minifyCSS = true
      }
      return args
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/styles/var.less'),
        resolve('src/styles/mixin.less')
      ]
    }
  },
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    // proxy: {
      // '/':{
      //   target: 'http://192.168.2.209:3000',
      //   secure: false,
      //   changeOrigin: true,
      //   ws: true, // websocket代理
      // },
      // '/test':{
      //   target: 'http://192.168.2.209:4000',
      //   secure: false,
      //   changeOrigin: true,
      //   ws: true, // websocket代理
      // },
      
    // }
  }
}
