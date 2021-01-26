const cors = require('cors');

const dbRoutes = require('./db_routes');
const db_name = 'yelp';
module.exports = function (app,db){
  dbRoutes(app,db.db(db_name));

  const clientUrl = 'http://localhost:8080';
  const corsOptions = {
    origin: clientUrl,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.get('/test',cors(corsOptions), ((req, res) => {
    res.send('Db server work correctly');
    console.log("Test request from Db server")

  }) );

};