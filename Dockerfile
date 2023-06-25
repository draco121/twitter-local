FROM node:18-buster-slim

WORKDIR /app

ADD . .

RUN npm i --production

ENTRYPOINT [ "npm","run","start"]