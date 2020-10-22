const express = require ('express');
const router = express.Router();
const dayjs = require('dayjs');
const mongoose = require('mongoose');
const urlModel = require('./models/urlSchema');

// ______________________ POST router
router.post('/', function(req, res){
    console.log('post submit is requested');
    console.log(req.body);
    const data = req.body;
    data.timestamp= dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z');
    mongoose.connection = mongooseUtil.getDb();


  
  
  
    let url = database.collection("url").insertOne(data);
    console.log('data succesfully inserted');



    res.sendFile(`${__dirname}/public/sucess.html`);
  
  
  });


module.exports = router;