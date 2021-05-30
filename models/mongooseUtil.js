const mongoose = require('mongoose');
const { on } = require('nodemon');
const nodemon = require('nodemon');
require('dotenv').config();
const localUrl = process.env.DB_LOCAL;

//url builder using dotenv variable
// const onlineUrl = "mongodb+srv://user:pass@hostname/dbname?retryWrites=true&w=majority"

const onlineUrl =
"mongodb+srv://"+ process.env.USER+ ":" +
process.env.DB_PASSWORD +
"@" +
process.env.DB_HOST +
"/" +
process.env.DB_NAME +
"?retryWrites=true&w=majority";

let usedUrl = localUrl;
if(process.env.NODE_ENV == "production"){
  usedUrl = onlineUrl;  
}

let mongooseDB;

// fix deprecated method warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = {
    connectToServer: function(callback) {
        mongoose.connect(localUrl,  {useUnifiedTopology: true, useNewUrlParser: true}, function( err, client ) {
        mongooseDB = mongoose.connection;
        mongooseDB.on('error', (err) => console.error(err) );
        mongooseDB.once('open', () => console.log(`Connecting to mongodb database: ${process.env.DB_NAME}`));
        return callback( err );
      });
    },
    // to use connection write this
    // mongoose.connection = mongooseUtil.getDb(); 
    getDb: function() {
      return mongooseDB;
    }
  };
