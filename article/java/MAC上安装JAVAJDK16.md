# MAC上安装JAVA JDK1.6

`原创` `2017-08-14 15:09:30`

今天我想运行mac上安装了myeclipse，结果提示需要安装JDK1.6才可以运行

JENV官网http://www.jenv.be/

java sdk 1.6 for mac 在苹果官网下载

https://support.apple.com/kb/DL1572?locale=zh_CN

或者

http://download.csdn.net/download/cl61917380/9932543

1.终端中查看当前系统JAVA版本

```bash
java -version
java version "1.8.0"
Java(TM) SE Runtime Environment (build 1.8.0-b132)
```

2.安装JAVA SDK 1.6

3.安装JENV

```bash
brew install jenv
```

```bash
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile
```


**4.重新打开一个新的终端运行如下内容（SDK路径根据自己情况）**

```bash
jenv add /Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0.jdk/Contents/Home
```

5.查看结果

```bash
$ jenv versions
* system (set by /Users/su/.jenv/version)
  1.6
  1.6.0.65
  1.8
  1.8.0
  oracle64-1.6.0.65
  oracle64-1.8.0
```

```bash
jenv local oracle64-1.6.0.65
```

```
java -version
java version "1.6.0_65"
Java(TM) SE Runtime Environment (build 1.6.0_65-b14-468-11M4833)
Java HotSpot(TM) 64-Bit Server VM (build 20.65-b04-468, mixed mode)
```

------

PS:其它方法

```bash
# JDK1.7
export JAVA_7_HOME=`/usr/libexec/java_home -v 1.7`
# JDK1.8
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8`
 
# 默认JDK版本为1.7
export JAVA_HOME=$JAVA_7_HOME
 
# alias切换JDK版本
alias jdk7="export JAVA_HOME=$JAVA_7_HOME"
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"

$ vim ~/.bash_profile
```
