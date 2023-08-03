# 适配器（Java设计模式）

`原创` `2013-03-24 11:54:44`

适配器就是让实现不同接口的类协同工作。

1.定义一个提供给客户的目标接口Target

2.定义一个需要适配的类Result

3.定义一个适配器Adapter

```java
//对用户的接口
public interface Target {
	void usb2();
}
```

```java
//需要适配的类，此接口可能实现了其它的接口如USB3接口等。
public class Result {
	public void usb3(){
		System.out.println("usb3...");
	}
}
```

```java
//适配器
public class Adapter extends Result implements Target{
	public void usb2() {
		this.usb3();
	}
	
	public static void main(String[] args) {
		Target t = new Adapter();//用户需要的是USB2的接口，可是我只有USB3的接口，那么通过适配器可以将我的USB3转换成USB2给用户使用。
		t.usb2();//通过适配器，实际调用的是usb3方法
	}
}
```
