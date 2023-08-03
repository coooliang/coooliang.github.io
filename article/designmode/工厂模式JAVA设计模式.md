# 工厂模式（Java设计模式）

`原创` `2013-04-01 22:33:45`

1.简单工厂模式：我创建一个"上帝类"创造出所有的类。 

2.工厂方法模式：将工厂类进行抽象，创建不是类型的工厂类。

3.抽象工厂模式：创建一个抽象的工厂父类，适合一系列产品的创建。

 

**1.简单工厂模式**



```java
public interface Car {
	public void run();
}
```




```java
public class Bmw implements Car {

	public void run() {
		System.out.println("Bmw run()...");
	}

}
```


```java
public class Benz implements Car{

	public void run() {
		System.out.println("Benz run()...");
	}

}
```


```java
/**
 * 简单工厂HelloWorld
 */
public class SimpleFactory {
	public static Car createCar(String type) {
		if ("bmw".equals(type)) {
			return new Bmw();
		} else {
			return new Benz();
		}
	}

	public static void main(String[] args) {
		Car c = SimpleFactory.createCar("bmw");
		c.run();
	}
}
```

**2.工厂方法模式** 

```java
public interface Factory {
	public Car create();
}
```

```java
public class BmwFactory implements Factory{

	public Car create() {
		return new Bmw();
	}

}
```

```java
public class BenzFactory implements Factory {

	public Car create() {
		return new Benz();
	}

}
```

```java
public interface Car {
	public void run();
}
```

```java
public class Bmw implements Car{
	public void run() {
		System.out.println("Bmw run()...");
	}
}
```

```java
public class Benz implements Car {
	public void run() {
		System.out.println("Benz run()...");
	}
}
```

```java
public class Test {
	public static void main(String[] args) {
		Factory factory = new BenzFactory();//可以生产各种各样的奔驰。
		Car c = factory.create();
		c.run();
	}
}
```

**3.抽象工厂模式**

```java
public abstract class AbstractFactory {
	abstract Button createButton();
	abstract Panel createPanel();
}
```

```java
public class BlueSkinFactory extends AbstractFactory {
	@Override
	Button createButton() {
		return new BlueButton();
	}

	@Override
	Panel createPanel() {
		return new BluePanel();
	}
}
```

```java
public class RedSkinFactory extends AbstractFactory{
	@Override
	Button createButton() {
		return new RedButton();
	}

	@Override
	Panel createPanel() {
		return new RedPanel();
	}
}
```

```java
public interface Button {
	public void createButton();
}
```

```java
public interface Panel {
	public void createPanel();
}
```

```java
public class BlueButton implements Button{

	public void createButton() {
		System.out.println("create blue button");
	}
	
}
```

```java
public class BluePanel implements Panel{

	public void createPanel() {
		System.out.println("create Blue Panel");
	}

}
```

```java
public class RedButton implements Button{

	public void createButton() {
		System.out.println("create Red Button");
	}

}
```

```java
public class RedPanel implements Panel{

	public void createPanel() {
		System.out.println("create Red Panel");
	}

}
```

```java
public class Test {
	public static void main(String[] args) {
		AbstractFactory f = new RedSkinFactory();//只需要修改这句就可以实现换皮肤功能。如果写在配置文件中就更方便了。
		Button b = f.createButton();
		b.createButton();
		Panel p = f.createPanel();
		p.createPanel();
	}
}
```
