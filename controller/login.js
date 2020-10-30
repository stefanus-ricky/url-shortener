const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongooseUtil = require("../models/mongooseUtil");
const userModel = require('../models/userSchema');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport')


// authenticate using passport
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


// retrieve login using mongoose
// ______________________ POST router
// router.post('/', function(req, res){
//     console.log('user trying to login');
//     console.log(req.body);
//     const data = req.body;
//     console.log(`userdata is ${data}`);
//     mongoose.connection = mongooseUtil.getDb();

//     (async function () {
//       try {
//         const user = await userModel.findOne({email:data.email});
//         console.log(`user found, pass is ${user.password}`);

//         //authenticate

//         // Load hash from your password DB.
//         bcrypt.compare(data.password, user.password, function(err, result) {
//           // result == true
//           console.log(`match`);
//           res.redirect('/login/success.html');
//           res.end();
//         });

//       } catch (err) { 
//         console.log(err);
//         res.redirect('/login/failed.html');
//         res.end();
//       }
//     })();
//   });

router.get('/', (req,res) => {
    console.log('login router get');
    res.status(200).sendFile(path.join(__dirname, '../public/login/index.html'));
    console.log(path.join(__dirname, '../public/login/index.html'));
    // res.redirect('/');
});

module.exports = router;