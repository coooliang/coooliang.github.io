# WebService的 HelloWorld : XFire , JAX-WS , JSR181

JAXWS(Java API for XML)安装：

服务端：
1）new WebService Project

2）创建一个JavaBean（如：HelloImpl）

3)选择项目new Web Service (选择create ... from javaBean)

4)引入 JAXWS的jar包,启动tomcat (我的tomcat端口号:8089)

5)打开IE输入 如:http://localhost:8089/JAXWS_Server/HelloImplPort?wsdl 如果看到xml一般情况是成功了

客户端：

1)new Java Project	

2）选择项目 new --> other--> Web Service Client
	url:查看 服务端 的web-inf下的sun-jaxws.xml中的url-pattern	
	输入URL :http://localhost:8089/JAXWS_Server/HelloImplPort?wsdl
	下一步 会有一个警告 无所谓 下一步 最后自动引入包。

3)创建测试类TestMain

服务端JavaBean:

```java
public class HelloImpl implements Hello {
	public String say() {
		return "HelloWorld!";
	}
}

客户端测试类：
public class TestMain {
	public static void main(String[] args) {
		HelloImplService service = new HelloImplService();
		HelloImplDelegate delegate = service.getHelloImplPort();
		System.out.println(delegate.say());;
	}
}
```

PS：
创建客户端的时候 也就是输入url的时候要确保服务器端项目在tomcat部署并启动

其实就是普通的 Web项目 和 Java项目 中引入jar包 ：

JAX-WS 2.1 API Libraries 

JAX-WS 2.1 Runtime Libraries

其中：new WebService Project 是创建项目 和 new Web Service ,new Web Service Client 是不同的选项


XFire:

服务端：

 1)创建WebService Project -->选择XFire --> finish;

 2)创建接口 和 实现类

 3)new --> other--> Web Service -->create...javaBean-->选择接口和实现类，取一个WebService名字-->finish

 3)部署 启动tomcat

 http://localhost:8089/XFire_Server/services/XFire_Server?wsdl

 XFire_ServerClient.java 中有个main方法

客户端：

 1)创建WebService Project -->选择XFire --> 选择 前两个jar包(XFire 1.2 Core Libraries,XFire 1.2 HTTP Libraries) -->finish;

 2)new -->other--> Web Service Client -->XFire -->URL: 如http://localhost:8089/XFire_Server/services/XFire_Server?wsdl
 下一步 有警告  ...-->finish;

 3)XFire_ServerClient.java 中有main方法:
 
```java
public static void main(String[] args) throws Exception {
		// 方法一
		long start = System.currentTimeMillis();

		XFire_ServerClient client = new XFire_ServerClient();
		XFire_ServerPortType service = client.getXFire_ServerHttpPort();

		System.out.println("方法一 : " + service.say() + " time: "
				+ (System.currentTimeMillis() - start));

		// 方法二 基于代理工厂 URL地址去掉 ?wsdl  快
		start = System.currentTimeMillis();
		XFireProxyFactory factory = new XFireProxyFactory();
		Service serviceModel = new ObjectServiceFactory().create(Hello.class);
		String url = "http://localhost:8089/XFire_Server/services/XFire_Server";
		Hello hello = (Hello) factory.create(serviceModel, url);
		System.out.println("方法二 基于代理工厂 URL地址去掉 ?wsdl : " + hello.say()
				+ " time : " + (System.currentTimeMillis() - start));

		// 方法三 反射 慢
		start = System.currentTimeMillis();
		Client c = new Client(
				new URL(
						"http://localhost:8089/XFire_Server/services/XFire_Server?wsdl"));
		Object[] obj = c.invoke("say", new Object[] {});
		System.out.println("方法三 反射 : " + obj[0] + " time: "
				+ (System.currentTimeMillis() - start));
	}
```

PS:创建客户端的时候 也就是输入url的时候要确保服务器端项目在tomcat部署并启动

其中：new WebService Project 是创建项目 和 new Web Service ,new Web Service Client 是不同的选项

JSR181:

和xfire一样

在类上添加	@WebService

方法上添加	@WebMethod

修改配置文件services.xml中添加

```xml
<service>
	<serviceClass>com.coooliang.Person</serviceClass>
	<serviceFactory>jsr181</serviceFactory>
</service>
```

URL：
http://localhost:8089/XFire_JSR_Server/services/Person?wsdl


JAX-WS:
http://localhost:8089/JAXWS_JSR181_Server/PersonPort?wsdl

