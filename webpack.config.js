
// 安装插件
// npm init –y 初始化项目
// npm i -D @babel/core @babel/preset-env babel-loader core-js
// npm i -D clean-webpack-plugin
// npm i -D webpack-dev-server
// npm i -D html-webpack-plugin
// npm i -D webpack webpack-cli typescript ts-loader
// npm i -D postcss postcss-loader postcss-preset-env

// 引入一个包
// path是nodejs里面的一个模块 主要是用来帮助拼接路劲
const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
  mode: 'development',
  /* 
  指定入口文件
   */
  entry: './src/index.ts',
  /*
  指定输出的目录
  */
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件名称
    filename: 'bundle.js',
    // 告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false
    }
  },
  /**
   * 指定webpack打包时要使用的模块
   */
  module: {
    //指定加载的规则是数组 可以为多个规则
    rules: [
      { 
        // test 指定的是规则生效的文件为正则表达式，会通过正则表达式去匹配需要编译的文件
        test: /\.ts$/,
        // 用ts-loader去处理以ts结尾的文件
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置loader
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 需要兼容的目标浏览器
                    targets: {
                      "chrome":"38",
                      "ie": "11"
                    },
                    // 指定coreJS的版本
                    "corejs": "3", // 可以用来实现promise
                    // 使用corejs的方式  usage表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 'babel-loader',
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      //设置less文件的处理
      {
        test: /\.less$/,
        // use内的执行顺序是从下向上执行的
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                 [
                  "postcss-preset-env",
                  {
                    browsers: 'last 2 versions'
                  }
                 ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]

  },
  // 配置webpack插件
  plugins:[
    // 先清空输出的目录下的文件在生成新的文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: '自定义', // 自定义名称
      template: './src/index.html' // 指定模板
    }),
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
  ],
  // 用来设置引用模块 以ts结尾或者以js结尾的文件均可以作为
  // 模块互相引用
  resolve: {
    extensions: ['.ts', '.js']
  }
}
