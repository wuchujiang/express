var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {title: 'about'});
});

router.get('/info', function(req, res, next) {
	res.render('index', {title: 'info'});
});

module.exports = router;
