

 今天部署的项目比较大，所以有的时候启动tomcat会报错。

需要增大tomcat内存，Optional Java VM arguments下面添加：

例如：

-Xms512M -Xmx1024M -XX:MaxPermSize=256m

-noverify -Drebel.dirs=D:\workspace\rbt\src\

例图：


![./figures/11924_1314347153bNFH.png](./figures/11924_1314347153bNFH.png)


