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
no-hosts
bogus-nxdomain=119.29.29.29
cache-size=2048
port=53
resolv-file=/etc/resolv.conf

#联通
address=/www.yypt.com/12.12.12.12
address=/www.yypt.com/240E:123:123::12

#所有com域名禁止ipv6查询
server=/com/8.8.8.8
address=/com/::
#所有域名过滤ipv6查询
server=/#/8.8.8.8
address=/#/::
```

3./etc/resolv.conf

```properties
nameserver 8.8.8.8
nameserver 8.8.4.4
```

4. 手机设置dns地址为电脑ip，使用NetAnalyzer查看dns

----


PS: 查看本机ip地址

```
alias ip='curl ifconfig.me'
alias ip2='ifconfig | grep inet | grep -v inet6 | grep -v 127'
alias ip3='ifconfig | grep inet'
```


