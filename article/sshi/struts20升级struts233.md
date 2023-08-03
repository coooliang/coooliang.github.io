# Struts2.0升级Struts2.3.3

`原创` `2012-07-11 17:15:25`

由于工程是比较早的所以使用的是struts2.0，其中有很多的漏洞，所以公司要求升级struts2.3.3.

现已升级完成并上现网所以按我说的步骤做就一定OK。

1. 下载struts-2.3.3-all.zip ，之所以下载all是因为目录中有例子工程。路径如：D:\share\struts-2.3.3-all\struts-2.3.3\apps\struts2-blank.war。

2. 在struts2-blank.war\WEB-INF\lib文件夹下是struts-2.3.3所需要的最基本的JAR包，把这些JAR包复制到你的工程并删除同名不同版本的JAR包。

3. 由于struts-2.3.3的过滤器名称有修改所以需要修改struts.xml：

```xml
<interceptor-ref name="filterParams"/> 修改为 <interceptor-ref name="params"/>
<interceptor-ref name="static-params"/> 修改为 <interceptor-ref name="staticParams"/>
```

4. 最后需要为工程中的所有<s:select>标签添加name属性，如果之前没有添加的话.否则会报freemaket的错误。

5. 不能在静态方法中使用#号，例 如：<s:property value="@com.coooliang.enums.BillStatus@valueOf(#attr.status).name"/>，不能将#attr.status做为参数传递，需采用代码块或其它方式实现。

6. 添加支持静态方法调用：<constant name="struts.ognl.allowStaticMethodAccess" value="true"/> 

完成以上几点，目前没有发现其它问题了。 

