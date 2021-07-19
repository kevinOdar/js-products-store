const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    mode: 'development',
    optimization: {
      minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    module: {
      rules: [
        { 
            test: /\.css$/, 
            exclude: /styles\.css$/,
            use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }           
                }
            ] 
        },
        { 
          test: /styles\.css$/, 
          use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }           
              }
          ] 
        },
        {
            test: /\.html$/,
            use: [
                { 
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      esModule: false,
                      name: 'assets/[name].[ext]'
                  }
              }
          ]
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html',
            filename: './index.html' 
        }),
        new MiniCssExtractPlugin({ 
          filename: '[name].css',
          ignoreOrder: false
        })
    ],
};