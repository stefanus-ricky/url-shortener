const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const dayjs = require('dayjs');
// db
const mongoose = require('mongoose');
const urlModel = require('./models/urlSchema');
const mongooseUtil = require('./models/mongooseUtil');
// express
const express = require ('express');
const app = express();


// connect to server
mongooseUtil.connectToServer(function( err ) {
    if (err) console.log(err);
  });
// get db
mongoose.connection = mongooseUtil.getDb();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//static folder
app.use(express.static("public"), (req,res, next) =>{
  next();
});

// log every request
app.use((req, res, next) => {
  console.log(`request logger: req path is ${req.url}`);
  console.log(dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z'));
  next();
});

// ______________________ POST router
app.post('/submit', function(req, res){
  console.log('post submit is requested');
  console.log(req.body);
  const data = req.body;
  data.timestamp= dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z');

});

// generate next random url if shortUrl not requested
function generateURL(){
  let url;
  let fd = fs.readFileSync("./currentRandom.txt", "utf-8", (err, data) =>{
    if(err){
      console.log(err);
    }
  });
  console.log('read success');
  console.log(fd);
  fd ++;
  fs.writeFile("./currentRandom.txt", fd.toString(), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
  console.log(fd);
  //url = url+1;
  //fs.writeFileSync("/currentRandom", url);
  return fd;
}

app.post("/test", (req,res)=>{
  testLocal(res);

  // console.log(generateURL());
  // res.redirect('/');
  // res.end();
});

app.get("/submit", (req, res) => {
    res.sendFile(`${__dirname}/public/sucess.html`);
    console.log('submit is requested');
    console.log(req.query['ori-url']);
    console.log(req.query);
});

// TODO: testing router file
const registerRouter = require('./controller/register');
app.use('/register', registerRouter);

// listen for requests
const listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
    console.log(dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z'));
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

/*





*/
