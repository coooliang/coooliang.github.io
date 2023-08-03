# IOS文件的断点续传之HelloWorld

`原创` `2015-11-14 22:01:56`

转载必须声明出处，谢谢！

1.首先你必须跟上时代，在工程中用上cocoapods（网络上也可以搜到很多安装教程，这里要注意的是原来的http换成了https）



```bash
打开mac终端（Terminal）,依次输入这四行命令：

gem sources --remove https://rubygems.org/

gem sources -a https://ruby.taobao.org/

gem sources -l

sudo gem install cocoapods


需要等一段时间不要急。```

 2.安装完cocoapods后，创建一个新的工程，然后在工程的根目录也就是有 .xcodeproj 后缀的那个目录创建一个名字叫Podfile的文件（这个文件没有后缀） 

在Podfile文件中写上常用的库，例如：

```
platform :ios, '7.0'

pod "AFNetworking","~> 2.6.3"

pod 'AFDownloadRequestOperation', '~> 2.0.1'

pod 'Reachability', '~> 3.2'

pod 'ReactiveCocoa'

pod 'MBProgressHUD', '~> 0.9.1'

pod 'SVProgressHUD', '~> 1.1.3'

pod 'JSONKit-NoWarning', '~> 1.2'
```

3.在终端(Terminal)中cd到Podfile文件的目录，然后运行pod install例如： 

```bash
cd ~/Documents/xcode/workproject/EducationOnLine/

pod install

```
pwd 可以查看当前路径 

ls 可以查看当前目录下的文件列表

4.pod install后工程中就会出现一个后缀为.xcworkspace的文件，之后就用xcode打开这个文件而不是原来工程中的.xcodeproj文件了。

------------

DownloadViewController.h

```objectivec
#import <UIKit/UIKit.h>

@interface DownLoadViewController : UIViewController

@end
```

DownloadViewController.m 

```objectivec
#import "DownLoadViewController.h"
#import <ReactiveCocoa.h>
#import <AFHTTPRequestOperation.h>
#import "CacheManager.h"

#define URL @"https://codeload.github.com/kishikawakatsumi/UCZProgressView/zip/master"
@implementation DownLoadViewController{
    
}

-(void)viewDidLoad{
    [super viewDidLoad];
    
    NSURL *url = [[NSURL alloc] initWithString:URL];
    NSString *fileName = [url lastPathComponent];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    NSArray *arr = [[CacheManager sharedManager]getCacheFiles];
    NSLog(@"arr = %@",arr);
    
//    [[CacheManager sharedManager]deleteFile:fileName];
//
//    arr = [[CacheManager sharedManager]getCacheFiles];
//    NSLog(@"arr = %@",arr);
    
    unsigned long long downloadedBytes = [[CacheManager sharedManager]fileSizeForFileName:fileName];
    if (downloadedBytes > 0) {
        NSMutableURLRequest *mutableURLRequest = [request mutableCopy];
        NSString *requestRange = [NSString stringWithFormat:@"bytes=%llu-", downloadedBytes];
        [mutableURLRequest setValue:requestRange forHTTPHeaderField:@"Range"];
        request = mutableURLRequest;
    };
    
    AFHTTPRequestOperation *operation = [[CacheManager sharedManager]createOperation:URL];

    
    [operation setDownloadProgressBlock:^(NSUInteger bytesRead, long long totalBytesRead, long long totalBytesExpectedToRead) {
        NSLog(@"bytesRead = %lu , totalBytesRead = %lld , totalBytesExpectedToRead = %lld",(unsigned long)bytesRead,totalBytesRead,totalBytesExpectedToRead);
        NSLog(@"download：%f", (float)(totalBytesRead+downloadedBytes) / (float)(downloadedBytes+totalBytesExpectedToRead));
        
        
    }];
    
    [operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation * _Nonnull operation, id  _Nonnull responseObject) {
        NSLog(@"success");
        
    } failure:^(AFHTTPRequestOperation * _Nonnull operation, NSError * _Nonnull error) {
                    NSLog(@"failure");
    }];
    
    UIButton *dlbutton = [[UIButton alloc]initWithFrame:CGRectMake(0, 30, 60, 30)];
    [dlbutton setTitle:@"下载" forState:UIControlStateNormal];
    
    [[dlbutton rac_signalForControlEvents:UIControlEventTouchUpInside]subscribeNext:^(id x) {
        [operation start];
    }];
    
    UIButton *pbutton = [[UIButton alloc]initWithFrame:CGRectMake(0, 70, 60, 30)];
    [pbutton setTitle:@"暂停" forState:UIControlStateNormal];
    [[pbutton rac_signalForControlEvents:UIControlEventTouchUpInside]subscribeNext:^(id x) {
        [operation pause];
    }];
    
    UIButton *gbutton = [[UIButton alloc]initWithFrame:CGRectMake(0, 110, 60, 30)];
    [gbutton setTitle:@"继续" forState:UIControlStateNormal];
    [[gbutton rac_signalForControlEvents:UIControlEventTouchUpInside]subscribeNext:^(id x) {
        [operation resume];
    }];
    
//    [operation cancel];
//    operation = nil;
    
    [self.view addSubview:dlbutton];

    [self.view addSubview:pbutton];
    
    [self.view addSubview:gbutton];
    
}
```

CacheManager.h 

```objectivec
#import <Foundation/Foundation.h>
#import <AFHTTPRequestOperation.h>


@interface CacheManager : NSObject


+(CacheManager *)sharedManager;


/**
 *  返回该应用的所有缓存
 *
 *  @return 缓存列表
 */
-(NSArray *)getCacheFiles;

-(BOOL)fileIsExist:(NSString *)fileName;

-(unsigned long long)fileSizeForFileName:(NSString *)url;

-(void)deleteFile:(NSString *)fileName;

-(void)deleteFiles:(NSArray *)fileNames;

-(AFHTTPRequestOperation *)createOperation:(NSString *)url;

@end
```

CacheManager.m 

```objectivec
//
//  CacheManager.m
//  EducationOnLine
//
//  Created by coooliang on 11/14/15.
//  Copyright © 2015 coooliang. All rights reserved.
//

#import "CacheManager.h"

#define bundleIdentifier ([[NSBundle mainBundle]bundleIdentifier])
#define CacheFileName(fileName) ([NSString stringWithFormat:@"%@-%@",bundleIdentifier,fileName])
#define CacheFilePath(dict,fileName) ([dict stringByAppendingPathComponent:CacheFileName(fileName)])

@implementation CacheManager{
    NSString *_cacheDirectory;
}

+(CacheManager *)sharedManager{
    static CacheManager *instance = nil;
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

-(instancetype)init{
    if(self = [super init]){
        _cacheDirectory = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    }
    return self;
}

/**
 *  返回该应用的所有缓存
 *
 *  @return 缓存列表
 */
-(NSArray *)getCacheFiles{
    NSArray *arr = [[NSFileManager defaultManager]contentsOfDirectoryAtPath:_cacheDirectory error:nil];
    NSMutableArray *ma = [NSMutableArray arrayWithCapacity:0];
    if(arr != nil && arr.count > 0){
        for (NSString *s in arr) {
            if([s hasPrefix:bundleIdentifier]){
                [ma addObject:s];
            }
        }
    }
    return ma;
}

-(BOOL)fileIsExist:(NSString *)fileName{
    if(fileName == nil || [@""isEqualToString:fileName]){
        return NO;
    }
    NSString *path = CacheFilePath(_cacheDirectory,fileName);
    return [[NSFileManager defaultManager]fileExistsAtPath:path];
}

-(unsigned long long)fileSizeForFileName:(NSString *)fileName{
    signed long long fileSize = 0;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *path = CacheFilePath(_cacheDirectory,fileName);
    if ([fileManager fileExistsAtPath:path]) {
        NSError *error = nil;
        NSDictionary *fileDict = [fileManager attributesOfItemAtPath:path error:&error];
        if (!error && fileDict) {
            fileSize = [fileDict fileSize];
        }
    }
    return fileSize;
}


-(void)deleteFile:(NSString *)fileName{
    [[NSFileManager defaultManager]removeItemAtPath:CacheFilePath(_cacheDirectory,fileName) error:nil];
}

-(void)deleteFiles:(NSArray *)fileNames{
    if(fileNames != nil && fileNames.count > 0){
        for (NSString *f in fileNames) {
            [[NSFileManager defaultManager]removeItemAtPath:CacheFilePath(_cacheDirectory,f) error:nil];
        }
    }
}


-(AFHTTPRequestOperation *)createOperation:(NSString *)url{
    if(url == nil || [@""isEqualToString:url]){
        return nil;
    }
    NSURL *nurl = [[NSURL alloc] initWithString:url];
    NSURLRequest *request = [NSURLRequest requestWithURL:nurl];
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc]initWithRequest:request];
    operation.inputStream = [NSInputStream inputStreamWithURL:nurl];
    operation.outputStream = [NSOutputStream outputStreamToFileAtPath:CacheFilePath(_cacheDirectory,[url lastPathComponent]) append:YES];
    
    return operation;
}

@end
```

以上代码我根据自己的要求添加了id+文件名来存储文件，你们可以根据自己的要求进行修改，这个demo主要是让大家了解AFHTTPRequestOperation的基本操作，只是起到抛砖引玉的作用。 
