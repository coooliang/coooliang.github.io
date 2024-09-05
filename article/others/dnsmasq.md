# macOS下用dnsmasq搭建DNS服务器

`转载` `2023-07-20 14:48:12`

https://www.jianshu.com/p/64466fa557b3

1. dnsmasq安装 

```bash
brew install dnsmasq
brew info dnsmasq

sudo brew services restart dnsmasq
```

2. 修改 /usr/local/etc/dnsmasq.conf

```properties
log-queries
log-facility=/var/log/dnsmasq.log
bogus-nxdomain=119.29.29.29
cache-size=2048
port=53
no-resolv
```

3. /private/etc/hosts ，使用no-resolv走的就是host的配置（使用gas mask软件可以快速修改host）

```
123.123.123.123 www.xxx.com

```

4. 手机设置dns地址为电脑ip，使用NetAnalyzer查看dns
 
----


PS: 查看本机ip地址

```
alias ip='curl ifconfig.me'
alias ip2='ifconfig | grep inet | grep -v inet6 | grep -v 127'
alias ip3='ifconfig | grep inet'
```
