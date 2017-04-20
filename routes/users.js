var express = require('express');
var router = express.Router();
var user_controller = require('../controller/userCtrl');
var auth = require('../middleware/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next) {
  user_controller.add(req, res, next);
});

router.post('/login', function(req, res, next) {
  user_controller.login(req, res, next);
});

router.post('/auth', function(req, res, next) {
  user_controller.auth(req, res, next);
});

router.get('/list', auth, function(req, res, next) {
	console.log(req.userinfo);
	res.json({
		name: req.userinfo.name,
		items: [{
			id: 1,
			title: 'text1'
		}, {
			id: 2,
			title: 'text2'
		}]
	})
});
module.exports = router;
