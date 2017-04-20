var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//解析token;
	if(token) {
		jwt.verify(token, 'wuchujiang', function(err, decoded) {
			if(err) {
				return res.json({
					success: false,
					message: 'token错误'
				});
			} else{
				//把解码后的信息保存到请求中、
				req.userinfo = decoded;
				return next();
			}
		})
	}else{
		return res.json({
			success: false,
			message: '没有token'
		});
	}
} 