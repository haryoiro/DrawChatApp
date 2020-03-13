const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


const clientConfig = {
  mode: "development",
  // mode: "production",
  devtool: "source-map",
  entry: "./src/public/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'index.js'
  },
  target: "web",
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".html"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"
    }),
    new NodemonPlugin({
    })
  ]
}

const serverConfig = {
  mode: "development", // <- 圧縮無効 早い
  // mode: "production", // <- 圧縮有効 遅い
  devtool: "production",
  entry: "./src/server.ts",
  output: {
    filename: `server.js`,
    path: `${__dirname}/dist`
  },
  target: "node",
  /* outDirはtsconfig.jsonのものが有効になる */
  node: {
    __dirname: false,
    __firename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new NodemonPlugin({
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".html"]
  }
}

module.exports = [clientConfig, serverConfig]