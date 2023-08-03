# Cocoapods的使用

`原创` `2015-11-28 19:54:30`

转载必须声明出处，谢谢！

网上的教程都比较旧了，有各种问题这是我2023年6月左右写的安装办法，算是最新的咯

1.首先你必须跟上时代，在工程中用上cocoapods（网络上也可以搜到很多安装教程，这里要注意的是原来的http换成了https）

```bash
打开mac终端（Terminal）,依次输入这四行命令：

#查看原来的源
gem sources -l


#使用清华的镜像
gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://gems.ruby-china.com
 

#查看新的源
gem sources -l

#安装
sudo gem install cocoapods
```


2.安装完cocoapods后，创建一个新的工程，然后在工程的根目录也就是有 .xcodeproj 后缀的那个目录创建一个名字叫Podfile的文件（这个文件没有后缀）

在Podfile文件中写上常用的库，例如：

```bash
platform :ios, '8.0'

target :Inspiration do

    pod "AFNetworking","~> 2.6.3"
end
```


3.在终端(Terminal)中cd到Podfile文件的目录，然后运行pod install例如：

```bash
cd ~/Documents/xcode/workproject/Inspiration/  

pod install
```

pwd 可以查看当前路径

ls 可以查看当前目录下的文件列表

4.pod install后工程中就会出现一个后缀为.xcworkspace的文件，之后就用xcode打开这个文件而不是原来工程中的.xcodeproj文件了。

PS:更新：如果出现下方错误则需要更新库：

```python
[!] CocoaPods could not find compatible versions for pod "IQKeyboardManager":
  In snapshot (Podfile.lock):
    IQKeyboardManager (= 4.0.11)

  In Podfile:
    IQKeyboardManager (~> 4.0.11)

None of your spec sources contain a spec satisfying the dependencies: `IQKeyboardManager (~> 4.0.11), IQKeyboardManager (= 4.0.11)`.

You have either:
 * out-of-date source repos which you can update with `pod repo update` or with `pod install --repo-update`.
 * mistyped the name or version.
 * not added the source repo that hosts the Podspec to your Podfile.

Note: as of CocoaPods 1.0, `pod repo update` does not happen on `pod install` by default.
```

```python
// 移除本地master
sudo rm -fr ~/.cocoapods/repos/master
// 移除本地缓存
sudo rm -fr ~/Library/Caches/CocoaPods/
// 重新setup,如果网速较慢,可以在后面加上 --verbose
pod setup

// 更新到最新的预览版,一次到底
sudo gem install cocoapods --pre
```

如果sudo gem install cocoapods --pre 无效才考虑移除本地缓存

[重新安装ruby](https://blog.csdn.net/coooliang/article/details/113868540)  
