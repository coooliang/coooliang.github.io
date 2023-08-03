# 页面滚动选中左侧导航栏之HelloWorld

`原创` `2017-09-14 10:49:58`

mScroll方法用于左侧导航点击使用；

ligroup为左侧的导航栏

group为右侧内容的div

```java
function mScroll(vid){
	$("html,body").animate({scrollTop: $("#"+vid).offset().top}, 600);
}
```

```java
$(window).scroll(function(){
	//滚动到标杆位置,左侧导航加active
	$('.group').each(function(index){
		var _target=parseInt($(this).offset().top-$(window).scrollTop());
		if (_target<=0) {
			$('.ligroup').css({"background":"transparent","color":"#000000"});
			$('.ligroup').eq(index).css({"background":"#990000","color":"#fff"});
		}
		//如果到达页面底部，给左侧导航最后一个加active
		else if($(document).height()==$(window).scrollTop()+$(window).height()){
			$('.ligroup').css({"background":"transparent","color":"#000000"});
			$('.ligroup').eq($('.ligroup').length-1).css({"background":"#990000","color":"#fff"});
		}
	});
});
```
