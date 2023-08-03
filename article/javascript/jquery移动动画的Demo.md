# jQuery移动动画的Demo

`原创` `2012-03-16 16:15:06`

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<SCRIPT LANGUAGE="JavaScript" src="../jquery.js"></SCRIPT>
<script LANGUAGE="JavaScript">
	function movediv(leftdiv,rightdiv){
		if(leftdiv == null){leftdiv = $("#leftdiv");}
		leftdiv.wrap("<div/>");//将左边打包。
		var movediv = $("<div/>");//存放克隆的内容
		movediv.appendTo(leftdiv.parent());
 
		leftdiv.clone().addClass("listM").appendTo(movediv);//复制并放到上一个DIV中。
		movediv.addClass("moveClass").css({'opacity':'0.4'}).animate({top:"-=30", left:"-=20"}, "2000");
		
 
		if(rightdiv == null){rightdiv = $("#rightdiv");}
		var _top = rightdiv.offset().top;
		var _left =  rightdiv.offset().left;
		movediv.animate({top:_top,left:_left},500,function(){
			movediv.remove();
		});
		
	}
 
</script>
<style>
.listM {
    background: none repeat scroll 0 0 #CCCCCC;
    border: 1px dashed gray;
    margin: 1px;
}
.moveClass{
	position:absolute;
	overflow:hidden;
	top:100px;
	left:20px;
	height:auto;
	width:auto;
}
body, td, th {
    color: #333333;
    font-size: 12px;
    line-height: 150%;
}
#leftdiv {
	float: left;
    width: 375px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 370px;
}
#rightdiv {
	float: right;
    width: 375px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 370px;
}
.p1,.p2,.p3,.p4,.p5{
    float: left;
    margin: 5px;
    width: 60px;
}
</style>
</head>
<body>
 
<div id="leftdiv" style="position: relative;">
	<div >
		<div class="p1">
			<input type="checkbox" value="62891482" name="personIDs" checked="checked">
		</div>
		<div title="你是我心内的一首歌" class="p2">
			你是我心 
		</div>
		<div title="王力宏" class="p3">
			王力宏
		</div>
		<div class="p4">
			2.00
		</div>
		<div class="p5">
			2013-06-21
		</div>
		<div class="deli_clear"></div>
	</div>
</div>
 
<input type="button" value="move" οnclick="movediv()"/>
<div id="rightdiv">right</div>
</body>  
</html>
```