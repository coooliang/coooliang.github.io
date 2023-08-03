

在iphone6s之后苹果加入了3D touch功能，最为常用的功能就是在桌面重按图标可以弹出快捷菜单，那么IOS中如何实现呢？

AppDelegate.m 



```
//
//  AppDelegate.h
//
//  Created by coooliang on 15/5/8.
//  Copyright (c) 2015年 coooliang. All rights reserved.
//
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
	......

	//3D touch功能添加
    if (IS_IOS_9) {
        UIApplicationShortcutIcon *scanIcon = [UIApplicationShortcutIcon iconWithTemplateImageName:@"scan_3dtouch"];
        UIApplicationShortcutItem *scanItem = [[UIApplicationShortcutItem alloc]initWithType:@"scan" localizedTitle:@"扫一扫" localizedSubtitle:@"" icon:scanIcon userInfo:nil];
        
        UIApplicationShortcutIcon *searchIcon = [UIApplicationShortcutIcon iconWithType:UIApplicationShortcutIconTypeSearch];
        UIApplicationShortcutItem *searchItem = [[UIApplicationShortcutItem alloc]initWithType:@"search" localizedTitle:@"搜一搜" localizedSubtitle:@"" icon:searchIcon userInfo:nil];
        
        UIApplicationShortcutIcon *shareIcon = [UIApplicationShortcutIcon iconWithType:UIApplicationShortcutIconTypeShare];
        UIApplicationShortcutItem *shareItem = [[UIApplicationShortcutItem alloc]initWithType:@"share" localizedTitle:@"分享" localizedSubtitle:@"" icon:shareIcon userInfo:nil];
        
        [[UIApplication sharedApplication]setShortcutItems:@[scanItem,searchItem,shareItem]];
    }

    return YES;
}
```







```
#pragma mark - ios9 iphone6s 3d touch
- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void(^)(BOOL succeeded))completionHandler{
    NSString *type = shortcutItem.type;
    if([@"search"isEqualToString:type]){
        
    }else if([@"scan"isEqualToString:type]){
        
    }else if([@"share"isEqualToString:type]){
        
    }
}
```

 只要在AppDelegate中的两个方法中添加以上代码，就可以实现简单的图标3D Touch功能咯，就是这么简单~ 



 

 

 

 

