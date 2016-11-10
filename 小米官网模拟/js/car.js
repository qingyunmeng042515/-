$(function(){
	if(localStorage["proName"]){
	$(".oneCheck").append('<li><div class="checkOne"></div><img src="'+localStorage["proImg"]+'"><div class="proName">'+localStorage['proName']+'</div><div class="proPrice">'+localStorage["proPrice"]+'</div><div class="proNum"><span class="reduce">-</span><i>1</i><span class="add">+</span></div><div class="thisPrice">'+localStorage["proPrice"]+'</div><div class="del">×</div></li>');
	}else{
		$(".car").html("<div class='tishi'><h1>购物车中还没有商品，快去选购吧</h1><div class='gouwu'><a href='index.html'>继续购物</a></div></div>")
	}
	$(".allPrice span").html($allPrice());
	$(".del").click(function(){
		var $index=$(this).parent().index();
		$(".oneCheck").children("li").eq($index).remove();
		$(".allPrice span").html($allPrice());
		localStorage["proName"]='';
		localStorage["proPrice"]='';
		localStorage["proColor"]='';
		localStorage["proImg"]='';
		if(!localStorage["proName"]){
			$(".car").html("<div class='tishi'><h1>购物车中还没有商品，快去选购吧</h1><div class='gouwu'><a href='index.html'>继续购物</a></div></div>")
		}
	})
	
	$(".reduce").each(function(index){
		$(this).click(function(){	
			var $num  = $(".proNum i").eq(index).html();
			if($num-1>0){
				$(".proNum i").eq(index).html($num-1);
			}
			$(".thisPrice").eq(index).html(($(".proNum i").eq(index).html()*parseFloat($(".proPrice").html())).toFixed(1))
			$(".allPrice span").html($allPrice())
		})
	})
	$(".add").each(function(index){
		$(this).click(function(){	
			var $num  = $(".proNum i").eq(index).html();
			$(".proNum i").eq(index).html(parseInt($num)+1);
			$(".thisPrice").eq(index).html(($(".proNum i").eq(index).html()*parseFloat($(".proPrice").html())).toFixed(1));
			$(".allPrice span").html($allPrice())
		})
		
	})
	function $allPrice(){
		var $result = 0;
		for(var i =0;i<$(".thisPrice").length;i++){
			$result += parseFloat($(".thisPrice").eq(i).html())
		}
		return $result.toFixed(1);
	}
})
