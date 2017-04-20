var pool = require('../conf/conn');

var cate_model = require('../model/cateModel');

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
	addTop: function(req, res){
		//获取连接
		pool.getConnection(function(err, connection){
			//获取前台链接传过来的数据\
			var data = req.body['items[]'];
			if(typeof data == 'string'){
				//执行插入语句;
				connection.query(cate_model.insert, [data, 0], function(err, result) {
					result = {
						code: 200,
						msg: '添加成功'
					};
					//返回结果
					callback(res, result);
					//释放连接
					connection.release();
				});
			}else{
				for(var i = 0 ; i< data.length; i++){
					var name = data[i];
					connection.query(cate_model.insert, [name,0], function(err, result) {

					});
					if(i == (data.length - 1)){
						var result = {
							code: 200,
							msg:'插入成功'
						};
						//返回结果
						callback(res, result);
						//释放连接
						connection.release();
					}else{
						continue;
					}
				}
			}

		});
	}

}