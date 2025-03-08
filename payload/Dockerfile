# payload/Dockerfile
FROM node:22-alpine

# 作業ディレクトリを設定
WORKDIR /app

# payload コンテナ用のコードをコピー
COPY solver.js .

# 依存関係がある場合は package.json もコピーして npm install する
# COPY package.json .
# RUN npm install

# コンテナ起動時に solver.js を実行
CMD ["node", "solver.js"]
