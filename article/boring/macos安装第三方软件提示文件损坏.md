# macOS安装第三方软件提示文件损坏

`原创` `2019-12-29 14:51:42`

### 用这个命令行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/Folx.app
```

Folx.app是软件名称

PS: 之前打开所有来源的办法不行了

```bash
sudo spctl --master-disable
```
