# Mac重装ruby并重装cocoapods

`原创` `2021-02-19 17:28:12`

```bash
rvm install ruby-2.6
ruby -v
rvm use ruby-2.6.6
rvm --default use 2.6.6
sudo gem install -n /usr/local/bin cocoapods
pod --version
pod search afnetworking
```

多repo报错时
```
cd /Users/lion/.cocoapods/repos/cocoapods 
git clone --depth 1 https://github.com/CocoaPods/Specs.git master
```


