# 静态代理（Java设计模式）

`原创` `2013-03-24 12:12:12`

代理：一个角色代表另一个角色来完成某些特定的功能，当我们需要在一个方法的前后添加逻辑的时候（日志，事务等）可以使用代理。 

静态代理可以使用两种方式实现：一种是继承，一种是聚合。

1.定义接口Moveable

2.实现类Tank

3.在Tank的move方法前后添加时间日志（继承方式）或系统日志（聚合方式） 

```java
public interface Moveable {
	void move();
}
```

```java
//需要代理的对象
public class Tank implements Moveable{
	
	public void move() {
		System.out.println("tank move");
	}

}
```

```java
//第一种：以继承的方式实现静态代理，在方法前后添加逻辑
public class TimeProxy extends Tank{

	@Override
	public void move() {
		System.out.println("timeProxy start...");
		super.move();
		System.out.println("timeProxy end...");
	}

	public static void main(String[] args) {
		Moveable m = new TimeProxy();
		m.move();//调用了代理后的方法。
	}
}
```

```java
//第二种：以聚合的方式实现代理类，为方法前后添加日志
public class LogProxy implements Moveable{
	Moveable m;
	public LogProxy(Moveable m) {
		this.m = m;
	}
	public void move() {
		System.out.println("move log start...");
		m.move();
		System.out.println("move log end...");
	}
	public static void main(String[] args) {
		Moveable mm = new Tank();
		mm = new LogProxy(mm);//这个代理类只能给Moveable接口的类进行代理，我们需要创建任意接口的代理类(动态代理)
		mm.move();
	}
}
```
