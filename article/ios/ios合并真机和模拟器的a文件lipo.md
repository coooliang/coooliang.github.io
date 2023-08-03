# ios 合并真机和模拟器的.a文件（lipo）

`转载` `2015-03-19 15:52:26`

文章部分内容转载自：http://blog.csdn.net/yangtb2010/article/details/8916442

貌似他也是转载的...

使用mac可以直接在终端使用：
lipo -create SQY/iOS/iphoneos/libGamePlusAPI.a SQY/iOS/iphonesimulator/libGamePlusAPI.a  -output SQY/iOS/libGamePus.a

其中SQY/iOS/iphoneos/libGamePlusAPI.a //为真机库。  
SQY/iOS/iphonesimulator/libGamePlusAPI.a //为模拟器库 
-output SQY/iOS/libGamePus.a //为两个合并后存放的路径

然后可以输入命令测试下是否成功  
lipo -info SQY/iOS/libGamePus.a  //下面是输出 armv7 i386 有了两个就表情模拟器和真机都支持  其中armv7为真机架构 i386为模拟器
Architectures in the fat file: SQY/iOS/libGamePus.a are: armv7 i386


Xcode中的Aggregate中创建run script可实现自动lipo

```bash
set -e
set +u

if [[ $SF_MASTER_SCRIPT_RUNNING ]]
then
exit 0
fi
set -u
export SF_MASTER_SCRIPT_RUNNING=1

INSTALL_DIR=${SRCROOT}/bin/
DEVICE_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphoneos
SIMULATOR_DIR=${BUILD_ROOT}/${CONFIGURATION}-iphonesimulator
SF_TARGET_NAME="DurianKit"
SF_EXECUTABLE_PATH="lib${SF_TARGET_NAME}.a"

if [ -d "${INSTALL_DIR}" ]
then
rm -rf "${INSTALL_DIR}"
fi

mkdir -p "${INSTALL_DIR}"

xcodebuild clean -project "${PROJECT_FILE_PATH}" -target "${SF_TARGET_NAME}" -configuration "${CONFIGURATION}" -sdk iphonesimulator BUILD_DIR="${BUILD_DIR}" OBJROOT="${OBJROOT}" BUILD_ROOT="${BUILD_ROOT}" SYMROOT="${SYMROOT}" $ACTION

xcodebuild clean -project "${PROJECT_FILE_PATH}" -target "${SF_TARGET_NAME}" -configuration "${CONFIGURATION}" -sdk iphoneos BUILD_DIR="${BUILD_DIR}" OBJROOT="${OBJROOT}" BUILD_ROOT="${BUILD_ROOT}" SYMROOT="${SYMROOT}" $ACTION

lipo -create "${DEVICE_DIR}/${SF_EXECUTABLE_PATH}" "${SIMULATOR_DIR}/${SF_EXECUTABLE_PATH}" -output "${INSTALL_DIR}/${SF_EXECUTABLE_PATH}"

xcodebuild clean -project "${PROJECT_FILE_PATH}" -target "${SF_TARGET_NAME}" -configuration "${CONFIGURATION}" -sdk iphoneos -arch arm64 BUILD_DIR="${BUILD_DIR}" OBJROOT="${OBJROOT}" BUILD_ROOT="${BUILD_ROOT}" SYMROOT="${SYMROOT}" $ACTION

lipo -create "${DEVICE_DIR}/${SF_EXECUTABLE_PATH}" "${INSTALL_DIR}/${SF_EXECUTABLE_PATH}" -output "${INSTALL_DIR}/${SF_EXECUTABLE_PATH}"

```
