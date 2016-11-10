$(function(){
	//购物车hover
	$(".car").hover(function(){
		$(this).find("img").attr("src","images/topbar-cart02.png");
		$(this).find(".proIn").stop().slideDown();
	},function(){
		$(this).find("img").attr("src","images/topbar-cart01.png");
		$(this).find(".proIn").stop().slideUp();
	})
	//验证输入信息
	var $reg=[/^[1][134578][0-9]{9}$/,/^[A-z_-][\w-]{5,19}$/]
	var $tigs=["请输入正确的手机号","密码格式不正确","两次输入密码不正确"]
	$(".input input:lt(2)").each(function(index){
		$(this).blur(function(){
//			console.log($(this).val())
			if(!$reg[index].test($(this).val())){
				$('.input span').eq(index).html($tigs[index])
			}else{
				$('.input span').eq(index).html("")
			}
		})
	});
	//验证用户名是否已经存在
	$(".input input:first").blur(function(){
		for(var i=0;i<localStorage.length;i++){
			if(localStorage["username"+i]==$(this).val()){
				$('.input span:first').html("用户名已存在");
			}
		}
	})
	//验证两次密码是否相同
	$(".input input").eq(2).blur(function(){
		if($(this).val()!=$(".input input").eq(1).val()){
			$('.input span').eq(2).html($tigs[2])
		}else{
			$('.input span').eq(2).html("")
		}
	})
	//生成验证码

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
	
	//注册
	var $signNum = localStorage.length/2-1;
	$(".signin").click(function(){
		var $signNum = localStorage.length/2-1;
		var $str="";
		for(var i=0;i<$(".input span").length;i++){
			$str+=$(".input span").eq(i).html()
		}
		var $str2="";
		for(var i=0;i<$(".input").length;i++){
			$str2+=$(".input input").eq(i).val()
		}
//		console.log($str2)
//		if($str2!=''&&$str==''){
//			$(".signin").html("注册成功");
//			localStorage["username"]=$(".username input").val();
//			localStorage["password"]=$(".pass1 input").val();
//		}else{
//			alert("请填写注册信息")
//		}

		if($str2!=''&&$str==''){
			$signNum++;
//			console.log($signNum)
			$(".signin").html("注册成功");
			localStorage["username"+$signNum]=$(".username input").val();
			localStorage["password"+$signNum]=$(".pass1 input").val();
			window.location.href="load.html";
		}else{
			alert("请填写注册信息")
		}
	})
})
