const path = require('path')

module.exports = {
  // モード選択
  // development -> ソースマップ有効
  // production  -> 最適化有効
  mode: "development",

  // エントリーポイントの設定（メインとなるJavaScriptファイル）
  entry: "./src/main.ts",

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        use: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".js",".ts"]
  },
  // 出力設定
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  }
}