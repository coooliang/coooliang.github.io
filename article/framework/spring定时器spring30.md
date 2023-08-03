# Spring 定时器（spring3.0）

`原创 2011-03-21 18:02:00`

cron介绍:[http://www.360doc.com/content/10/0127/14/36589_14507247.shtml](http://www.360doc.com/content/10/0127/14/36589_14507247.shtml)

spring2.5.6的配置：[https://blog.csdn.net/coooliang/article/details/6856351](https://blog.csdn.net/coooliang/article/details/6856351)

用了标签 真的简单好多！！！

首先要引入xsd:

```xml
<beans xmlns="http://www.springframework.org/schema/beans" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:p="http://www.springframework.org/schema/p" 
xmlns:task="http://www.springframework.org/schema/task" 
xsi:schemaLocation="http://www.springframework.org/schema/beans 
                    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd 
                    http://www.springframework.org/schema/task 
                    http://www.springframework.org/schema/task/spring-task-3.0.xsd"> 

<!-- 这里添加了 
xmlns:task="http://www.springframework.org/schema/task" http://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task-3.0.xsd
--> 

<task:annotation-driven /> 
    <bean id="taskTest" class="com.coooliang.test.TaskTest"></bean> 
    <task:scheduled-tasks>
    <task:scheduled ref="taskTest" method="say" cron="5/3 * * * * ?" /> 
    <task:scheduled ref="taskTest" method="hello" cron="5/3 * * * * ?"/> 
</task:scheduled-tasks>
```

普通java类：

```java
package com.coooliang.test; 
import java.util.Date;

public class TaskTest { 
    public void say() { 
        System.out.println("easy !!!" + new Date()); 
    }
    public void hello(){ 
            System.out.println("hello!!!");
    } 
}
```
