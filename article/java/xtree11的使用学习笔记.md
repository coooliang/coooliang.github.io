# xtree1.1的使用（学习笔记）

`原创` `2011-07-28 12:50:09`

tree.jsp

```jsp
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>My JSP 'index.jsp' starting page</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<script type="text/javascript" src="js/jquery-1.4.2.js"></script>
		<script type="text/javascript" src="xtree/xtree.js"></script>
		<script type="text/javascript" src="xtree/xloadtree.js"></script>
		<script type="text/javascript" src="xtree/xmlextras.js"></script>
		<link rel="stylesheet" type="text/css" href="xtree/xtree.css">
	</head>

	<body>
		<script type="text/javascript">
			webFXTreeHandler.setIcon("xtree/");
			var rtree = new WebFXLoadTree("这是xtree","xtree!getEmployeeOrgTree","xtree!getEmployeeListByOrgId");
			rtree.target = "employeeRight";//这个target不是设置树显示的位置而是根节点数据返回的页面
			document.write(rtree);
		</script>
		<div name="employeeDiv" id="employeeDiv"></div>
		<iframe name="employeeRight"></iframe>
	</body>
</html>
```

Action代码：

```java
public class XTreeAction extends ActionSupport {
	private String treeStr;
	private String employeeRight;
	public String getEmployeeOrgTree() {// 首次会访问这个方法，双击和展开也是访问这个。。
		treeStr = "<?xml version=\"1.0\" encoding=\"gb2312\"?>"
				+ "<tree>"
				+ "<tree text=\"省公司机关本部\" target=\"employeeRight\" action=\"xtree!getEmployeeListByOrgId?org.orgId=100099\" src=\"xtree!getEmployeeOrgTree?org.parentId=100099\" />"
				+ "<tree text=\"地市电业局\" target=\"employeeRight\" action=\"xtree!getEmployeeListByOrgId?org.orgId=530557\" src=\"xtree!getEmployeeOrgTree?org.parentId=530557\" />"
				+ "<tree text=\"直管县公司\" target=\"employeeRight\" action=\"xtree!getEmployeeListByOrgId?org.orgId=530558\" src=\"xtree!getEmployeeOrgTree?org.parentId=530558\" />"
				+ "</tree>";
		return "xtree";
	}

	public String getEmployeeListByOrgId() {// 单击会访问这个,用于显示内容在右边(employeeRight)
		employeeRight = String.valueOf(Math.random());
		return "employeeRight";
	}
```

struts.xml:

```xml
<struts>
    <constant name="struts.devMode" value="true" />
    <package name="default" namespace="/" extends="struts-default">
        <action name="xtree" class="com.coooliang.XTreeAction">
            <result name="xtree">/treeXml.jsp</result>
            <result name="employeeRight">/employeeRight.jsp</result>
        </action>
    </package>
</struts>
```

treeXml.jsp:

```jsp
<%@ page contentType="text/xml;charset=GBK" language="java" %><%@taglib prefix="s" uri="/struts-tags"%><s:property escape="false" value="treeStr"/>
```

employeeRight.jsp:

```jsp
<body>${employeeRight}</body>
```

xtree.js等可以到我的资料中下载。

http://download.csdn.net/detail/cl61917380/3477153
