var pool = require('../conf/conn');

var user_model = require('../model/userModel');

//返回json
var callback = function(res, ret) {
	if(typeof ret === 'undefined'){
		res.json({
			code: '-1',
			msg: '操作失败'
		});
	}else{
		res.json(ret);
	}
}

module.exports = {
	//添加数据方法
	add: function(req, res){
		//获取连接
		pool.getConnection(function(err, connection){
			//获取前台链接传过来的数据\
			var param = req.query || req.params;
			//执行插入语句;
			connection.query(user_model.insert, [param.name, param.age], function(err, result) {
				if(result){
					result = {
						code: 200,
						msg: '添加成功'
					};
				}
				callback(res, result);
				//释放连接
				connection.release();
			});
		});
	}

}