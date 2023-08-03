# Spring的AOP配置

`原创` `2013-04-06 15:33:02`

1.首先在applicationContext.xml的上方添加schema约束，这样IDE就知道XML文件的规则，会给我们对应的提示。

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
	http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
	http://www.springframework.org/schema/tx 
    http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
	http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd">

	<aop:aspectj-autoproxy /><!--可以使用注解创建代理对象-->
```

2.AOP配置：

```xml
<bean id="daoAspect" class="spring.DaoAspect"></bean>
<aop:config>
		<aop:pointcut id="daoPointCut" expression="execution( com.coooliang.spring..*.*(..))" />
		<!--之后所有包中的所有类的所有方法，所有参数都添加逻辑-->
		<aop:aspect id="da" ref="daoAspect">
				<aop:before method="before" pointcut-ref="daoPointCut" /><!--在调用这些方法之前会先调用DaoAspect这个类中的before方法 -->
		</aop:aspect>
</aop:config>
```

3.添加事务：

```
<!-- 事务 -->
<bean id="dataSourceTransactionManager"
	class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
	<property name="dataSource" ref="dataSource" />
</bean>

<tx:advice id="txAdvice" transaction-manager="dataSourceTransactionManager">
	<tx:attributes>
		<tx:method name="*" propagation="REQUIRED" /><!--所有方法都添加事务-->
	</tx:attributes>
</tx:advice>

<aop:config>
	<aop:pointcut id="daoOperation" expression="execution(* com.coooliang.spring..*.*(..))" /><!--事务添加的范围-->
	<aop:advisor advice-ref="txAdvice" pointcut-ref="daoOperation" />
</aop:config>
<!-- end of 事务 -->
```
