const dbRoutes = require('./db_routes');
const db_name = 'userdb';
module.exports = function (app,db){
  dbRoutes(app,db.db(db_name));



  app.get('/', ((req, res) => {
    res.send('test');

  }) );

  app.get('/help', ((req, res) => {
    res.send('i need some body help');
  }) );
};