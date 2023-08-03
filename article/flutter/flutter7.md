
# Flutter命令行全局配置（command not found: flutter）

`原创` `2022-07-06 09:58:57`

```bash
open ~/.bash_profile
```
1.复制如下内容到.bash_profile中(其中lion为用户名)
```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH=/Users/lion/flutter/bin:$PATH
```
2.打开.zshrc文件，没有则使用vim创建
```bash
open ~/.zshrc
vim ~/.zshrc
```
3.将.bash_profile中的内容复制到.zshrc中，然后执行source生效
```bash
source ~/.zshrc

# 运行flutter -h查看是否生效
```
