

1.将文件tom-cat-users.xml最后的注释去掉（否则会弹出输入用户名密码框）:

```
<tomcat-users>
    <role rolename="tomcat"/>
    <role rolename="role1"/>
    <user username="tomcat" password="tomcat" roles="tomcat"/>
    <user username="both" password="tomcat" roles="tomcat,role1"/>
    <user username="role1" password="tomcat" roles="role1"/>
</tomcat-users>```


 

2.在server.xml中添加内容:

```
<Context path="/TestJDBC" docBase="D:/CL/workspace/TestJDBC/WebRoot">
    <Resource auth="Container" name="jdbc/oracleds" type="javax.sql.DataSource" maxWait="-1" maxIdle="10" maxAction="10" username="scott" password="tiger" driverClassName="oracle.jdbc.driver.OracleDriver" url="jdbc:oracle:thin:@127.0.0.1:1521:oracle" />
</Context>```


3.将OJDBC14.JAR复制到 D:/apache-tomcat-6.0.26/lib 文件夹下

  

**PS:**

在Servlet中得到Connection对象：

```java
Context context = new InitialContext(); 
DataSource ds = (DataSource) context.lookup("java:/comp/env/jdbc/oracleds"); 
Connection conn = ds.getConnection(); 
```


 

 

 

 

 

 

 

 

 

 

