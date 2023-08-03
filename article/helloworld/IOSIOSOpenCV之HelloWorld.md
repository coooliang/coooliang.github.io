

转载必须声明出处，谢谢！ 

cocopods的使用：http://blog.csdn.net/coooliang/article/details/50086601

--------------------------分割线---------------------------



1.添加Podfile

内容如下：

```
platform :ios, '7.0'

pod 'OpenCV', '~> 2.4.10'
```





2.到工程目录执行pod install

 

3.选中项目-->TARGETS-->Build Settings-->compile source As -->选中Objective-c++

 

4.在工程中创建OpenCVTest.pch文件

内容如下：

```
//
//  OpenCVTest.pch
//  OpenCVTest
//
//  Created by 陈亮 on 11/28/15.
//  Copyright © 2015 coooliang. All rights reserved.
//

#ifndef OpenCVTest_pch
#define OpenCVTest_pch

// Include any system framework and library headers here that should be included in all compilation units.
// You will also need to set the Prefix Header build setting of one or more of your targets to reference this file.

#import <Availability.h>

#ifdef __cplusplus
#import <opencv2/opencv.hpp>
#endif

#ifdef __OBJC__
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#endif


#endif /* OpenCVTest_pch */```


 



5.选中项目-->TARGETS-->Build Settings-->prefix header中添加以下内容：

$(SRCROOT)/OpenCVTest/OpenCVTest.pch

 

这里还有我在github上的例子工程哦！！

https://github.com/coooliang/OpenCVTest 

 

 

