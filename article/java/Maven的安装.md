# Maven 的安装

`转载` `2018-02-11 00:27:44`

文章内容转载自  [http://wiki.jikexueyuan.com/project/maven/environment-setup.html](http://wiki.jikexueyuan.com/project/maven/environment-setup.html)

Maven 是一个基于 Java 的工具，所以要做的第一件事情就是安装 JDK。

##### 系统要求

项目要求JDKMaven 3.3 要求 JDK 1.7 或以上Maven 3.2 要求 JDK 1.6 或以上Maven 3.0/3.1 要求 JDK 1.5 或以上磁盘Maven 自身安装需要大约 10 MB 空间。除此之外，额外的磁盘空间将用于你的本地 Maven 仓库。你本地仓库的大小取决于使用情况，但预期至少 500 MB

+ **步骤 1：检查 Java 安装 **  现在打开控制台，执行下面的 java 命令。

操作系统任务命令Windows打开命令控制台c:\> java -versionLinux打开命令终端$ java -versionMac打开终端machine:~ joseph$ java -version

我们来验证一下所有平台上的输出：
操作系统输出Windowsjava version "1.6.0_21"Java(TM) SE Runtime Environment (build 1.6.0_21-b07)Java HotSpot(TM) Client VM (build 17.0-b17, mixed mode, sharing)Linuxjava version "1.6.0_21"Java(TM) SE Runtime Environment (build 1.6.0_21-b07)Java HotSpot(TM) Client VM (build 17.0-b17, mixed mode, sharing)Macjava version "1.6.0_21"Java(TM) SE Runtime Environment (build 1.6.0_21-b07)Java HotSpot(TM)64-Bit Server VM (build 17.0-b17, mixed mode, sharing)

如果你没有安装 Java，从以下网址安装 Java 软件开发套件(SDK)：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。我们假定你安装的 Java 版本为1.6.0_21。

+ **步骤 2：设置 Java 环境 **  设置 JAVA_HOME 环境变量，并指向你机器上的 Java 安装目录。例如：

操作系统输出WindowsSet the environment variable JAVA_HOME toC:\Program Files\Java\jdk1.6.0_21Linuxexport JAVA_HOME=/usr/local/java-currentMacexport JAVA_HOME=/Library/Java/Home

将 Java 编译器地址添加到系统路径中。
操作系统输出Windows将字符串";C:\Program Files\Java\jdk1.6.0_21\bin"添加到系统变量"Path"的末尾Linuxexport PATH=PATH:JAVA_HOME/bin/Macnot required

使用上面提到的 java -version 命令验证 Java 安装。

+ **步骤 3：下载 Maven 文件 **  从以下网址下载 Maven 3.2.5:  [http://maven.apache.org/download.html](http://maven.apache.org/download.html)+ **步骤 4：解压 Maven 文件**  解压文件到你想要的位置来安装 Maven 3.2.5，你会得到 apache-maven-3.2.5 子目录。

操作系统位置 (根据你的安装位置而定)WindowsC:\Program Files\Apache Software Foundation\apache-maven-3.2.5Linux/usr/local/apache-mavenMac/usr/local/apache-maven

+ **步骤 5：设置 Maven 环境变量**  添加 M2_HOME、M2、MAVEN_OPTS 到环境变量中。

操作系统输出Windows使用系统属性设置环境变量。M2_HOME=C:\Program Files\Apache SoftwareFoundation\apache-maven-3.2.5M2=%M2_HOME%\binMAVEN_OPTS=-Xms256m -Xmx512mLinux打开命令终端设置环境变量。export M2_HOME=/usr/local/apache-maven/apache-maven-3.2.5export M2=$M2_HOME/binexport MAVEN_OPTS=-Xms256m -Xmx512mMac打开命令终端设置环境变量。export M2_HOME=/usr/local/apache-maven/apache-maven-3.2.5export M2=$M2_HOME/binexport MAVEN_OPTS=-Xms256m -Xmx512m

+ **步骤 6：添加 Maven bin 目录到系统路径中**  现在添加 M2 变量到系统"Path"变量中

操作系统输出Windows添加字符串 ";%M2%" 到系统"Path"变量末尾Linuxexport PATH=M2:PATHMacexport PATH=M2:PATH

+ **步骤 7：验证 Maven 安装**  现在打开控制台，执行以下 mvn 命令。

操作系统输出命令Windows打开命令控制台c:\> mvn –versionLinux打开命令终端$ mvn –versionMac打开终端machine:~ joseph$ mvn –version

最后，验证以上命令的输出，应该是像下面这样：
操作系统输出WindowsApache Maven 3.2.5 (r801777; 2009-08-07 00:46:01+0530)Java version: 1.6.0_21Java home: C:\Program Files\Java\jdk1.6.0_21\jreLinuxApache Maven 3.2.5 (r801777; 2009-08-07 00:46:01+0530)Java version: 1.6.0_21Java home: C:\Program Files\Java\jdk1.6.0_21\jreMacApache Maven 3.2.5 (r801777; 2009-08-07 00:46:01+0530)Java version: 1.6.0_21Java home: C:\Program Files\Java\jdk1.6.0_21\jre

恭喜！你完成了所有的设置，开始使用 Apache Maven 吧。


**注意：如果运行报错：The JAVA_HOME environment variable is not defined correctlyThis environment variable is needed to run this programNB: JAVA_HOME should point to a JDK not a JRE 解决方法：用记事本打开startup.bat文件，可以在第一行前面加上set JAVA_HOME=D:\Java\jdk1.5.0_14设置 JAVA_HOME环境变量的值。注意：JAVA_HOME环境变量的值为你jdk的安装目录**。



