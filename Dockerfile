# 使用するnode
FROM node:10

#
CMD ["sh"]

ENV NODE_ENV=development

# イメージ内にアプリケーションコードを入れるdirectory
WORKDIR /app

# ポート5000番を開放
EXPOSE 5000