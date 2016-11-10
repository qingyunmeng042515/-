define([],function(){
		function replaceS(html,data){
						return html.replace(/{{(\w+)}}/g,function(value,key){	//key代表（）内;
							return data[key] || value;
						})
				}
		return replaceS;
})