const express = require ('express');
const router = express.Router();
const dayjs = require('dayjs');
const mongoose = require('mongoose');
const mongooseUtil = require("../models/mongooseUtil");
const userModel = require('../models/userSchema');
const path = require('path');



// ______________________ POST router
router.post('/', function(req, res){
    console.log('post user is requested');
    console.log(req.body);
    const data = req.body;
    data.registerDate= dayjs().format('DD/MM/YY, hh:mm:ss A, UTC Z');
    console.log(`userdata is ${data}`);
    const newdata = new userModel (data);
    console.log(`newdata is ${newdata}`);
    mongoose.connection = mongooseUtil.getDb();

    (async function () {
      try {
        await newdata.save();
        console.log('username succesfully inserted');
        res.redirect('/register/success.html');
        res.end();
      } catch (err) { 
        console.log(err);
        res.redirect('/register/failed.html');
        res.end();
      }
    })();
  });

router.get('/', (req,res) => {
    console.log('register router get');
    res.status(200).sendFile(path.join(__dirname, '../public/register/index.html'));
    console.log(path.join(__dirname, '../public/register/index.html'));
    // res.redirect('/');
});

module.exports = router;