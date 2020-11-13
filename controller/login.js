const express = require ('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
// authenticate using passport
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// router.post('/', (req,res, next) =>{
//   console.log(`login post`);
//   passport.authenticate('local', function(err, user, info) {
//     console.log(`auth`)
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/loginnn'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/indexxx.html');
//     });
//   })(req, res, next);
// });



router.get('/', (req,res) => {
    console.log('login router get');
    res.status(200).sendFile(path.join(__dirname, '../public/login/index.html'));
    console.log(path.join(__dirname, '../public/login/index.html'));
    // res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function isNotAuthenticated(req, res, next){
if (!req.isAuthenticated()){
  return next();
}
res.redirect('/');
}

module.exports = router;