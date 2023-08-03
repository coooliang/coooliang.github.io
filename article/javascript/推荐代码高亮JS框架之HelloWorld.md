# 代码高亮JS框架之HelloWorld

`原创` `2016-07-07 15:57:18`

最近在找代码高亮的JS插件，原来想用Highlight.js的，结果发现这框架对尖括号很不友好，必须自己转<或者>这还怎么用？！~

后来转向了SyntaxHighlighter，还行吧，虽然没有Highlight引入那么简洁。

官网：http://alexgorbatchev.com/SyntaxHighlighter/

HelloWorld:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Hello SyntaxHighlighter</title>
	<script type="text/javascript" src="scripts/shCore.js"></script>
	<script type="text/javascript" src="scripts/shBrushJScript.js"></script>
	<script type="text/javascript" src="scripts/shBrushAppleScript.js"></script>
	<script type="text/javascript" src="scripts/shBrushJava.js"></script>
	<link type="text/css" rel="stylesheet" href="styles/shCoreDefault.css"/>
	<script type="text/javascript">
	SyntaxHighlighter.defaults['toolbar'] = false;
	SyntaxHighlighter.defaults['gutter'] = false;//line number

	SyntaxHighlighter.all();
	</script>
</head>

<body>
<pre class="brush: js;">
	function helloSyntaxHighlighter(){
		return "hi!";
	}
</pre>

<pre class="brush: applescript;">
	NSString *s = @"hi";
	NSLog(@"%@",s);
</pre>

<pre class="brush: java;">
	System.out.println("hello world");
</pre>

</html>
```

将框架下载下来，然后把scripts和styles两个文件夹拿来用就可以了，其它文件不需要。要用哪个语言就引入对应的语言js 
