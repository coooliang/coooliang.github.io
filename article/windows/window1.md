# Win10家庭版如何启用本地组策略

`转载` `2019-06-08 10:53:10`

转载自互联网：[百度](https://jingyan.baidu.com/article/a378c960e7f7e5b32828303e.html)

1.新建文件gpedit.cmd
2.文件添加以下内容

```bash
@echo off

pushd "%~dp0"

dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt

dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt

for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"C:\Windows\servicing\Packages\%%i"

pause
```

3.等待提示按任意键时才关闭
4.运行-->gpedit.msc就可以打开组策略了。