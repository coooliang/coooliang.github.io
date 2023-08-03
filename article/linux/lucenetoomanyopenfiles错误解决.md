

文章部分内容来自互联网：http://www.cnblogs.com/ibook360/archive/2012/05/11/2495405.html

 

1.首先使用root登录

2.使用ulimit -a查看参数


![./figures/1383548697_3380.jpg](./figures/1383548697_3380.jpg)
 

3.使用cat /ect/security/limit.conf 查看limit.conf文件,并添加内容，这里要注意的是前面要星号：

* soft   nofile   32768 * hard nofile 65536

如图： 


![./figures/1383548697_8222.jpg](./figures/1383548697_8222.jpg)



![./figures/1383548697_9888.jpg](./figures/1383548697_9888.jpg)


4.添加完配置，重启tomcat服务。如果要再使用ulimit -a查看需要重新打开xshell 

 

