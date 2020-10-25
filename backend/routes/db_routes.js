var ObjectID = require('mongodb').ObjectID;
module.exports = function (app,db){

    // получение данных по id
    app.get('/users/:id',(req,res) => {
        const id = req.params.id;
        console.log(id);
        const details = {'_id': new ObjectID(id)};
        db.collection('users').findOne(details,(err, item) =>{
           if(err) {
               res.send({'error': 'An error has occurred'});
           } else{
               console.log(item);
               res.send(item);
           }
       });


    });

    // получение всех записей из коллекции
    app.get('/users',(req,res) => {

        db.collection('users').find({}).toArray((err, item) =>{
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else{
                console.log(item);
                res.send(item);
            }
        });


    });

    // добавление данных
    app.post('/add',(req,res)=>{
        console.log(req.body);
        const note = {text:req.body.body, title: req.body.title};
        db.collection('users').insertOne(note, (err,result)=>{
            if(err){
                res.send({'error' : 'An error has occurred'});
            }else{
                res.send(result.ops[0]);
            }
        })
    })

    // удаление записи
    app.delete('/users/:id',(req,res)=>{
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').deleteOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Users ' + id + ' deleted!');
            }
        });
    });

    // обновление записи
    app.put ('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { $set: {text: req.body.body, title: req.body.title} };
        db.collection('users').updateOne(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};

