var pool = require('../conf/conn');
var multiparty = require('multiparty');

module.exports = {
	//添加数据方法
	uploadFile: function(req, res){
		var form = new multiparty.Form({uploadDir: '../public/upload/'});
		form.parse(req, function(err, fields, files) {
			var patharray = files.file[0].path.split('\\');
			var filename = patharray[patharray.length-1];
			res.json({
					code:'200',
					path:'/upload/'+filename,
					msg: 'success'
				});
			})
	}
}