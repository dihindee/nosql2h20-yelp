var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

    // данные пользователя
    app.get('/users/profile/:id', (req, res) => {
        const user_id = req.params.id;
        console.log('/users/:id');
        const details = {'user_id': user_id};
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occurred'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });
    // минимальные данные для отображения вне профиля
    app.get('/users/mini/:id', (req, res) => {
        const user_id = req.params.id;
        console.log('/users/mini/:id');
        db.collection('users').findOne({'user_id': user_id}, {'name': 1}, (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });
    // обзоры пользователя
    app.get('/users/reviews/:id', (req, res) => {
        const user_id = req.params.id;
        console.log('/users/:id/reviews');
        db.collection('reviews').find({'user_id': user_id}).toArray( (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });
    // советы пользователя
    app.get('/users/tips/:id', (req, res) => {
        const user_id = req.params.id;
        console.log('/users/:id/tips');
        db.collection('tips').find({'user_id': user_id}).toArray( (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });

    // поиск заведений с фильтром
    // выключены ненужные поля для отображения в поисковой выдаче
    app.get('business/search', (req, res) => {
        console.log('business/search');
        const city = req.params.city;
        const state = req.params.state; // по идее в запросе только один из city и state
        const minStars = req.params.stars;
        const categories = req.params.categories;
        var query = {};
        if (city !== undefined)
            query.city = city;
        if (state !== undefined)
            query.state = state;
        if (minStars !== undefined)
            query.stars = {$gte: minStars};
        if (categories !== undefined)
            query.categories = {$all: categories};
        db.collection('business').find(query, {
            'name': 1,
            'address': 1,
            'city': 1,
            'state': 1,
            'stars': 1
        }).toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });

    // данные заведения
    app.get('/business/profile/:id', (req, res) => {
        const business_id = req.params.id;
        console.log('/business/:id');
        db.collection('business').findOne({'business_id': business_id}, (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    // обзоры на заведения
    app.get('/business/reviews/:id', (req, res) => {
        const business_id = req.params.id;
        console.log('/business/:id/reviews');
        db.collection('reviews').find({'business_id': business_id}).toArray( (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });
    // советы в заведении
    app.get('/business/tips/:id', (req, res) => {
        const business_id = req.params.id;
        console.log('/business/:id/tips');
        db.collection('tips').find({'business_id': business_id}).toArray( (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                // console.log(item);
                res.send(item);
            }
        });
    });


    // такой запрос вряд ли нужен
    /*
        // получение всех записей из коллекции
        app.get('/users', (req, res) => {

            db.collection('users').find({}).toArray((err, item) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    console.log(item);
                    res.send(item);
                }
            });


        });
     */
    /*
        // добавление данных
        app.post('/add', (req, res) => {
            console.log(req.body);
            const note = {text: req.body.body, title: req.body.title};
            db.collection('users').insertOne(note, (err, result) => {
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.send(result.ops[0]);
                }
            })
        });
    */
    // удаление записи
    app.delete('/users/:id', (req, res) => {
        const user_id = req.params.id;
        const details = {'user_id': user_id};
        db.collection('users').deleteOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Users ' + id + ' deleted!');
            }
        });
    });

    // обновление записи
    app.put('/users/:id', (req, res) => {
        const user_id = req.params.id;
        const details = {'user_id': user_id};
        const note = {$set: {text: req.body.body, title: req.body.title}};
        db.collection('users').updateOne(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });


    // импорт в коллекции из файлов пользователя
    // Скрипт на стороне пользователя посылает по несколько документов
    app.post('/add/users', (req, res) => {
        const users = req.params.batch;
        db.colleclion('users').insertMany(users, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });
    app.post('/add/business', (req, res) => {
        const business = req.params.batch;
        db.colleclion('business').insertMany(business, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });
    app.post('/add/reviews', (req, res) => {
        const reviews = req.params.batch;
        db.colleclion('reviews').insertMany(reviews, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });
    app.post('/add/tips', (req, res) => {
        const tips = req.params.batch;
        db.colleclion('tips').insertMany(tips, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result);
            }
        });
    });
};

