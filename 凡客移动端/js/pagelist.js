define(["zepto"],function($){
	return {
		list : function(){
			$.get("/shop/detail",{},function(result){
				console.log(result);
			},"json");
		}
	}
})