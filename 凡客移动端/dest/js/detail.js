define(["zepto"],function($){
	return {
		getDetail: function(url,callback){
			$.get(url,{},callback,"json");
		},
		getPage: function(url,callback){
			$.get(url,{},callback,"json");
		},
		getMain: function(url,callback){
			$.get(url,{},callback,"json");
		}
	}
})