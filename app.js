const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const dayjs = require('dayjs');

// express
const express = require ('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');

// db
const mongoose = require('mongoose');
const urlModel = require('./models/urlSchema');
const mongooseUtil = require('./models/mongooseUtil');
const MongoStore = require('connect-mongo')(session);

const { send } = require('process');
const { initialize } = require('passport');

const morgan = require ('morgan');
const passport = require('passport');
const initializePassport = require('./passport-config');
initializePassport (
  passport,
  email => req.body.email
);

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(flash());
app.use(session({
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized:false,
  store: new MongoStore ({mongooseConnection:mongoose.connection})
}));

//  ___________________________________________________ PASSPORT 
// passport
app.use(passport.initialize());
app.use(passport.session());

// routes, add after passport init
const submitRouter = require('./controller/submit');
const urlAppsRouter = require('./controller/urlApps');
const loginRouter = require('./controller/login');
const registerRouter = require('./controller/register');

// connect to server 
mongooseUtil.connectToServer(function( err ) {
    if (err) console.log(err);
  });
// get db
mongoose.connection = mongooseUtil.getDb();

// MORGAN logger
// create a write stream with a(append) mode
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// log every request
let count = 1;
app.use((req, res, next) => {
  console.log(`${count}. request logger: req path is ${req.url}`);
  console.log(dayjs().format('    hh:mm:ss A'));
  // console.log(dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z'));
  count++;
  next();
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

// ROUTER

app.use('/submit', submitRouter);
// TODO: testing router file

app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use(express.static("public"));
// check unknown url from database
// app.use("*", urlAppsRouter);
app.use('/url/:id', urlAppsRouter, (req, res, next)=>{
  next();
});

app.use('/', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './public/pagenotfound.html'));
});
 

//static folder
// app.use(express.static("public"), (req,res, next) =>{
//   console.log(`static file requested ${req.url}`);
//   next();
// });


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