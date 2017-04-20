var express = require('express');
var router  = express.Router();
var goods_controller = require('../controller/goodsCtrl');


router.post('/uploadFile', function(req, res, next) {
	goods_controller.uploadFile(req, res, next);
	req.rend('111');
});

module.exports = router;
