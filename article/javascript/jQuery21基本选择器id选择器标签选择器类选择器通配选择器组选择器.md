# [jQuery] 2.1基本选择器(id选择器，标签选择器，类选择器，通配选择器,组选择器)

`原创` `2013-08-11 13:41:21`

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> New Document </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
<SCRIPT LANGUAGE="JavaScript" src="jquery-1.7.min.js"></SCRIPT>
<script>
	$(function(){
		//1.ID选择器
		alert($("#ff").html());
		
		//2.标签选择器
		var x = '2.标签选择器：\n'
		$("div").each(function(i){
			x += $(this).html() + '\n';
		});
		alert(x);//结果你猜到了吗？<div>1</div><div>2</div>,1,2,3,4,<div>5</div>,5   
		
		//3.类选择器
		alert($(".cc").html());

		//4.通配选择器
		var cc = '4.通配选择器：\n';
		$("body *").each(function(){
			cc += $(this).html() + '\n';
		});
		alert(cc);//<div>1</div><div>2</div>,1,2,3,4,<div class="cc">5</div>,5
	})
</script>
 </HEAD>
 <BODY>
	<div id="ff">
		<div>1</div>
		<div>2</div>
	</div>
	<div>3</div>
	<div>4</div>
	<div><div class="cc">5</div></div>
 </BODY>
</HTML>
```
