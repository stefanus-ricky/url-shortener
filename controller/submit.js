const express = require ('express');
const router = express.Router();
const dayjs = require('dayjs');
const fs = require('fs');
const mongoose = require('mongoose');
const urlModel = require('./models/urlSchema');

// ______________________ POST router
router.post('/submit', function(req, res){
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


module.exports = router;