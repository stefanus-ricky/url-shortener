const express = require ('express');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('register router');
    res.redirect('/');
    res.end();
});

module.exports = router;