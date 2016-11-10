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
	$(".nav_list li:lt(7):gt(0)").hover(function(){
		$(".hidePro").stop().slideDown();
	},function(){
		$(".hidePro").stop().slideUp();
	})
	$(".hidePro").hover(function(){
		$(this).stop().slideDown();
	},function(){
		$(this).stop().slideUp();
	})
	$(".nav_list li:lt(7):gt(0)").each(function(index){
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
	//全部商品分类列表
	$(".nav_list li:first").hover(function(){
		$(".banner_list").stop().fadeIn();
	},function(){
		setTimeout(function(){
			if($(".nav_list li:first").hasClass("hover")){
				$(".banner_list").stop().fadeIn();
			}else{				
				$(".banner_list").stop().fadeOut();	
			}
			
		},1500)
	});
	$(".banner_list").hover(function(){
		$(".nav_list li:first").addClass("hover");
	},function(){
		$(".nav_list li:first").removeClass("hover");
		$(this).stop().fadeOut();
	})
	
	//商品切换
	$(".pic_r img:first,.pic_l li:first").css("border-color","#FA6700");
	$(".pic_l li").each(function(index){
		$(this).click(function(){
		$(this).css("border-color","#FA6700").siblings().css("border-color","#e0e0e0")
		$(".pic_m").html($(".pic_l li").eq(index).html()+'<div class="over"></div>');
		$(".glass").html($(".pic_l li").eq(index).html())
		})
	})
	
	//放大镜
	$(".pic_m").hover(function(){
		$(".glass,.over").stop().fadeIn();
		
	},function(){
		$(".glass,.over").stop().fadeOut();
	});
	$('.pic_m').mousemove(function(e){
//		console.log(e.clientX-$(this).offset().left);
		var $left = e.clientX-$(this).offset().left;
		if($left<120){
			$left=120;
		}else if($left>362){
			$left=362;
		}
		var $top = e.clientY-$(this).offset().top+$(window).scrollTop();
		if($top<120){
			$top=120;
		}else if($top>362){
			$top=362;
		}
		$(".over").css("left",$left-120);
		$(".over").css("top",$top-120);
		$(".glass img").css('left',-2*($left-120));
		$(".glass img").css('top',-2*($top-120));
	})
	
	
	$(".pic_r img").each(function(index1){
		//点击右侧小图片更改内容
		$(this).click(function(){
			$(this).css("border","1px solid #fa6700").siblings().css("border","1px solid #e0e0e0")
			$(".glass").html('<img src="images/led'+(index1+1)+'_1.jpg" />')
			$.ajax({
				url:"data/led.txt",
				cache:false,
				beforeSend:function(){},
				success:function(str){
					var $data = eval(str);
					$(".color span").html($data[index1]['color'])
					$(".pic_l ul").html("");
					for(var i=0;i<$data[index1]['img'].length;i++){
						$(".pic_l ul").append('<li><img src="'+$data[index1]['img'][i]+'"/></li>')
					}
					$(".pic_l ul li:first").css("border","1px solid #fa6700")
					$(".pic_m").html('<img src="'+$data[index1]['img'][0]+'" /><div class="over"></div>')
					//点击左侧小图片更改内容
					$(".pic_l li").each(function(index2){
						$(this).click(function(){
						$(this).css("border-color","#FA6700").siblings().css("border-color","#e0e0e0")
						$(".pic_m").html($(".pic_l li").eq(index2).html()+'<div class="over"></div>')
						$(".glass").html($(".pic_l li").eq(index2).html())
						})
					})
				},
				complete:function(){
					//放大镜
					$(".pic_m").hover(function(){
						$(".glass,.over").stop().fadeIn();
					},function(){
						$(".glass,.over").stop().fadeOut();
					});
					$('.pic_m').mousemove(function(e){
				//		console.log(e.clientX-$(this).offset().left);
						var $left = e.clientX-$(this).offset().left;
						if($left<120){
							$left=120;
						}else if($left>362){
							$left=362;
						}
						var $top = e.clientY-$(this).offset().top+$(window).scrollTop();
						if($top<120){
							$top=120;
						}else if($top>362){
							$top=362;
						}
						$(".over").css("left",$left-120);
						$(".over").css("top",$top-120);
						$(".glass img").css('left',-2*($left-120));
						$(".glass img").css('top',-2*($top-120));
					})
				}
			})
		})
	})	
	
	//添加购物车
//	$(".putIn").click(function(){
//		if(!localStorage["proName"]){
//			localStorage["proName"]=$(".proName h1").html();	
//		}else{
//			localStorage["proName"]=localStorage["proName"]+"|"+$(".proName h1").html();	
//		}
//		if(!localStorage["proPrice"]){
//			localStorage["proPrice"]=$(".proPrice i").html();	
//		}else{
//			localStorage["proPrice"]=localStorage["proPrice"]+"|"+$(".proPrice i").html();	
//		}
//		if(!localStorage["proColor"]){
//			localStorage["proColor"]=$(".color span").html();	
//		}else{
//			localStorage["proColor"]=localStorage["proColor"]+"|"+$(".color span").html();	
//		}
//		console.log(localStorage)
//	})
	$(".putIn").click(function(){
		localStorage["proName"]=$(".proName h1").html();
		localStorage["proPrice"]=$(".proPrice i").html();
		localStorage["proColor"]=$(".color span").html();
		localStorage["proImg"]=$(".glass img").attr("src");
		window.location.href="car.html";
	})
	
	
	//商品提问
	$(".question_detail input").click(function(e){
		$(this).css("border-color","#FA6700");
		e.stopPropagation();
	})
	$("html,body").click(function(){
		$(".question_detail input").css("border-color","#e0e0e0")
	})
	
	//楼梯
	$(".floor_ctr li").each(function(index){
		$(this).click(function(){
			var $height = $(".floor").eq(index).offset().top;
			$("body,html").animate({"scrollTop":$height})
		})
	})
	
	//返回顶部
	$(".flex li").hover(function()
	{
		var $index = $(this).index();
		$(".flex li span").eq($index).stop().animate({right:0},300);
	},function()
	{
		var $index = $(this).index();
		$(".flex li span").eq($index).stop().animate({right:-227},300);
	})
	
	//返回顶部
	$(".flex li:last").click(function()
	{
		$("html,body").animate({"scrollTop":"0"})
	});
})


$(window).scroll(function(){
	var $top = $(this).scrollTop();
	if($(this).scrollTop()<$(".floor_ctr").offset().top){
		$(".floor_ctr_box").css("position","relative");
	}
	if($(this).scrollTop()>=$(".floor_ctr").offset().top){
		$(".floor_ctr_box").css("position","fixed");
		$(".floor_ctr_box").css("left","0");
		$(".floor_ctr_box").css("top","0");
	}
	
	$(".floor").each(function(index){
		var $t = $(this).offset().top - $(this).height()/3;
		if($top>$t){
//			console.log($top>$t)
			$(".floor_ctr li").removeClass("active");
			$(".floor_ctr li").eq(index).addClass("active");
		}
	});
})
