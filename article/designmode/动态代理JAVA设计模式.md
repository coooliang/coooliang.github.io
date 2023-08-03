# 动态代理（Java设计模式）

`原创` `2013-03-24 12:25:34`

静态代理只能对实现指定接口的类进行代理,当我想为**多个接口**中的**多个方法**前后添加逻辑的时候使用静态代理会变得十分麻烦。

动态代理可以满足我的要求。

使用JDK的动态代理十分简单。

需要用到的类有：

java.lang.reflect.InvocationHandler

java.lang.reflect.Proxy

java.lang.reflect.Method


```java
public interface Moveable {
    public void run();
}
public interface Stopable {
    public void stop();
} 
```

```java
//需要代理的类
public class Car implements Moveable,Stopable{

    public void run() {
        System.out.println("car move");
    }

    public void stop() {
        System.out.println("car stop");
    }

}
```

```java
//实现InvocationHandler接口，定义需要添加的逻辑，可以是时间记录，日志记录，事务等。
class LogHander implements InvocationHandler{
	Object obj;
	public LogHander(Object obj) {
		this.obj = obj;
	}
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		System.out.println(" log hander start...");
		Object result =  method.invoke(obj, args);
		System.out.println(" log hander end...");
		return result;
	}
	
}
```

```java
public class Client {
	public static void main(String[] args) {
            Car car = new Car();
            LogHander h = new LogHander(car);
            Object proxyCar = java.lang.reflect.Proxy.newProxyInstance(car.getClass().getClassLoader(), new Class[] { Moveable.class,
                    Stopable.class }, h);
            Moveable m = (Moveable) proxyCar;
            m.run();
            Stopable s = (Stopable) proxyCar;
            s.stop();

    }
}
```
