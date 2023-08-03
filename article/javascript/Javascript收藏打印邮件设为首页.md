# Javascript（收藏_打印_邮件_设为首页）

`原创` `2011-06-10 19:07:00`

```html
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>收藏_打印_邮件_设为首页</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css" mce_href="styles.css">
	-->
	<mce:script language="javascript"><!--
	function ctrlD(){
		window.external.AddFavorite(window.location.href,'收藏网页');//需要部署才可用,否则无权限
	}
	function ctrlPrint(){
		window.print();
	}
	function ctrlMail(){
		window.location.href="mailto:61917380@qq.com";
	}
	function setH(v){
		var strHref = window.location.href;
		v.style.behavior = 'url(#default#homepage)';
		v.setHomePage(strHref);
	}	
// --></mce:script> 
  </head>
  
  <body>
   <a href="javascript:window.external.AddFavorite(window.location.href,'收藏网页');" mce_href="javascript:window.external.AddFavorite(window.location.href,'收藏网页');">收藏网页</a>
	<input type="button" οnclick="ctrlD()" value="收藏网页"/>
	<input type="button" οnclick="ctrlPrint()" value="打印网页"/>
	<input type="button" οnclick="ctrlMail()" value="发送邮件"/>
	<a href="mailto:61917380@qq.com" mce_href="mailto:61917380@qq.com" >发送邮件</a>
	<a href="javascript:void(0);" mce_href="javascript:void(0);" οnclick="setH(this)">设为首页</a>
  </body>
</html> 
```