# NSNotificationCenter钩子

`转载` `2015-05-12 20:14:52`

文章内容转载自:http://stackoverflow.com/

当你想知道系统当前使用了哪些NSNotificationCenter可以使用这个钩子查看，例如：webview中加载iframe视频，点击iframeIOS7调用的是UIMoviePlayerControllerNotification,而ios8则不同，那我们怎么知道系统是调用哪个Notification，使用这个钩子就可以将所有的Notification打印出来。（用完记得删除）

NSNotificationCenter+Hook.h

```objectivec
#import <Foundation/Foundation.h>

@interface NSNotificationCenter (Hook)

@end
```

NSNotificationCenter+Hook.m

```objectivec
#import "NSNotificationCenter+Hook.h"
#import <objc/runtime.h>

@implementation NSNotificationCenter (Hook)

+ (void)load
{
    Method original = class_getInstanceMethod([NSNotificationCenter class], @selector(postNotificationName:object:userInfo:));
    Method swizzled = class_getInstanceMethod([NSNotificationCenter class], @selector(swizzle_postNotificationName:object:userInfo:));
    
    method_exchangeImplementations(original, swizzled);
    
    original = class_getInstanceMethod([NSNotificationCenter class], @selector(postNotificationName:object:));
    swizzled = class_getInstanceMethod([NSNotificationCenter class], @selector(swizzle_postNotificationName:object:));
    
    method_exchangeImplementations(original, swizzled);
    
    original = class_getInstanceMethod([NSNotificationCenter class], @selector(postNotification:));
    swizzled = class_getInstanceMethod([NSNotificationCenter class], @selector(swizzle_postNotification:));
    
    method_exchangeImplementations(original, swizzled);
}

- (void)swizzle_postNotificationName:(NSString *)aName object:(id)anObject userInfo:(NSDictionary *)aUserInfo{
    
    NSLog(@"HOOK_NOTIFICATION_With_UserInfo: %@",aName);
    [[NSNotificationCenter defaultCenter]swizzle_postNotificationName:aName object:anObject userInfo:aUserInfo];
    
}

- (void)swizzle_postNotificationName:(NSString *)aName object:(id)anObject{
    NSLog(@"HOOK_NOTIFICATION_Without_UserInfo: %@",aName);
    [[NSNotificationCenter defaultCenter]swizzle_postNotificationName:aName object:anObject];
}

- (void)swizzle_postNotification:(NSNotification *)notification
{
    NSLog(@"HOOK_NOTIFICATION_NSNotification: %@",notification.name);
    [[NSNotificationCenter defaultCenter]swizzle_postNotification:notification];
}

@end
```
