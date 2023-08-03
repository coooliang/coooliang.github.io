# macOS11(Big Sur) MySQL无法启动

`转载` `2021-12-18 19:40:17`

转载自互联网： https://blog.csdn.net/qq_35624642/article/details/118726092

```bash
sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart
```

```bash
sudo launchctl load -w /Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist
```
