define(["zepto","replaceS","fanke/vue"],function($,replaceS,Vue){
	var app1;
	$.get("/shoplist/list",{},function(result){
		if(result.success){
			console.log(result.list);
					/*html += '<ul>';
					var content = '<li>'+
						'<a href="#{{link}}"><img src="{{src}}" alt="" /></a>'
						'</li>';
					result.list.forEach(function(item,i){
						html += replaceS(content,item);
					})
					html += "</ul>";*/
					if(app1){
						app1.$data = result;
					}else{
						app1 = new Vue({
					 		el : ".list",
					 		data : result
				 		});
					}
					
				}
	},"json")
})