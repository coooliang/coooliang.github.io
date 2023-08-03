# 删除 .DS_Store

`转载` `2021-10-30 11:27:02`

转载自互联网：https://www.jianshu.com/p/fdaa8be7f6c3

```bash
删除项目中的所有.DS_Store。这会跳过不在项目中的 .DS_Store
1.find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
将 .DS_Store 加入到 .gitignore
2.echo .DS_Store >> ~/.gitignore
更新项目
3.git add --all
4.git commit -m '.DS_Store banished!'
```


