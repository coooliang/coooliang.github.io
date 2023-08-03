# infer

`原创` `2023-07-20 14:48:11`

> git下载

https://github.com/facebook/infer.git

```bash
# Checkout Infer
git clone https://github.com/facebook/infer.git
cd infer
# Compile Infer
./build-infer.sh java
# install Infer system-wide...
sudo make install
# ...or, alternatively, install Infer into your PATH
export PATH=`pwd`/infer/bin:$PATH
```

> 下载release包

https://github.com/facebook/infer/releases/download/v1.0.0/infer-osx-v1.0.0.tar.xz


> 编译项目

```bash
cd /Users/lion/Downloads/test-demo/test

infer --keep-going --no-xcpretty -- xcodebuild -workspace test.xcworkspace -scheme test -configuration Debug -sdk iphoneos
```

> .inferconfig 设置过滤目录

```
{
  "report-blacklist-path-regex": [
    "Pods",
    "test/Librarys"
  ]
}
```


