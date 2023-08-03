# 连接远程oracle和SVN服务器客户端的使用

`原创` `2011-04-11 17:32:00`

- oracle远程访问：

修改 C:/oracle/ora92/network/admin 目录下的

```
lf=
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 172.16.30.74)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = oracle)
    )
  )
```

----

- 服务器端 安装svn和插件后

  - 右键任意文件夹如：svndata-->tortoise --> **create repository her**e (表示 数据存放的位置)

  - 修改E:/CL/svndata/conf 下的**svnserve.conf** 放出注释内容 anon-access = read auth-access = write password-db = passwd 

  - 在**passwd**文件中添加 admin = admin 注意用户名和密码要空格

  - 启动SVN服务器：运行CMD---->到SVN的安装目录的bin目录下---->执行 svnserve -d -r d:/mySvnData 此时svn服务器就开启了
 

- 客户端要安装eclipse的插件(site-1.6.17) 
  - 在MyEclipse中新建文件夹放svn插件(如：E:/Genuitec/MyEclipse-8.6/myPlugin)这里面放两个插件中的文件夹(features,plugins)

  - 在目录E:/Genuitec/MyEclipse-8.6/dropins 下存放svn.link(内容如：path = E://Genuitec//MyEclipse-8.6//myPlugin)

- myeclipse6.5中安装SVN插件：

  - 例如:D:\MyEclipse\eclipse\links添加svn.link

  - svn.link的内容为：path = D:\\share\\svn\\site-1.6.5(site-1.6.5文件夹下需要**创建一个名为eclipse的文件夹**，里面放features，plugins这两个文件夹)

 

