const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');

const mongodb = require("mongodb");
const mongoUtil= require('./mongoUtil');
let database;
const dayjs = require('dayjs');
// mongoUtil.connectToServer( function( err, client ) {
//   if (err) console.log(err);
//   database = mongoUtil.getDb();
//     const testingData= database.collection( 'url' ).find({}).toArray(function(err, docs) {
//     console.log(docs.length);
//     docs.forEach(element => console.log(element.endUrl));
//   });
//   // start the rest of your app here
// } );



// ______________________ mongoose

const mongoose = require('mongoose');
const urlModel = require('./models/urlSchema');
const localUrl = process.env.DB_LOCAL;
mongoose.connect(localUrl,  { 
  useUnifiedTopology: true,  
  useNewUrlParser: true  
});
const mongooseDB= mongoose.connection;
mongooseDB.on('error', (err)=>console.error(err));
mongooseDB.once('open', ()=> console.log(`connected to database`));
const testdata = new urlModel ({endUrl: "www.example.com/1", shortUrl:"/exam1"});

async function addTest(){
  //create
  try {
    await testdata.save();
    console.log(`test data saved`);
  } catch (err) { }

  // update
  try {
    await urlModel.find({endUrl: testdata.endUrl});
    console.log(`url = ${testdata.shortUrl}`);


    const conditions = { endUrl: testdata.endUrl };
    const update = { shortUrl : "/exam21"};
    const options = { multi: true };

    urlModel.updateOne(conditions, update, options, callback);


    console.log(`test data updated`);
  } catch (err) { console.log(err);}
  // read
  try {
    const urlList = await urlModel.find({});
    console.log(`url list is ${urlList}`);
  } catch (err) { console.log(err);}
  // delete
  try {
    await urlModel.deleteOne({ owner:'testo' } , callback);
    console.log(`data deleted`);
  } catch (err) { console.log(err);}


}
addTest();

function callback (err) {
  if(err) {
    console.log(err);
  }
  // numAffected is the number of updated documents
}


async function testLocal(res){
  try {
    const url = await urlModel.find();
    console.log(` ${url}`);
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
}




// ______________________ express

const express = require ('express');
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));




// log every request
app.use((req, res, next) => {
  console.log(`request logger: req path is ${req.url}`);
  //console.log(Date(new Date().getTime()));
  console.log(dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z'));
  next();
});


//static folder
app.use(express.static("public"));





// ______________________ POST router
app.post('/submit', function(req, res){
  console.log('post submit is requested');
  console.log(req.body);
  const data = req.body;
  data.timestamp= dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z');
  const testingData= database.collection( 'url' ).find({}).toArray(function(err, docs) {
  console.log(docs.length);
  docs.forEach(element => console.log(element.endUrl));



  let url = database.collection("url").insertOne(data);
  console.log('data succesfully inserted');
  //await cursor.forEach(console.dir);
  res.sendFile(`${__dirname}/public/sucess.html`);


  });
});


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
const registerRouter = require('./routes/register');
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
