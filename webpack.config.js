const path = require('path')
const nodeExtarnals = require("webpack-node-externals")
const NodemonPlugin = require("nodemon-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = [{
  // // ---- クライアント機能のバンドル ----
  // モード選択
  // development -> ソースマップ有効
  // production  -> 最適化有効
  mode: "development",

  // エントリーポイントの設定（メインとなるJavaScriptファイル）
  entry: {
    client: "./src/client/index.js"
  },
  // 出力設定
  output: {
    publicPath: "/",
    filename: `bundle.js`,
    // expressでpublicフォルダ直下を静的に読み込むように設定するので、そこへ出力
    path: `${__dirname}/public`
  },
  module: {
    rules: [{
        // .ts の場合読み込むモジュール
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // .pug の場合読み込むモジュール
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js",".ts"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.join(__dirname, 'src/client/view/index.pug'),
      filename: "index.html"
    })
  ]
}, {
  // // ---- Nodeサーバーで動く機能をバンドル
  // モード選択
  // development -> ソースマップ有効
  // production  -> 最適化有効
  mode: "development",
  
  // エントリーポイントの設定（メインとなるJavaScriptファイル）
  entry: {
    server: "./src/server/index.ts"
  },  
  // 出力設定
  output: {
    publicPath: "/",
    filename: `bundle.js`,
    // expressでpublicフォルダ直下を静的に読み込むように設定するので、そこへ出力
    path: `${__dirname}/dist`
  },
  target: "node",
  node: {
    // expressを使用する際はこの設定をしないとエラーとなる
    // 参考：https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334
    __dirname: false,
    __filename: false,
  },

  externals: [nodeExtarnals()],
  module: {
    rules: [{
      // .ts の場合読み込むモジュール
      test: /\.ts$/,
      use: "ts-loader",
      exclude: "/node_modules/",
    }]
  },
  plugins: [
    new NodemonPlugin()
  ],
  resolve: {
    extensions: [".js",".ts"]
  }
}]