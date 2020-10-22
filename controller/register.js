const express = require ('express');
const router = express.Router();



router.get('/', (req,res) => {
    console.log('register router get');
    // res.redirect('/');
    res.end();
});

router.post('/register', (req,res) => {
    console.log('register router post');
    res.redirect('/' + req.url);
    res.end();
});

module.exports = router;