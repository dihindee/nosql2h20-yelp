FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install
RUN npm install -g @vue/cli

#COPY . ./app
#COPY babel.config.js .

#RUN npm run build

#EXPOSE 8080
CMD ["npm", "run", "serve"]