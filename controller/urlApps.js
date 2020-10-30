const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongooseUtil = require("../models/mongooseUtil");
const urlModel = require('../models/urlSchema');

//get db connection
mongoose.connection = mongooseUtil.getDb();



router.get('/', (req,res) => {
    console.log('url apps router get');
    console.log(`req.baseUrl is ${req.baseUrl} `);
    req.baseUrl = req.baseUrl.split(/\//)[2];
    console.log(`req.baseUrl[2] is ${req.baseUrl} `);


    (async function(){ 
        try {
            const urlList = await urlModel.findOne({shortUrl:req.baseUrl});
            console.log(`shorturl is ${urlList.shortUrl} and end url  is ${urlList.endUrl}`);
            res.status(301).redirect("http://"+ urlList.endUrl);
        } catch (err) { 
            console.log(err);
        }
    })();

    console.log(req.baseUrl);
    // res.redirect(req.baseUrl);
    // res.redirect('/');
});


module.exports = router;

/*
try {
    const urlList = await urlModel.findOne({owner:"mongooseUtilsTest"});
    console.log(`end url  is ${urlList}`);
    console.log(urlList.endUrl === "www.example.com/123");
    expect(urlList.endUrl).to.equal("www.example.com/123");
    done();        
  } catch (err) { console.log(err);}
}
test();
*/