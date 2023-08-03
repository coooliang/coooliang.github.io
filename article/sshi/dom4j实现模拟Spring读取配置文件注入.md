# Dom4J实现模拟Spring读取配置文件 注入

`原创` `2011-01-16 14:43:00`

1. beans.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<beans>
	<bean id="u" class="com.bjsxt.impl.UserDAOImpl" />
	<bean id="userService" class="com.bjsxt.service.UserService">
		<property name="userDAO" ref="u"></property>
	</bean>
</beans>```

2.UserDao代码

```
package com.bjsxt.dao;

import com.bjsxt.model.User;

public interface UserDAO {
	public void save(User user);
}
```

3.

```java
package com.bjsxt.impl;

import com.bjsxt.dao.UserDAO;
import com.bjsxt.model.User;

public class UserDAOImpl implements UserDAO{

	@Override
	public void save(User user) {
		System.out.println("a user save !");
	}

}
```

4.User类

```java
package com.bjsxt.model;

public class User {
	private String username;
	private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
```

5.UserService类 

```java
package com.bjsxt.service;

import com.bjsxt.dao.UserDAO;
import com.bjsxt.impl.UserDAOImpl;
import com.bjsxt.model.User;

public class UserService {
	private UserDAO userDAO;

	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
	public void add(User user){
		userDAO.save(user);
	}
}
```

6.BeanFactory接口

```java
package com.bjsxt.spring;

public interface BeanFactory {
 public Object getBean(String name);
}
```

7.读取XML文件代码也是最重要的代码 

```java
package com.bjsxt.spring;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;

import com.bjsxt.util.XMLUtils;

public class ClassPathXmlApplicationContext implements BeanFactory{
	private Map<String,Object> beans = new HashMap<String,Object>();
	
	@SuppressWarnings("unchecked")
	public ClassPathXmlApplicationContext() throws Exception {
		Document document = XMLUtils.readXML();
		//List<Element> list = document.selectNodes("/beans/bean");
		Element root =  document.getRootElement();
		List<Element> list = root.elements();
		for(Element element : list){
			String id = element.attributeValue("id");
			String clazz = element.attributeValue("class");
			Object o = Class.forName(clazz).newInstance();
			beans.put(id, o);
			
			List<Element> propertyList = element.elements();
			for(Element propertyElement : propertyList){
				String name = propertyElement.attributeValue("name");  //方法名
				String methodName = "set" + name.substring(0,1).toUpperCase() + name.substring(1);
				
				String ref = propertyElement.attributeValue("ref"); // u
				Object obj = beans.get(ref); //得到参考的对象
				
				//o 代表 com.bjsxt.service.UserService 类 
				//参数 setUserDAO,UserDAO接口
				Method m = o.getClass().getMethod(methodName, obj.getClass().getInterfaces()[0]); 
				m.invoke(o, obj); //userService.setUserDAO()
				
			}
			
		}
		
	}
	
	public Object getBean(String name){
		return beans.get(name);
	}
	
	public static void main(String[] args) throws Exception {
		new ClassPathXmlApplicationContext();
	}
}
```

8.工具类

```java
package com.bjsxt.util;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;

public class XMLUtils {
	public static Document readXML() {
		Document document = null;
		try {
			document = new SAXReader().read(XMLUtils.class.getResourceAsStream("beans.xml"));
			
			return document;
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return document;
	}
	
	public static void main(String[] args) {
		Document document = readXML();
		System.out.println(document);
	}
}
```

测试类：

(在工程中创建一个SourceFolder文件夹(取名为test)

在UserService.java上右键创建一个Junit Test Case  会得到一个UserServiceTest.java文件 再将它移到test文件夹下)

```java
package com.bjsxt.service;

import org.junit.Test;

import com.bjsxt.dao.UserDAO;
import com.bjsxt.model.User;
import com.bjsxt.spring.BeanFactory;
import com.bjsxt.spring.ClassPathXmlApplicationContext;

public class UserServiceTest {

	@Test
	public void testAdd() {
		try {
			BeanFactory beanFactory = new ClassPathXmlApplicationContext();
			
			//通过配置文件得到UserDAOImpl对象
			UserDAO userDAO = (UserDAO) beanFactory.getBean("u");
			UserService userService = (UserService) beanFactory.getBean("userService");
			
			//userService.setUserDAO(userDAO); //不用写,ClassPathXmlApplicationContext中用反射setUserDAO了
			userService.add(new User());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```

右键UserServiceTest.java 

Run as-->Junit Test
