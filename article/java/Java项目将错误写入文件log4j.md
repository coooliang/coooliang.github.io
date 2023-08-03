# Java项目将错误写入文件（log4j）

`转载` `2017-09-15 11:46:36`

配置转载自互联网

1.需要jar包：commons-logging.jar , log4j.jar

2.log4j.properties放在src目录下


```properties
# 定义 DEBUG 优先级， R 为日志输出目的的 

log4j.rootLogger= DEBUG, R 

# 设置日志输出类型 , 为文件类型 

log4j.appender.R= org.apache.log4j.FileAppender 

# 设置日志文件名 logRecord.log, 输出到 tomcat 服务器的 logs 目录下 

log4j.appender.R.file= ./ApiDocLogs/logRecord.log 

# 每次在文件尾写入新的日志信息 

log4j.appender.R.Append= true 

# 日志输出信息格式类型 

log4j.appender.R.layout= org.apache.log4j.PatternLayout 

# 日志输出信息格式为 换行、日期、优先级、 [ 全类名 ] 、日志信息、换行 

log4j.appender.R.layout.ConversionPattern= %n%d%p [%l] %m%n 

```

3.使用： 

```java
private static Log logger = LogFactory.getLog("IOUtil");
...
try{
} catch (DocumentException e) {
	e.printStackTrace();
	logger.error(e.getMessage());
}
```
