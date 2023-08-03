

```bash
#查看node版本
node -v

#nodejs中有一个模块叫n，专门用来管理node.js的版本的
npm install -g n

#使用n升级node.js到最新稳定版
n stable

#安装expo
npm install --global expo-cli

#安装脚手架create-react-native-app
npm install -g create-react-native-app

```


```bash
#使用create-react-native-app创建应用
create-react-native-app rndemo
✔ How would you like to start › Default new app
✔ Downloaded and extracted project files.

Using Yarn to install packages. You can pass --use-npm to use npm instead.

✔ Installed JavaScript dependencies.
⚠️  Something went wrong running `pod install` in the `ios` directory. Continuing with initializing the project, you can debug this afterwards.

✅ Your project is ready!

To run your project, navigate to the directory and run one of the following yarn commands.

- cd rndemo
- yarn android
- yarn ios
- yarn web

⚠️  Before running your app on iOS, make sure you have CocoaPods installed and initialize the project:

  cd rndemo/ios
  npx pod-install
```


```bash
#进入项目，使用xcode打开项目
cd appName/ios
open appName.xcworkspace

#使用expo打开
cd appName/
expo start
#扫码可以远程测试应用
```


```bash
# 安装android模拟器
https://docs.expo.io/workflow/android-studio-emulator/
```


