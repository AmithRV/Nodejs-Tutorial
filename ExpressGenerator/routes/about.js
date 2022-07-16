var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/user', function (req, res, next) {
    res.render('aboutPage', { value: 'This is page is for user' });
});

router.get('/admin', function (req, res, next) {
    res.render('aboutPage', { value: 'This page is for admin' });
});

module.exports = router;
