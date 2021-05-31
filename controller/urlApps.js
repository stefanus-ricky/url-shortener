const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongooseUtil = require("../models/mongooseUtil");
const urlModel = require('../models/urlSchema');
const path = require('path');

//get db connection
mongoose.connection = mongooseUtil.getDb();



router.get('/', (req,res) => {
    // console.log('url apps router get');
    // console.log(`req.baseUrl is ${req.baseUrl} `);
    let query = req.baseUrl.split(/\//);
    let queryUrl = query[1];
    if(query[1] == "u" ){
        queryUrl = query[2];
    } 
    // console.log(`queryUrl is ${ueryUrl} `);


    (async function(){ 
        try {
            const urlList = await urlModel.findOne({shortUrl: queryUrl});
            // const all = await urlModel.find();
            // console.log(all)
            // console.log(`shorturl is ${urlList} and end url  is ${urlList.endUrl}`);
            if(urlList) {
                res.status(301).redirect("http://"+ urlList.endUrl);
            } else {
                res.status(404).sendFile(path.join(__dirname, '../public/pagenotfound.html'));
            }
        } catch (err) { 
            console.error(err);
        }
    })();

    // console.log(req.baseUrl);
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