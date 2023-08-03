# 判断是否连接了代理

转载自互联网：[https://blog.csdn.net/asuno_1/article/details/80607206](https://blog.csdn.net/asuno_1/article/details/80607206)

```objectivec
#import <CFNetwork/CFNetwork.h>

/**
 判断是否设置代理

 @return YES连接了代理，NO没有连接代理
 */
+(BOOL)isUseProxy{
    NSDictionary *proxySettings = (__bridge NSDictionary *)(CFNetworkCopySystemProxySettings());
    NSArray *proxies = (__bridge NSArray *)(CFNetworkCopyProxiesForURL((__bridge CFURLRef _Nonnull)([NSURL URLWithString:@"https://www.yypt.com"]), (__bridge CFDictionaryRef _Nonnull)(proxySettings)));
    NSDictionary *settings = nil;
    NSLog(@"proxies: %@",proxies);
    if (proxies && proxies.count > 0) {
        settings = proxies[0];
        if (settings) {
//            NSLog(@"kCFProxyHostNameKey: %@",[settings objectForKey:(NSString *)kCFProxyHostNameKey]);
//            NSLog(@"kCFProxyPortNumberKey: %@",[settings objectForKey:(NSString *)kCFProxyPortNumberKey]);
//            NSLog(@"kCFProxyTypeKey: %@",[settings objectForKey:(NSString *)kCFProxyTypeKey]);
            
            if(![@"kCFProxyTypeNone"isEqualToString:[settings objectForKey:(NSString *)kCFProxyTypeKey]]){
                NSLog(@"设置了代理");
                //[[[UIAlertView alloc]initWithTitle:@"" message:@"yes" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil]show];
                return YES;
            }
        }
    }
    NSLog(@"没有设置代理");
    //[[[UIAlertView alloc]initWithTitle:@"" message:@"no" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil]show];
    return NO;
}
```


