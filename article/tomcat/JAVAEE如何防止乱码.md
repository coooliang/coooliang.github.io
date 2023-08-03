

 坛子里 总是有一些新手问如何防止乱码，这里写下来回复的时候方便 ^_^

其实防止乱码很简单配置三个地方 

1)配置tomcat的server.xml中;加入URIEncoding="GBK"

  <Connector port="8080" protocol="HTTP/1.1" 
               connectionTimeout="20000" 
               redirectPort="8443" URIEncoding="GBK"/> 

2)配置JSP页面中

<%@ page language="java" pageEncoding="GBK"%>

 

3）如果是用servlet可以将这两句话加到过滤器中，这样就不需每次都写了

 

可以在doGet(),doPost()方法开始加入:
request.setCharacterEncoding("GBK");
response.setCharacterEncoding("GBK");

也可以使用过滤器：
 <!--web.xml-->
 <filter>
  <filter-name>EncodingFilter</filter-name>
  <filter-class>com.cl.filter.EncodingFilter</filter-class>
  <init-param>
   <param-name>encoding</param-name>
   <param-value>GBK</param-value>
  </init-param>
 </filter>

/**编码过滤器*/
public class EncodingFilter implements Filter {
	private String encode = "GBK";
	public void init(FilterConfig config) throws ServletException {
		String gbk = config.getInitParameter("encoding");
		if(gbk == null || gbk.equals("")){
			return;
		}else{
			encode = gbk;
		}
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		 
		request.setCharacterEncoding(encode);
		response.setCharacterEncoding(encode);
		chain.doFilter(request, response);
	}
	public void destroy() {
	}

	

}

3）如果是struts的话配置一个常量

<constant name="struts.i18n.encoding" value="GBK" />

 

以上三个地方配置就不会出现乱码了。

 

关于myeclipse中编码问题转自：http://zhidao.baidu.com/question/265299661.html


MyEclipse 默认编码是GBK，js文件默认编码是ISO-8859-1.
都修改成UTF8的方法：
1、windows->Preferences...打开"首选项"对话框，左侧导航树，导航到general->Workspace，右侧 Text file encoding，选择Other，改变为UTF-8，以后新建立工程其属性对话框中的Text file encoding即为UTF-8。
2、windows->Preferences...打开"首选项"对话框，左侧导航树，导航到general->Content Types，右侧Context Types树，点开Text，选择Java Source File，在下面的Default encoding输入框中输入UTF-8，点Update，则设置Java文件编码为UTF-8。其他java应用开发相关的文件如：properties、XML等已经由MyEclipse缺省指定，分别为ISO8859-1，UTF-8，如开发中确需改变编码格式则可以在此指定。
3、经过上述两步，新建java文件即为UTF-8编码，MyEclipse编译、运行、调试都没问题，但是做RCP应用的Product输出时、或者插件输出时，则总是出错，要么不能编译通过(输出时要重新compile)、要么输出的插件运行时中文显示乱码。此时需要再RCP应用、或插件Plugin工程的build.properties中增加一行，javacDefaultEncoding.. = UTF-8。让输出时编译知道java源文件时UTF-8编码。这个设置需要保证所有的java源文件时UTF-8编码格式，如果不全是，可以参考 MyEclipse帮中(Plug-in Development Environment Guide > Reference > Feature and Plug-in Build configuration)，建议全部java源文件是UTF-8编码。
如果插件开发、RCP应用开发原来基于其他编码，如GB18030，想转换为UTF-8，则首先，做以上工作；然后通过查找编码转换工具，如基于 iconv的批量转换工具，将原编码转换为UTF-8编码，注意只转换java源文件，其他类型文件可能已经是比较合适的编码了；将原工程属性中的 Text file encoding，从原编码改为UTF-8即可。




 

