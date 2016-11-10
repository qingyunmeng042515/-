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
	
	
	
	//ajax添加内容
	$.ajax({
		url:"data/zhoubian.txt",
		cache:false,
		beforeSend:function(){},
		success:function(str){
			var $data = eval(str);
			for(var i=0;i<$data.length;i++){
//				console.log($data[i]);
//				console.log($data[i]['small'][0]);
				var $small="";
				for(var j=0;j<$data[i]['small'].length;j++){
					$small += '<img src="'+$data[i]['small'][j]+'"/>'
				}
//				console.log($small)
				var $li = $('<li><div class="like"><img src="images/like.png" /><b>喜欢</b></div><div class="addCar"><b>查看详情</b><img src="images/addCar.png" /></div><a href="'+$data[i]['href']+'"><img class="large" src="'+$data[i]['large']+'"/></a><p><a href="'+$data[i]['href']+'">'+$data[i]['p']+'</a></p><span>'+$data[i]['span']+'</span><div class="small">'+$small+'</div><div class="twoBox"><div class="red">'+$data[i]['red']+'</div><div class="yellow">'+$data[i]['yellow']+'</div></div></li>')
				$(".zhoubian_list ul").append($li)
			}
			
			//滑过小图更换大图
			$(".zhoubian_list li").each(function(index){
				$(this).find(".small img").hover(function(){
//					alert($(this).attr("src"))
					$(".zhoubian_list li").eq(index).find(".large").attr("src",$(this).attr("src"))
				})
			})
			//like`addCar
			$(".like,.addCar").hover(function(){
				$(this).find("b").stop().fadeIn();
			},function(){
				$(this).find("b").stop().fadeOut();
			})
		}
	})
	
})
