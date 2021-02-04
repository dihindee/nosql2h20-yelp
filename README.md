# nosql2h20-yelp


## Local deploy
Приложение работает на 8080 порту, mongodb 27017

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
## Импорт и настройка базы данных
Для импорта данных и настройки требуется установленный mongoimport, python3 и библиотека pymongo


Если не установлены python3 и pymongo, не будет произведена индексация, что негативно скажется на быстродействии
1. Запустить контейнер с mongodb
2. Скачать архив https://www.kaggle.com/yelp-dataset/yelp-dataset, распаковать
3. Скопировать файлы из папки import_scripts к файлам распакованного архива
4. Запустить скрипт import_dataset_to_mongo.sh

## Demo work app

[![Screencast](https://i.ytimg.com/vi/dPlxQdiKjcg/maxresdefault.jpg)](https://youtu.be/dPlxQdiKjcg "Screencast")
