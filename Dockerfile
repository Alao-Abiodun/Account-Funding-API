FROM node:14

EXPOSE 8080

WORKDIR /src/app

RUN npm install i npm@latest -g

COPY package*.json ./

COPY . .

CMD ["npm", "run", "start"]