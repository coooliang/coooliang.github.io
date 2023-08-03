# MyEclipse6.5反编译工具安装(jadclipse)

`转载` `2013-06-03 12:39:25`

转载自：http://download.csdn.net/detail/chenhu520/2707596#comment 

MyEclipse6.5和eclipse3.3 的反编译插件的安装

以下介绍我的安装步骤，请根据自己实际路径稍作更改：

MyEclipse6.5的安装目录是C:\Program Files\MyEclipse 6.5

第一步：下载jadclipse_3.3.0.zip里边有jad.exe和net.sf.jadclipse_3.3.0.jar;

第二步：把jad.exe放进C:\Program Files\Java\jdk1.6.0_20\bin目录，如果环境变量设置的没有问题，那么在DOS环境下输入jad,你会发现jad命令已经可以使用了；

第三步：把net.sf.jadclipse_3.3.0.jar放进C:\Program Files\MyEclipse 6.5\eclipse\plugins目录

第四步：重新启动MyEclipse6.5,进入window-> Preferences->Java->JadClipse,设置路径为Jad.exe的全路径，例如：C:\Program Files\Java\jdk1.6.0_20\bin\jad.exe，点击Apply->OK;

第五步：至此，安装结束。导入一个工程测试，双击一个*.class的文件，你将会看到效果了。如果没有效果，请看第六步；

第六步：window-> Editors->File Associations ->*.class-> JadClipse Class File Viewer (default)把*.class打开方式设成jadclipse默认打开

提示：如果需要批量反编译可以参照http://www.blogjava.net/bolo/archive/2008/09/06/227442.html这篇文章。

Over......

下载地址：http://download.csdn.net/detail/chenhu520/2707596#comment 
