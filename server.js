const http = require('http');
const url = require('url');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const  mongodb = require("mongodb");


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
  console.log(dateFormat(new Date(), "dd/mm/yy, hh:mm:ss TT"));
  next();
});


//static folder
app.use(express.static("public"));

app.post('/submit', function(req, res){ 
  res.sendFile(`${__dirname}/public/sucess.html`);
  console.log('post submit is requested');   
  console.log(req.body);
  const data = req.body;
  data.timestamp= dateFormat(new Date(), "dd/mm/yy, hh:mm:ss TT");

  //DB
  const uri =
  "mongodb+srv://"+ process.env.USER+ ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_HOST +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";
  console.log(`uri is ${uri}`);
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });

console.log('trying to connect');
client.connect(async (err, dbb) => {
  if (err) throw err;
  console.log('connected to db');
  let url_shortener = client.db("url_shortener");
  let url = await url_shortener.collection("url").insertOne(data);
  console.log('data succesfully inserted');
  //await cursor.forEach(console.dir);
  client.close();

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
  console.log(generateURL());
  res.redirect('/');
  res.end();
});

app.get("/submit", (req, res) => {
    res.sendFile(`${__dirname}/public/sucess.html`);
    console.log('submit is requested');
    console.log(req.query['ori-url']);
    console.log(req.query);
});



//Database 
//
const registerRouter = require('./routes/register');
app.use('/register', registerRouter);



// listen for requests 
const listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});


/*
// nodejs server without express
http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080); 
*/
