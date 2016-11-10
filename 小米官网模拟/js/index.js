$(function(){
	//购物车hover
	$(".car").hover(function(){
		$(this).find("img").attr("src","images/topbar-cart02.png");
		$(this).find(".proIn").stop().slideDown();
	},function(){
		$(this).find("img").attr("src","images/topbar-cart01.png");
		$(this).find(".proIn").stop().slideUp();
	})
	//搜索栏
	$(".loupe").hover(function(){
		$(this).find("img").attr("src","images/loupe-2.png");
		$(".search input").css("border","1px solid #b0b0b0");
		$(".search input").css("border-right","none");
	},function(){
		$(this).find("img").attr("src","images/loupe-1.png");
		$(".search input").css("border","1px solid #e0e0e0");
		$(".search input").css("border-right","none");
	});
	$(".search input").click(function(e){
		$(".hotPro").fadeOut();
		$(".clicked").fadeIn();
		$(".search input").css("border","1px solid #ff6700");
		$(".loupe").css("border","1px solid #ff6700")
		$(".search input").css("border-right","none");
		e.stopPropagation();
	});
	$("html,body").click(function(){
		$(".hotPro").fadeIn();
		$(".clicked").fadeOut();
		$(".search input").css("border","1px solid #e0e0e0");
		$(".loupe").css("border","1px solid #e0e0e0")
		$(".search input").css("border-right","none");
	})
	//导航栏 
	$(".nav_list li:lt(7)").hover(function(){
		$(".hidePro").stop().slideDown();
	},function(){
		$(".hidePro").stop().slideUp();
	})
	$(".hidePro").hover(function(){
		$(this).stop().slideDown();
	},function(){
		$(this).stop().slideUp();
	})
	$(".nav_list li:lt(7)").each(function(index){
		var $liIndex = index;
		$(this).hover(function(){
			$.ajax({
				url:"data/navList.txt",
				cache:false,
				beforeSend:function(){
//					$(".hidePro ul").html("");
				},
				success:function(str){
					var $data = eval(str);
					$(".hidePro ul").html("");
					for(var i=0;i<$data[$liIndex].length;i++){
						var $json = $data[$liIndex][i];
						$(".hidePro ul").append('<li><div class="proPic"><a href="#"><img src="'+$json['proUrl']+'" /></a></div><a href="#">'+$json['proName']+'<span>'+$json['proPrice']+'</span></a></li>')
					}
				}
			})
		})
	})
	//轮播图
	var $num=0;
	$(".banner .pic li").eq($num).css("opacity","1");
	$(".banner .pic li").eq($num).css("z-index","1");
	$(".dot li").eq($num).addClass("active");
	timer = setInterval($fnNext,2000);
	$(".banner").hover(function(){
		clearInterval(timer)
	},function(){
		timer = setInterval($fnNext,2000);
	});	
	$(".preNext").click($fnNext);
	$(".preLast").click($fnLast);
	$(".dot li").hover(function(){
		$(".dot li").eq($num).siblings().removeClass("active")
		$(this).addClass("active");
		var $index = $(this).index();
		$(this).click(function(){
			$(".banner .pic li").eq($num).stop().animate({"opacity":"0"});
			$(".banner .pic li").eq($num).css("z-index","0");
			$num = $index;
			$(".banner .pic li").eq($num).stop().animate({"opacity":"1"});
			$(".banner .pic li").eq($num).css("z-index","1");
		})
	},function(){
		$(".dot li").eq($num).siblings().removeClass("active")
	})
	function $fnNext(){
		$(".banner .pic li").eq($num).stop().animate({"opacity":"0"});
		$(".banner .pic li").eq($num).css("z-index","0");
		$(".dot li").eq($num).removeClass("active");
		$num++;
		if($num>$(".banner .pic li").length-1){
			$num=0;
		}
		$(".dot li").eq($num).addClass("active");
		$(".banner .pic li").eq($num).stop().animate({"opacity":"1"});
		$(".banner .pic li").eq($num).css("z-index","1");
	}
	
	function $fnLast(){
		$(".banner .pic li").eq($num).stop().animate({"opacity":"0"});
		$(".banner .pic li").eq($num).css("z-index","0");
		$(".dot li").eq($num).removeClass("active");
		$num--;
		if($num<0){
			$num=$(".banner .pic li").length-1;
		}
		$(".dot li").eq($num).addClass("active");
		$(".banner .pic li").eq($num).stop().animate({"opacity":"1"});
		$(".banner .pic li").eq($num).css("z-index","1");
	}
	//左边列表
	$(".banner_list").hover(function(){
		$(".pro_container").stop().fadeIn();
	},function(){
		$(".pro_container").stop().fadeOut();
	})
	//单品轮播图(还可以封装改进一下)
	var $color = ["#ffac13","#83c44e","#2196f3","#e53935","#00c0a5","#ffac13","#83c44e","#2196f3","#e53935","#00c0a5","#ffac13","#83c44e","#2196f3","#e53935","#00c0a5","#ffac13","#83c44e","#2196f3","#e53935","#00c0a5"]
	$(".goodsBanner li").each(function(index){
		$(this).css("border-color",$color[index])
	});
	
	var $width = ($(".goodsBanner li:first").width()+parseInt($(".goodsBanner li:first").css("margin-right")))*5;//获取轮播移动距离
	var $num02 = 0;
	$(".btn span:last").addClass("active");
	
	$goodsTimer = setInterval($goodBanner,3000);
	
	$(".starGoods").hover(function(){
		clearInterval($goodsTimer);
	},function(){
		$goodsTimer = setInterval($goodBanner,3000)
	})
	
	$(".btn span").each(function(index){
		//点击、轮播
		$(this).click(function(){
			$(".btn span").eq(index).removeClass("active").siblings().addClass("active");
			$num02 = index;
			$(".goodsBanner ul").stop().animate({left:-index%2*$width})	
		});
		//hover变色（active的状态下变色）
		$(this).hover(function(){
			if($(this).hasClass("active")){
				$(this).addClass("color");
			}
		},function(){
			$(this).removeClass("color");
		})
		
	});
	
	function $goodBanner(){
		$num02++;
		$num02 = $num02%2;
		if($num02==1){
			$(".btn span").removeClass("active");
			$(".btn span:even").addClass("active");
		}else{
			$(".btn span").removeClass("active");
			$(".btn span:odd").addClass("active");
		}
		$(".goodsBanner ul").stop().animate({left:-$num02*$width})
	}
	
	//li向上运动
	$(".body_right li").hover(function(){
		$(this).stop().animate({"top":"-3px"});
	},function(){
		$(this).stop().animate({"top":"0"});
	})
	
	//楼梯选项菜单border-bottom
	$(".cat_head_right li").hover(function(){
		$(this).find("span").stop().animate({"width":"100%"})
	},function(){
		$(this).find("span").stop().animate({"width":"0%"})
	})
	
	//ajax
	$(".cat_head_right").each(function(index){
		var $catIndex = index;//楼层索引值
		$(this).find("li").hover(function(){
			var $liIndex = $(this).index();//li的索引值
			$.ajax({
				url:"data/prolist.txt",
				cache:false,
				beforeSend:function(){
					$(".body_right").eq($catIndex).find("ul").html("")
				},
				success:function(str){
					var $data = eval(str)[$catIndex][$liIndex];
					console.log($data);
					for(var i=0;i<$data.length-2;i++){
						var $json = $data[i];
						$(".body_right").eq($catIndex).find("ul").append('<li><a href="'+$json["href"]+'"><img src="'+$json['picUrl']+'"/></a><h3>'+$json['proName']+'</h3><span>'+$json['proPrice']+'</span><b>'+$json['proJudge']+'</b></li>')
					}
						$(".body_right").eq($catIndex).find("ul").append('<li class="little"><a href="'+$data[$data.length-2]['href']+'"><img src="'+$data[$data.length-2]['picUrl']+'"/></a><h3>'+$data[$data.length-2]['proName']+'</h3><span>'+$data[$data.length-2]['proPrice']+'</span></li>');
						$(".body_right").eq($catIndex).find("ul").append('<li class="more"><a href="'+$data[$data.length-1]['href']+'"><img src="'+$data[$data.length-1]['picUrl']+'"/></a><h3>'+$data[$data.length-1]['proExpand']+'</h3><b>'+$data[$data.length-1]['proHot']+'</b></li>')

				}
			})
		})
	})
	
})
