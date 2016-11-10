define(["zepto"],function($){
	return {
		"shoplist" : function(callback){
			$.get("/shoplist/list",{},function(result){
				callback(result);
			},"json");
		}
	}
})