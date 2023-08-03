# Struts过滤器的使用

`原创` `2012-07-11 17:25:29`

最近有一个需求是需要为某个模块的功能进行日志记录，如果修改每一个方法有些不合理，于是想到了过滤器。其中介绍几个过滤器访问action中数据的方法。

```xml
<package name="user" extends="base" namespace="/user">
    <interceptors>
        <interceptor name="logInterceptor" class="com.coooliang.interceptor.LogInterceptor" />
    </interceptors>
</package>

<action name="login" class="com.coooliang.action.LoginAction">
    <interceptor-ref name="logInterceptor"/>
    <result name="success" type="dispatcher">/user/login_success.jsp</result>
</action>
```

```java
public class LogInterceptor extends AbstractInterceptor implements Interceptor{
    @Override
	public String intercept(ActionInvocation invocation) throws Exception{
	    //访问Action之前...
	    String result = invocation.invoke();//其中result表示访问Action后返回的字符串。
            //访问Action之后...

	    //actionName表示配置中的 name="login"
	    String actionName = invocation.getInvocationContext().getName();

	    //method表示访问Action中的哪个方法
	    String method = invocation.getProxy().getMethod();
	
	}
}
```
