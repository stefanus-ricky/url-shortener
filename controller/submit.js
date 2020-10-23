const express = require ('express');
const router = express.Router();
const dayjs = require('dayjs');
const mongoose = require('mongoose');
const mongooseUtil = require("../models/mongooseUtil");
const urlModel = require('../models/urlSchema');

// ______________________ POST router
router.post('/', function(req, res){
    console.log('post submit is requested');
    console.log(req.body);
    const data = req.body;
    data.timestamp= dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z');
    console.log(`data is ${data}`);
    const newdata = new urlModel (data);
    console.log(`newdata is ${newdata}`);
    mongoose.connection = mongooseUtil.getDb();

    (async function () {
      try {
        await newdata.save();
        console.log('data succesfully inserted');
        res.redirect('/success.html');
        res.end();
      } catch (err) { 
        console.log(err);
        res.redirect('/failed.html');
        res.end();
      }
    })();
  });
module.exports = router;