//web 项目框架
var express = require('express');
//导入 request 模块 http 请求模块插件
var request = require('request');
// 实例化 express 模块
var app = express();
// 术语  ： 路由
const path = require("path");
//引入 swig 模块
const Swig = require('swig');
Swig.setDefaults({
	cache : false //不缓存文件
});
// req : request 浏览器发送给服务器的对象
// res : response 服务器发送给浏览器的对象
//声明 get 请求，路由是 /
app.get("/",function(req,res){
//	res.send(); // 输出 json 或者 字符串
	res.render("index2");   // render 加载一个文件 并输出到浏览器
});
app.route('/api').get(function(req, res){
	request.post({
		url : "http://op.juhe.cn/onebox/weather/query",
		formData:{
			cityname : "北京",
			key : "48f0c60d463f680e427d47cee43b8bc7"
		}
		/**
		 * error : 判断结果是否错误
		 * response : 请求的头文件信息
		 * data ： 返回的结果数据
		 */
	},function(error,response,data){
		res.send(data);
	});
});

// 设置文件后缀的解释器  配置 render 输出的文件的解释，编译模块
app.engine('html', Swig.renderFile);
//设置 页面的后缀  配置 render 输出文件的默认后缀
app.set('view engine', 'html');
//设置 页面的 跟目录  配置 render 输出文件的 根目录
app.set("views",path.join(__dirname,"../views"));


app.route('/api/test').get(function(req, res){
	//接收 js 使用 ajax 发送的数据
	var query = req.query;
	var url = query.url;
	//删除 url 参数
	//剩余的就是想接口发送的数据
	delete query.url;
	
	request.post({
		url : url,
		formData:query
		/**
		 * error : 判断结果是否错误
		 * response : 请求的头文件信息
		 * data ： 返回的结果数据
		 */
	},function(error,response,data){
		res.send(data);
	});
});

require("./route.js")(app);

// express 开启静态服务器，把指定的目录做跟目录
app.use(express.static("./dest"));

//创建一个 http 服务
var server  = require('http').createServer(app);
//监听端口和 ip 地址
//0.0.0.0 本机网卡
server.listen(9010, "0.0.0.0", function() {
	console.log('http://127.0.0.1:9010');
});