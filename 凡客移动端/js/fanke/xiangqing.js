define(["zepto","replaceS","swiper"],function($,replaceS,swipter){
	function xiangqing(url){
		$.get(url,{},function(result){
			if(result.success){
				var html = '',html1 = '';
				html += '<div class="swiper-container">'+
			    '<div class="swiper-wrapper">';
			    result.data.imgs.forEach(function(item,i){
			    	html1 += '<div class="swiper-slide"><img src="{{'+i+'}}" alt="" /></div>';
			    })
			    html += replaceS(html1,result.data.imgs);
			    html +='</div>'+
			    '<div class="swiper-pagination"></div>'+
				'</div>';
				$(".list2").html(html);				
			}
		},"json")
		setTimeout(function(){
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    autoplay: 3000,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
	 		 }) 
		},1000);
	}
	return xiangqing;
})