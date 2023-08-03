# 模拟JDK动态代理（Java设计模式）

`原创` `2013-03-24 12:59:47`

JDK6提供了Javacompiler,StandardJavaFileManager，`Iterable`实现对.java文件编译的方法。

框架在实现代理的时候可以使用CGLIB直接生成2进制文件，不需要生成.java文件。

```java
//接口
public interface Moveable {
	void move();
	void stop();
}
```

```java
//实现Moveable接口
public class Tank implements Moveable{

	public void move() {
		System.out.println("tank move()...");
	}

	public void stop() {
		System.out.println("tank stop()...");
		
	}

}
```

```java
import java.lang.reflect.Method;

//除moveable之外再创建一个接口InvocationHandler
public interface InvocationHandler {
	void invoke(Object o,Method m);
}
```

```java
import java.lang.reflect.Method;

//实现InvocationHandler接口，自定义需要添加的内容，创建添加日志的Handler
public class LogHandler implements InvocationHandler{
	Object target;
	public LogHandler(Object target) {
		this.target = target;
	}
	public void invoke(Object o, Method m) {
		System.out.println("logHandler start...");
		try {
			m.invoke(target);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("logHandler end...");
	}

}
```

```java
import java.io.File;
import java.io.FileWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import javax.tools.JavaCompiler;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;

//模拟JDK的代理类Proxy
public class Proxy {
	//模拟JDK创建代理类的方法，JDK中还有一个ClassLoader参数，这里传入接口和需要添加的逻辑Handler，结果返回一个代理的对象。
	public static Object newProxyInstance(Class inf,InvocationHandler h) throws Exception{
		String methodStr = "";
		String rt = "\r\n";
		Method[] methods = inf.getMethods();
		for(Method m : methods){
			methodStr += "@Override" + rt + 
			 "public void " + m.getName() + "() {" + rt +
			 "    try {" + rt +
			 "    Method md = " + inf.getName() + ".class.getMethod(\"" + m.getName() + "\");" + rt +
			 "    h.invoke(this, md);" + rt +
			 "    }catch(Exception e) {e.printStackTrace();}" + rt +
			
			 "}";
		}
		
		//生成代理对象的类
		String src = 
			"package proxy;" +  rt +
			"import java.lang.reflect.Method;" + rt +
			"public class $Proxy1 implements " + inf.getName() + "{" + rt +
			"    proxy.InvocationHandler h;" + rt +
			"    public $Proxy1(InvocationHandler h) {" + rt +
			"        this.h = h;" + rt +
			"    }" + rt +
			methodStr +
			"}";
		String fileName = 
			"D:/share/test/proxy/$Proxy1.java";
		File f = new File(fileName);
		FileWriter fw = new FileWriter(f);
		fw.write(src);//生成.java文件
		fw.flush();
		fw.close();
		
		//对类进行编译
		JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
		StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
		Iterable units =  fileManager.getJavaFileObjects(fileName);
		compiler.getTask(null, fileManager, null, null, null, units).call();//编译，生成.class文件。
		fileManager.close();
		
		URL[] url  = new URL[]{new URL("file:/D:/share/test/")};
		URLClassLoader loader = new URLClassLoader(url);
		Constructor c = loader.loadClass("proxy.$Proxy1").getConstructor(InvocationHandler.class);//构造器有参数
		return c.newInstance(h);//加载.class文件，生成对象。
	}
}
```

```java
public class Client {
	public static void main(String[] args) throws Exception {
		InvocationHandler h = new LogHandler(new Tank());//告诉代理类，我需要添加什么逻辑。
		
		Moveable m = (Moveable) Proxy.newProxyInstance(Moveable.class, h);//返回代理的对象。
		m.move();//实际这里是调用添加过逻辑的代理类的方法。
		m.stop();
	}
}
```
