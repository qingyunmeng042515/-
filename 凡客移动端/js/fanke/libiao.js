define(["zepto","replaceS"],function($,replaceS){
	function libiao(url){
		$.get(url,{},function(result){
			if(result.success){
						var detail = '<li>'+
								'<a href="#{{link}}"><img class="detail-img" src="{{src}}" alt="" /></a>'+
								'<p>{{name}}</p>'+
								'<h3>{{price}}</h3>'+
							'</li>';
							console.log(detail);
						var html = '';
						html += '<ul>';
						result.data.forEach(function(item,i){
							html += replaceS(detail,item);
						})
						html += "</ul>";
						$(".list1").html(html);
			}
		},"json")
	}
	return libiao;
})