var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    const PAGE_SIZE = 10;
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
        db.collection('users').findOne({'user_id': user_id}, {projection:{'name': 1}}, (err, item) => {
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
        let page = req.query.page;
        if (page === undefined)
            page = 1;
        db.collection('reviews').aggregate(
            [{$lookup: {from: 'business', localField: 'business_id', foreignField: 'business_id', as : 'business'}}
            , {$match:{'user_id': user_id}}])
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item.length);
                // console.log(item);
                res.send(item);
            }
        });
    });
    // советы пользователя
    app.get('/users/tips/:id', (req, res) => {
        const user_id = req.params.id;
        console.log('/users/:id/tips');
        let page = req.query.page;
        if (page === undefined)
            page = 1;
        db.collection('tips').aggregate(
            [{$lookup: {from: 'business', localField: 'business_id', foreignField: 'business_id', as : 'business'}}
            , {$match:{'user_id': user_id}}])
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item.length);
                // console.log(item);
                res.send(item);
            }
        });
    });

    // поиск заведений с фильтром
    // выключены ненужные поля для отображения в поисковой выдаче
    app.get('/business/search/', (req, res) => {
        console.log('business/search');
        console.log(req.query);
        const name = req.query.name;
        const city = req.query.city;
        const state = req.query.state;
        const minStars = req.query.stars;
        const reviews = req.query.reviews;
        const is_open = req.query.is_open;
        let categories = req.query.categories;
        const sorting = req.query.sortby;
        let sort_params = {};
        switch (sorting){
            case 'name_asc':
                sort_params.name = 1;
                break;
            case 'name_desc':
                sort_params.name = -1;
                break;
            case 'stars_asc':
                sort_params.stars = 1;
                break;
            case 'stars_desc':
                sort_params.stars = -1;
                break;
            case 'reviews_asc':
                sort_params.review_count = 1;
                break;
            case 'reviews_desc':
                sort_params.review_count = -1;
                break;
        }
        console.log(sort_params);
        let page = req.query.page;
        if (page === undefined)
            page = 1;
        var query = {};
        if (name != undefined && name != 'NULL')
            query.name = {$regex: new RegExp(name, 'i')};
        if (city != undefined && city != 'NULL')
            query.city = {$regex: new RegExp(city, 'i')};
        if (query.city === undefined && state != undefined && state != 'NULL')
            query.state = state;
        if (minStars != undefined && minStars != 'NULL')
            query.stars = {$gte: parseInt(minStars)};
        if (reviews != undefined && reviews != 'NULL')
            query.review_count = {$gte: parseInt(reviews)};
        if (is_open == true || is_open == 'true')
            query.is_open = 1;
        if (categories !== undefined && categories !== 'NULL'){
            if(! Array.isArray(categories)){
                categories = categories.split(';');
            }
                let arr = []
                categories.forEach(i =>{
                   arr.push(new RegExp(i,'i'));
                });
                console.log(arr);
                query.categories = {$in : arr};
        }
        console.log(query);
        db.collection('business').find(query, {
            'name': 1,
            'address': 1,
            'city': 1,
            'state': 1,
            'stars': 1
        }).sort(sort_params).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item.length);
                res.send(item);
            }
        });
    });

    // данные заведения
    app.get('/business/profile/:id', (req, res) => {
        const business_id = req.params.id;
        console.log('/business/:id'+ business_id);
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
        console.log('/business/reviews/:id');
        let page = req.query.page;
        if (page === undefined)
            page = 1;
        db.collection('reviews').aggregate(
            [{$lookup: {from: 'users', localField: 'user_id', foreignField: 'user_id', as : 'user'}}
            , {$match:{'business_id': business_id}}])
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray((err, item) => {
                if (err) {
                    console.log(err);
                    res.send({'error': 'An error has occured'});
                } else {
                     res.send(item);
                }
            });
        /*db.collection('reviews').find({'business_id': business_id}).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item.length);
                for(let i = 0; i < item.length; i++){
                    db.collection('users').find({user_id: item[i].user_id},{name: 1}, (err, user_item)=>{
                        // console.log('found name for '+i);
                        if(user_item){
                            item[i].user_name = user_item.name;
                        }
                    });
                }
                // console.log(Object.getOwnPropertyNames(item[0]));
                // console.log('reviews list sended');
                res.send(item);
            }
        });*/
    });
    // советы в заведении
    app.get('/business/tips/:id', (req, res) => {
        const business_id = req.params.id;
        console.log('/business/tips/:id');
        let page = req.query.page;
        if (page === undefined)
            page = 1;
        db.collection('tips').aggregate(
            [{$lookup: {from: 'users', localField: 'user_id', foreignField: 'user_id', as : 'user'}}
            , {$match:{'business_id': business_id}}])
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray((err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item.length);
                res.send(item);
            }
        });
    });

    // app.get('/business/categories', (req, res) => {
    //     db.collection("business").distinct("categories", {}).then(results => {
    //         res.send(results)
    //     }).catch(err => res.send({'error': 'An error has occured'}));
    // });

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

