var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

    // данные пользователя
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        const details = {'_id': new ObjectID(id)};
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                console.log(err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log(item);
                res.send(item);
            }
        });
    });
    // обзоры пользователя
    app.get('/users/:id/reviews', (req,res) => {
        const id = req.params.id;
        db.collection('reviews').find({'userId':new ObjectID(id)}, (err, item) =>{
            if(err){
                console.log(err);
                res.send({'error' : 'An error has occured'});
            } else {
                console.log(item);
                res.send(item);
            }
        });
    });
    // советы пользователя
    app.get('/users/:id/tips', (req, res) => {
        const id = req.params.id;
        db.collection('tips').find({'userId': new ObjectID(id)}, (err, item) =>{
            if(err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item);
                res.send(item);
            }
        });
    });

    // поиск заведений с фильтром

    app.get('business/search', (req,res) => {
        const city = req.params.city;
        const state = req.params.state; // по идее в запросе только один из city и state
        const minStars = req.params.stars;
        const categories = req.params.categories;
        var query  = {};
        if(city !== undefined)
            query.city = city;
        if(state !== undefined)
            query.state = state;
        if(minStars !== undefined)
            query.stars = {$gte: minStars};
        if(categories !== undefined)
            query.categories = {$all : categories};
        db.collection('business').find(query, (err, item) => {
           if(err){
               console.log(err);
               res.send({'error':'An error has occured'});
           } else{
               console.log(item);
               res.send(item);
           }
        });
    });

    // данные заведения
    app.get('/business/:id',(req,res) => {
       const id = req.params.id;
       db.collection('business').findOne({'_id': new ObjectID(id)}, (err,item) =>{
           if(err){
               console.log(err);
               res.send({'error': 'An error has occurred'});
           } else {
               console.log(item);
               res.send(item);
           }
       });
    });
    // обзоры на заведения
    app.get('/business/:id/reviews',(req,res) => {
        const id = req.params.id;
        db.collection('reviews').find({'businessId':new ObjectID(id)}, (err, item) =>{
           if(err){
               console.log(err);
               res.send({'error' : 'An error has occured'});
           } else {
                console.log(item);
                res.send(item);
           }
        });
    });
    // советы в заведении
    app.get('/business/:id/tips', (req, res) => {
        const id = req.params.id;
        db.collection('tips').find({'businessId': new ObjectID(id)}, (err, item) =>{
            if(err) {
                console.log(err);
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item);
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
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
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
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
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
    // Проблема: файл может быть очень большим => все упадет
    app.post('/add/users', (req, res) => {
        //...
    });
    app.post('/add/business', (req, res) => {
        //...
    });
    app.post('/add/review', (req, res) => {
        //...
    });
    app.post('/add/tip', (req, res) => {
        //...
    });
};

