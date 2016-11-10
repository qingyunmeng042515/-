define(["zepto","replaceS","swiper"],function($,replaceS,swiper){
	return {
		page: function(result){
			$("body").append('<div class="shadow">LOAD...</div>')
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
				$(".list").html(html);
				$(".shadow").addClass("hide");
			}
			setTimeout(function(){
				var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    loop: true,
				    autoplay: 3000,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
		 		 }) 				
			},0)
		}
	}
})