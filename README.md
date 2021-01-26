# nosql2h20-yelp


## Local deploy
Приложение работает на 8080 порту, mongodb 27017, backend на 3000 и 8999

###Запуск с помощью docker-compose
```
git clone [link]
docker-compose up
```
Используйте флаг ``` --build``` для принудительной перезборки приложения, если вносили изменения модули или packege.json 
backend

###backend
Сервер приложения server.js
```
node backend/server.js
```

###mongo

Запуск mongodb
```
sudo systemctl start mongod
```

Остановка mongodb

```
sudo systemctl stop mongod
```

###Vue/cli
Запуск vue.js
```
npm run serve
```

## Demo work app

[![Screencast](https://i.ytimg.com/vi/dPlxQdiKjcg/maxresdefault.jpg)](https://youtu.be/dPlxQdiKjcg "Screencast")