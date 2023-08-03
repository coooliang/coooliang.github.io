# 进度条的简单使用 (EXTJS2.0.2)

`原创` `2011-12-08 21:33:04 `

特别声明: 最近想用业余时间学习EXTJS，纯属娱乐。请勿模仿。

官方下载地址:  http://extjs.com/deploy/ext-2.0.2.zip

1.JSP头部引入EXTJS，使用fire-bug可以在控制台看到需要哪些文件夹下的哪些图片：

```jsp
<%
	String path = request.getContextPath();
%>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="<%=path%>/extjs2/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/extjs2/ext-base.js"></script>
<script type="text/javascript" src="<%=path%>/extjs2/ext-all.js"></script>
```

两种方式实现进度条：

```js
Ext.onReady(function() {
	// 进度条
	var message1 = Ext.Msg.show({
		title : '请等待',
		width : 300,
		msg : "数据读取中......",
		progress : true
	});

	var i = 1;
	var f = function() {
		message1.updateProgress(i / 10, i * 10 + "%");
		if (i == 10) {
			i = 0;
		}
		i++;
	}
	setInterval(f, 1000);

	/*	//第二种方法
		var message2 = Ext.Msg.show({
			title : '请等待',
			width : 300,
			msg : "数据读取中......",
			wait : true
		});
	*/
});
```
