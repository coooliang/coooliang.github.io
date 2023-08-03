# xcode10 使用Alcatraz插件

`转载` `2018-11-12 14:54:30`

文章转载自：[https://grayland119.github.io/2016/XCPUU/](https://grayland119.github.io/2016/XCPUU/)

打开Keychain Access之后如图操作: 
![./figures/20181112145203755.png](./26.png)
 
![./figures/20181112145218644.png](./27.png)


```bash
$ sudo codesign -f -s XcodeSigner /Applications/Xcode.app
$ update_xcode_plugins
```


完全退出xcode后再重新打开xcode

