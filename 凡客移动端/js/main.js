define(["zepto","replaceS"],function($,replaceS){
	return {
		main: function(result){
				if(result.success){
					$("ul",".list").html(1);
					var html = "";
					
					html += '<ul>';
					var content = '<li>'+
						'<a href="#{{link}}"><img src="{{src}}" alt="" /></a>'
						'</li>';
					result.list.forEach(function(item,i){
						html += replaceS(content,item);
					})
					html += "</ul>";
					$(".list").html(html);
				}			
		}
	}
})