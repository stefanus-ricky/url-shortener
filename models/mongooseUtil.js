const mongoose = require('mongoose');
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

// fix deprecated method warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = {

    connectToServer: function(callback) {
        // console.log(`mongoose utils trying to connect`);
        mongoose.connect(localUrl,  {useUnifiedTopology: true, useNewUrlParser: true}, function( err, client ) {
        mongooseDB = mongoose.connection;
        mongooseDB.on('error', (err) => console.error(err) );
        mongooseDB.once('open', () => console.log(`Connecting to mongodb database: ${process.env.DB_NAME}`));
        // console.log(`err is ${err} typeof err is ${typeof err}`);
        return callback( err );
      });
    },
    
    // to use connection write this
    // mongoose.connection = mongooseUtil.getDb(); 
    getDb: function() {
      return mongooseDB;
    }
  };
