# JavaScript.async异步加载页面

`原创` `2012-02-20 11:06:47`

```js
/*
 *异步js 扩展加载标识
 *@author 
 */
(function($){
	if($.fn.async) {
		return;
	}
	if(!document.body) {
		document.write("<body/>");
	}
	$.fn.extend({
		async : function(url,obj,callback) {//异步路径，指定异步返回数据填充的div，回调函数
			if(!this) {
				alert("对象未找到...");
				return;
			}
			var height;
			if(obj) {
				var _obj = typeof(obj);
				if( _obj == "function")  {
					callback = obj;
				}else if(_obj == "number") {
					height = obj;
				}
			}
			obj = this.wrap("<div style='position:relative;width:100%;'/>");
			var o = obj.parent();
			var img = $("<img src='/common/images/loading.gif' style='position:absolute;z-index:9999;display:none;'/>").appendTo(o);
			var h = img.height();
			var oh = obj.height();
			var top = height ? height : oh < h ? 0 : (oh-h)/4;
			img.css({"left":(obj.width()-img.width())/2,"top":top < 20 ? 20 : top,"display":""});
			$.ajax({
				url  : url,
				timeout : 30000,
				complete : function() {
					o.replaceWith(obj);
					if($.isFunction(callback)) {
						callback();
					}
				},
				success : function(data) {
					obj.html(data);
				}
			})
		}
	});
})(jQuery);

```