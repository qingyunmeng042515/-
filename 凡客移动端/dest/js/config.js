require.config({
	//指定静态文件跟目录
	baseUrl : "../js/",
	//别名
	//给一个模块定义别名
	paths : {
		//会在  baseUrl 下面去查找
		swiper : "swiper.min",
		zepto: "zepto.min"
	},
	//兼容   把非模块化的js文件模块化
	//把不是以 define 格式的 js 做兼容处理
	shim:{
		swiper : {
			deps : [], //依赖 jquery
			exports : "Swiper" //返回的对象
		},
		zepto : {
			deps:[],
			exports:"Zepto"
		}
	}
});
