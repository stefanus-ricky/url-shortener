const MongoClient = require( 'mongodb' ).MongoClient;
require('dotenv').config();
const url =
"mongodb+srv://"+ process.env.USER+ ":" +
process.env.DB_PASSWORD +
"@" +
process.env.DB_HOST +
"/" +
process.env.DB_NAME +
"?retryWrites=true&w=majority";

const localUrl = process.env.DB_LOCAL || "mongodb://localhost:27017";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect(url,   { useUnifiedTopology: true } , function( err, client ) {
      if(err){console.log(err);}

      console.log(`Connecting to mongodb database: ${process.env.DB_NAME}`);
      _db  = client.db(process.env.DB_NAME);
      console.log(`db is  ${_db}`);
      return callback( err );
    } );
  },
  

  getDb: function() {
    return _db;
  }
};

// usage example
// var mongoUtil = require( 'mongoUtil' );

// mongoUtil.connectToServer( function( err, client ) {
//   if (err) console.log(err);
//   // start the rest of your app here
// } );

