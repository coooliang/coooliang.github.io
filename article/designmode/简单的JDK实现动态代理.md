# 简单的JDK实现动态代理（Java设计模式）

`原创` `2011-01-27 15:59:00`

```java
public interface UserDao {
	public void add();
	public void delete();
}

public class UserDaoImpl implements UserDao {

	@Override
	public void add() {
		System.out.println("user add!!!");
	}

	@Override
	public void delete() {
		System.out.println("user delete!!!");
	}

}

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 *  相当于拦截器,可以被代理对象的方法前后加上方法
 * */
public class UserInterceptor implements InvocationHandler{
	private Object target;
	public UserInterceptor(Object target) {
		this.target = target;
	}
	
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		
		beforeMethod();
		
		method.invoke(target, args);    //调用被代理对象方法
		
		afterMethod();
		
		return null;
	}

	public void beforeMethod(){
		System.out.println("beforeMethod()...");
	}
	public void afterMethod(){
		System.out.println("afterMethod()...");
		System.out.println();
	}
} 

import java.lang.reflect.Proxy;

import com.bjsxt.test.UserDao;
import com.bjsxt.test.UserDaoImpl;
import com.bjsxt.test.UserInterceptor;

public class UserServiceTest {

	// 使用JDK 动态代理为每一个方法添加日志
	public static void main(String[] args) {
		UserDao userDao = new UserDaoImpl();
		UserInterceptor li = new UserInterceptor(userDao);

		// 1.代理对象是根据接口创建出来的
		// 2.接口有多少方法，代理对象就有多少方法
		// 3.代理对象调用每一个方法的时候都会把 自身,方法,参数 传给InvocationHandler
		UserDao userDAOProxy = (UserDao) Proxy
				.newProxyInstance(userDao.getClass().getClassLoader(),
						new Class[] { UserDao.class }, li);

		userDAOProxy.add();
		userDAOProxy.delete();
	}

} 
```
