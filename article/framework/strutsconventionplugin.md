# Struts convention-plugin

`原创` `2011-11-27 22:02:10`

参考说明地址：http://struts.apache.org/2.1.6/docs/convention-plugin.html

Action:

```java
@Results(value = { @Result(name = "success", location = "success.jsp"),
		@Result(name = "error", location = "error.jsp"),
		@Result(name = "testMethod", location = "/testMethod.jsp") })
public class AnnotationAction extends ActionSupport {

	public String success() {
		System.out.println("success method !");
		return SUCCESS;
	}

	public String error() {
		System.out.println("error method !");
		return ERROR;
	}

	public String testMethod() {
		System.out.println("testMethod method !");
		return "testMethod";
	}
}
```

struts.xml:

```xml
<struts>
	<constant name="struts.i18n.encoding" value="GBK" />
	<constant name="struts.devMode" value="true" />
	<constant name="struts.configuration.xml.reload" value="true"/>
	
	<constant name="struts.convention.result.path" value="/WEB-INF/jsp" />
	<constant name="struts.convention.classes.reload" value="true" />
	<constant name="struts.convention.package.locators" value="do,action"/>
	<constant name="struts.convention.action.name.separator" value="-" />
	
	<package name="default" namespace="/index" extends="struts-default">
		<action name="test" class="com.coooliang.action.TestAction">
			<result>/index.jsp</result>
		</action>
	</package>

</struts>
```

jsp页面：

其中error.jsp和success.jsp都是放在WebRoot/WEB-INF/jsp文件夹下。

testMethod.jsp放在WebRoot下。

```html
<a href="<%=path%>/annotation!success.action" >annotation!success.action</a>
<a href="${pageContext.request.contextPath}/annotation!error.action" >annotation!error.action</a>
<a href="${pageContext.request.contextPath}/annotation!testMethod.action" >annotation!testMethod.action</a>
```
