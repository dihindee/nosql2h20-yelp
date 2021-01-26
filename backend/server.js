'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());


const clientUrl = 'http://localhost:8080';
app.use(cors())
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', clientUrl);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



MongoClient.connect(db.url,{ useUnifiedTopology: true } , (err, database) => {
  if (err)
      return console.log(err);

    const port = 3000;
    const host = '0.0.0.0';

    require('./routes')(app,database);
    app.listen(port,host,()=>{
        console.log('Db server start on port:' + port);
    })

    startWebSocketServer();
});



function startWebSocketServer(){
    const app = express();

    // тут должны быть веб сокеты
    const port = 8999;
    const host = '0.0.0.0';

    app.use(bodyParser.urlencoded({extended :true}));

    app.get('/api', ((req, res) => {
        res.send('Server work!');
        console.log("Api request: "+ req.body)

    }) );


    app.listen(port,host,()=>{
        console.log('Api server on port: ' + port);
    })

    console.log('running on http://'+`${host}`+':'+`${port}`);
}