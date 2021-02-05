FROM node:alpine3.10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

#COPY . .

EXPOSE 8999 3000

CMD ["node","server.js"]
