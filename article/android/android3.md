# android运行模拟器脚本(批处理)

`原创` `2011-02-14 10:03:00`

批处理是老师给的 也是来自互联网

只是随便做个记录表示有做过android。。。

run.bat

```batch
@rem : rem(或者::)相当于c语言中的//注释符号
@rem : /D表示连盘符一起改变 
@rem : 最好的注释行的方法 => 冒号后紧接一个空格(必须要找个空格)    
@rem : exit /B 0  : 只退出当前批处理脚本，而不是退出cmd.exe程序。退出码为0

: *******************************************************************************
: *** 将要执行的操作语句放到这里 
@goto run_emu_win 
: *******************************************************************************

:run_emu_win
rem run android emulator now in windows(运行android模拟器)
@set ANDROID_SDK_DIR=E:/CL/android-sdk-windows_2.2完整版/android-sdk-windows/
@set ANDROID_EMULATOR=%ANDROID_SDK_DIR%/tools/emulator.exe
@set ANDROID_RUN_DIR_ORIG=%ANDROID_SDK_DIR%/platforms/android-8/

: @set ANDROID_RUN_DIR=E:/CL/android-sdk-windows_2.2完整版/android-sdk-windows/
: @set ANDROID_RUN_SKIN_DIR=%ANDROID_SDK_DIR%/tools/lib/images/skins


: @set ANDROID_SKIN=HVGA-L
: @set ANDROID_SKIN=QVGA-P
: @set ANDROID_SKIN=QVGA-HENG
 @set ANDROID_SKIN=HVGA
: @set ANDROID_SKIN=WVGA
: @set ANDROID_SKIN=WVGA800

: ***************************************************************************
: *** emulator run method :
 @%ANDROID_EMULATOR%  -sysdir %ANDROID_RUN_DIR_ORIG%/images -data %ANDROID_RUN_DIR_ORIG%/images/userdata.img -skindir %ANDROID_RUN_DIR_ORIG%/skins -skin HVGA -memory 512 -debug all
 
pause

exit
```

install.bat

CLWeather.apk在工程bin目录下直接copy

```batch
adb install CLWeather.apk
pause
exit
```

uninstall.bat

其中 org.spring.demo是在工程中的AndroidManifest.xml文件中的：package="org.spring.demo"

```batch
adb uninstall org.spring.demo
pause
exit
```
