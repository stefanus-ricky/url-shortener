const http = require('http');
const url = require('url');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');


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
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/submit", (req, res) => {
    res.sendFile(`${__dirname}/public/sucess.html`);
    console.log('submit is requested');
    console.log(req.query['ori-url']);
    console.log(req.query);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
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
