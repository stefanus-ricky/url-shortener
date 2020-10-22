const mongoose = require('mongoose');
const urlModel = require('./urlSchema');
require('dotenv').config();
const localUrl = process.env.DB_LOCAL;


const onlineUrl =
"mongodb+srv://"+ process.env.USER+ ":" +
process.env.DB_PASSWORD +
"@" +
process.env.DB_HOST +
"/" +
process.env.DB_NAME +
"?retryWrites=true&w=majority";

let mongooseDB;
console.log(`loading mongoose utils`);





module.exports = {

    connectToServer: function(callback) {
        console.log(`mongoose utils trying to connect`);
        mongoose.connect(localUrl,  {useUnifiedTopology: true, useNewUrlParser: true}, function( err, client ) {
        mongooseDB = mongoose.connection;
        mongooseDB.on('error', (err) => console.error(err) );
        mongooseDB.once('open', () => console.log(`Connecting to mongodb database: ${process.env.DB_NAME}`));
        return callback( err );
      } );
    },
    
  
    getDb: function() {
      return mongooseDB;
    }
  };
