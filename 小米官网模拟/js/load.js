$(function(){
	//购物车hover
	$(".car").hover(function(){
		$(this).find("img").attr("src","images/topbar-cart02.png");
		$(this).find(".proIn").stop().slideDown();
	},function(){
		$(this).find("img").attr("src","images/topbar-cart01.png");
		$(this).find(".proIn").stop().slideUp();
	})
	//验证登录信息
	var $tigs=["用户名不存在","密码不正确"]
	var $psIndex = 0;
	$(".input input:lt(2)").each(function(index){
		if(index==0){
			$(this).blur(function(){
				var $key = false;
				for(var i=0;i<=localStorage.length/2;i++){
					if(localStorage["username"+i]==$(this).val()){
						$key = true;
						$psIndex = i;
					}
				}
//				console.log($psIndex)
				if(!$key){
					$('.input span').eq(index).html($tigs[index])
				}else{
					$('.input span').eq(index).html("")
				}
				if($(this).val() == ''){
					$('.input span').eq(index).html("请输入用户名")
				}
				
			})
		}else if(index==1){
			$(this).blur(function(){
				if(localStorage["password"+$psIndex]!=$(this).val()){
					$('.input span').eq(index).html($tigs[index])
				}else{
					$('.input span').eq(index).html("")
				}
				if($(this).val() == ''){
					$('.input span').eq(index).html("请输入密码")
				}
			})
		}
		
	})

	//生成验证码（区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷屏、论坛灌水；有效防止黑客对某一特定注册用户用特定程序暴力破解方式进行不断的登录尝试）

	$makeCode();
	$(".matter").click($makeCode)
	//简单生成4位数字
//	function $makeCode(){
//		var $num = parseInt(Math.random()*10000);
//		if($num<1000&&$num>99){
//			$num = '0'+$num
//		}else if($num<100&&$num>9){
//			$num = '00'+$num
//		}else if($num<9&&$num>=0){
//			$num = '000'+$num;
//		}else{
//			$num = ''+$num;
//		}
////		console.log($num)
//		$(".matter").html($num)
//	}
	//等概率生成4位含大小写字母，数字验证码
	function $makeCode(){	
		var $str = '';
		for(var i=1;i<=4;i++){	
			var a = parseInt(Math.random()*62)+1;
			if(a>=1&&a<=10){
				a += 47;
				$str += String.fromCharCode(a);
			}
			else if(a>=11&&a<=36){
				a +=54;
				$str +=String.fromCharCode(a);
			}
			else{
				a +=60;
				$str +=String.fromCharCode(a);
			}
		}
		$(".matter").html($str)
	}
	//验证验证码
	$(".code input").blur(function(){
		if($(this).val()!=$(".matter").html()){
			$(".code span").html("验证码输入不正确")
		}else{
			$(".code span").html("")
		}
	})
	
	//登录
	$(".signin").click(function(){
		var $str="";
		for(var i=0;i<$(".input span").length;i++){
			$str+=$(".input span").eq(i).html()
		}
		var $str2="";
		for(var i=0;i<$(".input").length;i++){
			$str2+=$(".input input").eq(i).val()
		}
		if($str2!=''&&$str==''){
			$(".signin").html("登录成功");
			window.location.href="index.html";
		}else
		{
			$(".signin").css("pointer","not-allowed");
		}
	})
})
