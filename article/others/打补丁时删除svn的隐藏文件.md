# 打补丁时删除.svn的隐藏文件

`转载` `2012-11-27 17:43:23`

此内容是我工作中得到的，内容可能来自互联网

```
Windows Registry Editor Version 5.00 
 [HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN] 
 @="Delete SVN Folders" 

 [HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN\command] 
 @="cmd.exe /c \"TITLE Removing SVN Folders in %1 && COLOR 9A && FOR /r \"%1\" %%f IN (.svn) DO RD /s /q \"%%f\" \""
```
将以上内容保存为delete_svn.reg ,这个文件的作用是添加鼠标右键，当在文件夹上点击右键时会出现“Delete SVN Folders”的选项，选择就可以删除该文件夹下的.svn隐藏文件了，相当好用。再也不需要查找删除了。 
