# Xcode Alcatraz的安装（Package Manager）

`原创` `2018-08-15 16:12:19`

```bash
1.删除原先的Alcatraz
rm -rf ~/Library/Application\ Support/Developer/Shared/Xcode/Plug-ins/Alcatraz.xcplugin
rm -rf ~/Library/Application\ Support/Alcatraz/

2.安装update_xcode_plugins
sudo gem install update_xcode_plugins 

3.安装Alcatraz
curl -fsSL https://raw.github.com/alcatraz/Alcatraz/master/Scripts/install.sh | sh

4.Added id 到 Alcatraz 
update_xcode_plugins

```
