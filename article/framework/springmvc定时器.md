# SpringMVC定时器

`原创` `2020-01-22 16:31:56`

spring的xml中添加Compnent的扫描，也可以把这个类放在之前的扫描路径里

xml:

```xml
<context:component-scan base-package="com.coooliang.timer"/>
```

java类：

```java
@Component
@EnableScheduling
public class Tasks {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostConstruct
    @Scheduled(cron = "0 0 23 * * ?")
    public void pics() {
        logger.debug("pics task...");
    }
}
```

ps:

```bash
添加 @PostConstruct 会在应用启动时执行一次
0 0 23 * * ? 表示第天23点执行一次
```


