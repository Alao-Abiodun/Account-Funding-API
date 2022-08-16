FROM node:14

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

ENV PORT 8880

EXPOSE $PORT

CMD ["yarn", "run", "dev"]