# jQuery] 2.2层级选择器(包含选择器，子选择器，相邻选择器，兄弟选择器

`原创` `2013-08-11 13:26:35`

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
		var x = '1.层级选择器：'
		$("div div").each(function(i){
			x += $(this).html() + ' ';
		});
		alert(x);//1 2 5

		var b = '2.子选择器：';
		$(">div",$("#ff")).each(function(i){
			b += $(this).html() + ' '
			
		});
		alert(b)//1 2

		//3.相邻选择器
		$("#ff+div").each(function(i){
			alert($(this).html())//3
		});
		$("+div",$("#ff")).each(function(i){
			alert($(this).html())//3
		});
		

		//5.兄弟选择器
		var a = '5.兄弟选择器：';
		$("#ff~div").each(function(i){
			a += $(this).html() + ' ';
		});
		alert(a);//3 4 <div>5</div>
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
	<div><div>5</div></div>
 </BODY>
</HTML>
```
