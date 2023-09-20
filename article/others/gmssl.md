# 查看网站国际和国密证书

[gmssl](https://gmssl.cn/gmssl/index.jsp) 国密代理 --> 软件下载--> gmsocks_mac_x64,gmsocks.exe下载地址

1. 国际证书查看
Windows/MacOS命令：

```sh
curl --resolve 'www.yypt.com:443:36.150.14.145' -vvl https://www.yypt.com
```
	
其中：【www.yypt.com:443】为域名+端口号与【36.150.14.145】的ip做映射关联，【36.150.14.145】为对应映射的回源ip地址，【https://www.yypt.com】为你要访问的域名地址。

2. 国密证书查看
  
> Windows命令：拷贝文件夹内的gmcurl.exe文件到相应目录并执行；

```sh
gmcurl -resolve 'www.yypt.com:443:36.150.14.145' --gmssl -k -vvl https://www.yypt.com
```

> MacOS命令：拷贝文件夹内的gmcurl_macos_x64文件到相应目录并执行；

```sh
gmcurl_macos_x64 --resolve 'www.yypt.com:443:36.150.14.145' --gmssl -k -vvl https://www.yypt.com
```

其中：【www.yypt.com:443】为域名+端口号与【36.150.14.145】的ip做映射关联，【36.150.14.145】为对应映射的回源ip地址，【https://www.yypt.com】为你要访问的域名地址。


--------

查询结果显示日期不同

```
*  start date: Aug 22 00:00:00 2023 GMT
*  expire date: Sep 21 23:59:59 2024 GMT

*  start date: Sep  5 13:29:06 2023 GMT
*  expire date: Aug 10 13:29:06 2024 GMT
```
