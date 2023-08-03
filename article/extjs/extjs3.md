# tomcat支持php (EXTJS2.0.2)

`原创` `2011-12-10 11:59:25`

extjs文档中tree文件夹下的reorder.html和two-trees.html等例子，因为节点的内容为php所有在tomcat下无法查看。

所以我们需要让tomcat支持php:

1. baidu 下载 PHP 5.3.8 for Windows

地址：http://xiazai.zol.com.cn/detail/4/38877.shtml

2. 在环境变量设置中的Path中加入php的路径，例如: D:\soft\php-538

3. 复制一份php.ini-development 将他的名字修改为php.ini 就可以了。

PS:  baidu文档中说需要加入：extension_dir ="D:\software\php442\extensions" cgi.force_redirect = 0   我没有加入也可以。

4. 将D:\apache-tomcat 5.5\server\lib\servlets-cgi.renametojar 复制一份，修改名字为servlets-cgi.jar

5. 在tomcat的web.xml中加入过滤器,其中修改 executable的值为php.exe的路径

```xml
 <!--  php -->
 <servlet>
        <servlet-name>cgi</servlet-name>
        <servlet-class>org.apache.catalina.servlets.CGIServlet</servlet-class>
        <init-param>
          <param-name>clientInputTimeout</param-name>
          <param-value>100</param-value>
        </init-param>
        <init-param>
          <param-name>debug</param-name>
          <param-value>0</param-value>
        </init-param>
        <init-param>
          <param-name>cgiPathPrefix</param-name>
          <param-value>WEB-INF/..</param-value>
        </init-param>
		<init-param>   
		<param-name>executable</param-name>   
		<param-value>D:/soft/php-538/php.exe</param-value>   
		</init-param> 
        <load-on-startup>5</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>cgi</servlet-name>
        <url-pattern>*.php</url-pattern>
    </servlet-mapping>
 <!-- end hankjin php -->
```

6. 修改extjs2中的get-nodes.php文件，最开头修改为

```php
<?php
echo "\n\n";
// from php manual page
```

原来没有php和 echo"\n\n"

OK !

以上内容为本人实践，可行！