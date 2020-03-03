# 使用するnode.jsバージョン
FROM node:10

# 仮想環境で使用するコマンドラインをshへ設定
CMD ["sh"]

ENV NODE_ENV=development

# イメージ内にアプリケーションコードを入れるdirectory
WORKDIR /app

# ポート5000番を開放
EXPOSE 5000
