define(["zepto"],function($){
	function setFontSize(){
		var width = document.documentElement.clientWidth;
		var fontSize = (width / 640) * 200;
		document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px";
		}
		$(window).on("resize",setFontSize);
			setFontSize();
});
