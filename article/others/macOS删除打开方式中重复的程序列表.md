# macOS删除打开方式中重复的程序列表

`转载` `2023-08-14 14:07:23`

https://blog.csdn.net/xiaohai695943820/article/details/126362683


```
/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain system-domainuser
```
