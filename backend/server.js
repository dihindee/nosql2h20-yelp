'use strict';

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

app.use(bodyParser.urlencoded({extended :true}));

const port = 8080;
const host = '127.0.0.1';


MongoClient.connect(db.url,{ useUnifiedTopology: true } , (err, database) => {
  if (err)
      return console.log(err);

    require('./routes')(app,database);
    app.listen(port,host,()=>{
        console.log('We live on' + port);
    })
});



//app.listen(port,host);
console.log('running on http://'+`${host}`+':'+`${port}`);