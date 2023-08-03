# Java程序员应该知道的linux命令

`原创` `2013-02-01 13:48:28`

常用命令

```bash
1. 在compose Bar下可以对多个服务器同时进行操作。选择To All Sessions

2. 查看JAVA进程：  

ps -ef | grep java

ps auxf | grep java


3. 杀死JAVA进程：

pkill java （在有反串改的时候可以用，杀死所有java进程）

kill -9 进程ID

ps -ef | grep "Dcatalina.base=/usr/oa/appserver" | grep -v "grep" | awk '{print   $2} ' | xargs kill -9 


4. 目录查看和执行程序：

cd /usr/oa/bin  (进入工程的目录中)

cd .. (后退一个目录)

./startup.sh  ./stop.sh  (执行当前目录下的文件) 


5. 进入某个用户

su root （切换到root用户下）
 

6. 查看目录：

ll （显示目录的详细信息） 

ls（显示目录下所有文件）


7. 在linux下修改文件内容

1)选用vi选择需要修改的文件vi index.jsp

2)然后会出现提示内容按一下i 进行修改

3)修改完成后按esc键后再按 shift+冒号 最后输入wq


8. 查看硬盘是否有满

df -h


9. 删除文件（清缓存的时候用）

1.查看文件目录：pwd 

2.删除文件：rm -rf 文件夹目录

 
10. 复制文件

cp  -r  /user/oa  /usr_back_oa
 

11.查看日志

tail -r catalina.out 

tail -n 300 catalina.out


12.查看文件

cat fileName.xml


13.查看IP，开启远程连接服务

ifconfig               --查看IP地址，注意这里是if开头而不是ip
service sshd status    --查看sshd服务的状态
service sshd start     --启动sshd服务的状态
chkconfig --list
chkconfig --list | grep sshd --查看启用服务


14.列出各进程打开文件的数量

lsof -n|awk '{print $2}' |sort|uniq -c |sort -nr|more

直接统计JAVA进程连接数 

ps -ef| grep java | awk '{print $2}' | awk 'NR==1'| xargs lsof -p | wc -l 

15.先使用ps -ef|grep java查看，再查看12120的打开数量

lsof -p 12120 |wc -l   16.为tomcat授权，不能少sudo，username为用户名

sudo chown -R username /Users/username/Documents/tomcat
```
 