# Spring配置dataSource常用两种

`原创` `2011-03-09 14:45:00`

Spring配置dataSource常用两种

> dbcp

```xml
<bean id="dataSource"
class="org.apache.commons.dbcp.BasicDataSource">
<property name="driverClassName"
value="oracle.jdbc.driver.OracleDriver" />
<property name="url"
value="jdbc:oracle:thin:@localhost:1521:oracle" />
<property name="username" value="chenl" />
<property name="password" value="chenl" />
</bean>
```

在工程的lib目录下放 ojdbc14.jar 或者 class12.jar

------

> jndi

```xml
<bean id="dataSource"
class="org.springframework.jndi.JndiObjectFactoryBean">
<property name="jndiName" value="java:comp/env/jdbc/oracled" />
</bean>
```

1. 我用的tomcat版本是 tomcat6.0.18
2. tomcat的conf目录下的server.xml中Host节点中加入如下配置

```xml
 <Context path="/MyEXTOA" docBase="D:/MyEclipse6.5/eclipse/CL/workspace/MyEXTOA/WebRoot">
   <Resource auth="Container" name="jdbc/oracled" type="javax.sql.DataSource" maxWait="5000" maxldle="20" maxActive="25" username="chenl" password="chenl" driverClassName="oracle.jdbc.driver.OracleDriver" url="jdbc:oracle:thin:@localhost:1521:orcl"/>
 </Context>
```

3. path是你要访问这个工程的名字(如：http://localhost:8080/MyEXTOA);docBase指向WebRoot目录 如果发布了就写:MyEXTOA.war

4. 别忘了在tomcat 的lib 下放 class12.jar  或者  ojdbc14.jar 其中选一个数据库驱动包
