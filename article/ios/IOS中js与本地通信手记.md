# IOS中js与本地通信手记

`原创` `2014-09-17 11:37:04`

如果只有一个webview要想js与ios的本地代码进行通信可以使用现成的phonegap框架，现因项目要求开发ipad版本的应用，页面中有多个需要多个webview所以需要自己编写js代码实现js与本地代码通信。

基本原理是：webview访问特殊的url前缀地址，然后在UIWebViewDelegate的shouldStartLoadWithRequest方法中对url进行过滤就可以达到js与本地代码进行通信了。

1.在MainViewController中实现UIWebViewDelegate，实现shouldStartLoadWithRequest方法：

```
#define CALLFUNCTION_PREFIX @"https://callfunction//"
```

```objectivec
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    NSString *url = [request.URL absoluteString];
    NSLog(@"url = %@",url);
    
    if(![@""isEqualToString:url] && [url hasPrefix:CALLFUNCTION_PREFIX]){
        [_pluginUtils executePluginByUrl:url webView:webView webViewController:self];
        return NO;
    }
    return YES;
}
```

2.以下代码通过类名和方法名反射执行指定类的指定方法：

```objectivec
//
//  PluginUtils.m
// 
//
//  Created by chenliang on 15/11/10.
//  Copyright © 2015年 China Industrial Bank. All rights reserved.
//

#import "PluginUtils.h"
#import "NotifactionName.h"
#import "MMDrawerController.h"

@implementation PluginUtils{
    id target;
}

-(void)executePluginByUrl:(NSString *)url webView:(UIWebView *)wv webViewController:(UIViewController *)webViewController{
    
    NSRange range = [url rangeOfString:CALLFUNCTION_PREFIX];
    NSString *temp = [url substringFromIndex:range.location + range.length];
    NSArray *arr = [temp componentsSeparatedByString:@"&"];
    
    NSString *callBackId = @"";
    NSString *className = @"";
    NSString *methodName = @"";
    NSMutableArray *params = [NSMutableArray arrayWithCapacity:0];
    
    if(arr != nil && arr.count > 0){
        NSString *tt = [arr objectAtIndex:0];
        NSArray *tempArr = [tt componentsSeparatedByString:@"="];
        callBackId = [tempArr objectAtIndex:1];
        
        tt = [arr objectAtIndex:1];
        tempArr = [tt componentsSeparatedByString:@"="];
        className = [tempArr objectAtIndex:1];
        
        tt = [arr objectAtIndex:2];
        tempArr = [tt componentsSeparatedByString:@"="];
        methodName = [tempArr objectAtIndex:1];
        
        tt = [arr objectAtIndex:3];
        tempArr = [tt componentsSeparatedByString:@"="];
        NSString *paramStr = [tempArr objectAtIndex:1];
        paramStr = [paramStr stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        if(paramStr != nil && paramStr.length > 0){
            params = [NSMutableArray arrayWithArray:[paramStr componentsSeparatedByString:@"$"]];
        }
        
        //反射调用有参方法
        NSMutableArray *pp = [NSMutableArray arrayWithCapacity:0];
        for(NSString *t in params){
            NSString *pt = [self filterArgument:t];
            if(pt != nil){
                [pp addObject:pt];
            }
        }
        NSLog(@"className = %@ methodName = %@",className,methodName);
        
        //弹出键盘，跳转页面，弹出提示，三种情况需要隐藏键盘
        if([@"NumberKeyBoardPlugin"isEqualToString:className] || [@"UrlProcessPlugin"isEqualToString:className]){
            [[NSNotificationCenter defaultCenter]postNotificationName:HideNumberKeyboardPlugin object:nil];
        }else if([@"HomeViewPlugin"isEqualToString:className] && ([@"showTip2"isEqualToString:methodName] || [@"showTip1"isEqualToString:methodName])){
            [[NSNotificationCenter defaultCenter]postNotificationName:HideNumberKeyboardPlugin object:nil];
        }
        
        Class cls = NSClassFromString(className);
        target = [[cls alloc]init];
        SEL selector = NSSelectorFromString([NSString stringWithFormat:@"%@%@",methodName,@":"]);
        if([target respondsToSelector:selector]){
            @try {
                SEL sel1 = NSSelectorFromString(@"setCallbackId:");
                if ([target respondsToSelector:sel1]) {
                    [target performSelector:sel1 withObject:callBackId afterDelay:0.0];
                }
                
                SEL sel2 = NSSelectorFromString(@"setWebView:");
                if ([target respondsToSelector:sel2]) {
                    [target performSelector:sel2 withObject:wv afterDelay:0.0];
                }
                
                SEL sel3 = NSSelectorFromString(@"setWebViewController:");
                if ([target respondsToSelector:sel3]) {
                    [target performSelector:sel3 withObject:webViewController afterDelay:0.0];
                }
            }@catch (NSException *exception) {
                NSLog(@"exception: %@",exception);
                NSLog(@"PluginUtils: class:%@ method:%@ execute error...",className,methodName);
            }
            [target performSelector:selector withObject:pp afterDelay:0.0];
        }
    }
}

#pragma mark -
-(NSString *)filterArgument:(NSString *)argument{
    if([argument isEqual:[NSNull null]] ||
       argument == nil ||
       [@"undefined"isEqualToString:argument]){
        return nil;
    }else{
        return argument;
    }
}

@end
```

3.js插件编写，使用location.href访问指定的url，这里有一个bug就是，不能同时调用两个插件，因为第二个插件的location.href会覆盖第一个location.href,所以需要等待第一个执行完才可以执行第二个。

```javascript
/*
 
 create by chenl 2015-06-09
 
 需要的插件有：
 BizPlugin
 */


var BizPluginshowRegistSuccessEvent;
var BizPluginshowRegistFailEvent;


//定义插件
function pageName(){
    var strUrl=location.href;
    var arrUrl=strUrl.split("/");
    var strPage=arrUrl[arrUrl.length-1];
    return strPage;
}
function createFrame(url){
    url = "https://" + url;
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}

if(!window.plugins){
    window.plugins = {};
}

if(!window.js2native){
    window.js2native = {
        exec : function(className,methodName,params){
            var arr = params;
            var arrStr = '';
            if(arr && arr.length > 0){
                for(var tt in arr){
                    arrStr += '$';
                    arrStr += arr[tt];
                }
                arrStr = arrStr.substring(1);
            }
            var url="callfunction//callbackId=" + className + methodName +"&className="+className+"&method="+methodName + "&params=" + encodeURIComponent(arrStr);
            url += ("&currentPage=" + pageName());
            url += ("&tt=" + new Date().getTime());
            
            createFrame(url);
        }
    };
}

//------------------------------插件方法------------------------//
function BizPlugin(){};//注册页面

//**********************************  BizPlugin  ************************************//
BizPlugin.prototype.showRegist = function(successCallback, failureCallback,params){
    BizPluginshowRegistSuccessEvent = successCallback;
    BizPluginshowRegistFailEvent = failureCallback;
    js2native.exec("BizPlugin", "showRegist",[params]);
}

window.plugins.bizPlugin = new BizPlugin();
//----------------------------------------------------------------------------------------//
```

 4.其中 
js2native_exception_arr是为了异步访问后台，需要与
NSURLCache一同使用。


```objectivec
@interface LocalSubstitutionCache : NSURLCache<NSURLConnectionDataDelegate>{
	NSMutableDictionary *cachedResponses;
}

- (NSCachedURLResponse *)cachedResponseForRequest:(NSURLRequest *)request{
	//
	// Get the path for the request
	//
    NSString *pathString = [[request URL] absoluteString];
    NSString *relativePath=[[request URL] relativePath];
    NSString *version = [[request URL] query];
    NSLog(@"LocalSubstitutionCache===%@",pathString);
    
    
    if(pathString != nil && ![@""isEqualToString:pathString] && [pathString hasPrefix:EXCEPTION_CALLFUNCTION_PREFIX]){
        pathString = [pathString substringFromIndex:[EXCEPTION_CALLFUNCTION_PREFIX length]];
        pathString = [NSString stringWithFormat:@"%@%@",EXCEPTION_CALLFUNCTION_REPLACE,pathString];
        [[BasicPlugin getInstance]executePluginByUrl:pathString tag:1];
        NSLog(@"cachedResponseForRequest.executePluginByUrl = %@",pathString);
        return [super cachedResponseForRequest:request];
    }

......
```
