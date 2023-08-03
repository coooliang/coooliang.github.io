# jQuery为按钮绑定事件(快速执行函数)

`原创` `2012-02-22 21:33:54`

```js
var queryFormArr = ['tone','singger','code','box','ugc',null];
$(function(){
	$("#topSearchImg").bind('click',function(){search();});//为查询图片添加事件
	$("#searchType").children().css("cursor","pointer");
	$("#searchType").children().each(function(index,sp){
		$(sp).click(function(j){
			return function(){//点击事件
				var spans = $("#searchType").children();
				spans.removeClass().addClass("color2");
				spans.eq(j).removeClass().addClass("STYLE2");
				
				//queryFrom
				$("#queryFrom").val(queryFormArr[index]);
			}
		}(index));
	});
});
```
