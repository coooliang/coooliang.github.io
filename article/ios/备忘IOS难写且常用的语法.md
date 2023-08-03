# 【备忘】IOS难写且常用的语法

`原创` `2018-08-21 11:47:21`

单例 sharedInstance

```objectivec
//单例
+ (id)sharedInstance{
    static MyClass *instance;
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        instance = [[self alloc] init];
    });
    return instance;
}
```


方法和变量black的写法

```objectivec
typedef void (^SureBlock)(NSString *score);
typedef void (^CancelBlock)(void);
@implementation MyClass{
	CancelBlock _cancelBlock;
    CloseBlock _sureBlock;
}
-(void)method:(void(^)(NSString *score))sureBlock cancelBlock:(void(^)(void))cancelBlock{
	_sureBlock = sureBlock;
	_cancelBlock = cancelBlock;
}
@end
```


AppDelegate init

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    ViewController *viewController = [[ViewController alloc]init];
    UINavigationController *root = [[UINavigationController alloc]initWithRootViewController:viewController];
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window setRootViewController:root];
    [self.window makeKeyAndVisible];
    
    return YES;
}
```


dispatch_get_main_queue

```objectivec
#define WEAKSELF typeof(self) __weak weakSelf = self;

__strong __typeof(weakSelf)strongSelf = weakSelf;

dispatch_async(dispatch_get_main_queue(), ^{

});

- (void)exChangeMessageDataSourceQueue:(void (^)(void))queue {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), queue);
}

dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{

});
```


#deif

```objectivec
#ifdef DEV_VERSION

#else

#endif

#ifdef __OBJC__
	#import <UIKit/UIKit.h>
	#import <Foundation/Foundation.h>
#endif
```


pch

```objectivec
#ifndef Demo_Log_Debug_pch
	#define Demo_Log_Debug_pch
	#define safeString(obj) (([obj isEqual:[NSNull null]] || (obj == nil) || [@"null" isEqual:obj] || [@"<null>" isEqual:obj] || [@"(null)" isEqual:obj]) ? @"" : ([NSString stringWithFormat:@"%@",obj]))
	#define isEmptyString(obj) (([obj isEqual:[NSNull null]] || obj==nil || [@"null" isEqual:obj]) ? 1 : 0)
	
	/**
 Synthsize a weak or strong reference.
 
 Example:
    @weakify(self)
    [self doSomething^{
        @strongify(self)
        if (!self) return;
        ...
    }];

 */
#ifndef weakify
    #if DEBUG
        #if __has_feature(objc_arc)
        #define weakify(object) autoreleasepool{} __weak __typeof__(object) weak##_##object = object;
        #else
        #define weakify(object) autoreleasepool{} __block __typeof__(object) block##_##object = object;
        #endif
    #else
        #if __has_feature(objc_arc)
        #define weakify(object) try{} @finally{} {} __weak __typeof__(object) weak##_##object = object;
        #else
        #define weakify(object) try{} @finally{} {} __block __typeof__(object) block##_##object = object;
        #endif
    #endif
#endif

#ifndef strongify
    #if DEBUG
        #if __has_feature(objc_arc)
        #define strongify(object) autoreleasepool{} __typeof__(object) object = weak##_##object;
        #else
        #define strongify(object) autoreleasepool{} __typeof__(object) object = block##_##object;
        #endif
    #else
        #if __has_feature(objc_arc)
        #define strongify(object) try{} @finally{} __typeof__(object) object = weak##_##object;
        #else
        #define strongify(object) try{} @finally{} __typeof__(object) object = block##_##object;
        #endif
    #endif
#endif

#endif

#ifdef __OBJC__
	#import <UIKit/UIKit.h>
	#import <Foundation/Foundation.h>
#endif
```


阴影shadow

```objectivec
view.backgroundColor = [UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.9]; //
view.layer.shadowColor = [UIColor grayColor].CGColor;
view.layer.shadowOffset = CGSizeMake(0, 3);
view.layer.shadowOpacity = 0.5;
view.layer.shadowRadius = 6.0;
view.layer.cornerRadius = 10.0;
view.clipsToBounds = NO;
```


test push button

 ```objectivec
- (void)viewDidLoad {
    [super viewDidLoad];
    UIButton *button = [[UIButton alloc]initWithFrame:CGRectMake(100, 100, 100, 50)];
    [button setTitle:@"push" forState:UIControlStateNormal];
    [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [button addTarget:self action:@selector(push) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:button];
}

-(void)push{
    MyViewController *vc = [[MyViewController alloc]init];
    [self.navigationController pushViewController:vc animated:YES];
}
```


available

 ```objectivec
if (@available(iOS 8.0, *)){
}
```


enum:

 ```objectivec
typedef NS_ENUM(NSInteger, PPAlertViewHideAnimation){
    PPAlertViewHideAnimationNone,
    PPAlertViewHideAnimationFadeOut,
};
```


多参数

 ```objectivec
NSMutableArray *points = [NSMutableArray arrayWithCapacity:0];
[points addObject:point];

va_list args;
NSValue *p;
va_start(args, point);
while ((p = va_arg(args, NSValue *))) {
    [points addObject:p];
}
va_end(args);
```


inline

 ```objectivec
#define force_inline __inline__ __attribute__((always_inline))
```


去除警告

 ```objectivec
#define SuppressPerformSelectorLeakWarning(Stuff) \
do { \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Warc-performSelector-leaks\"") \
Stuff; \
_Pragma("clang diagnostic pop") \
} while (0)


SuppressPerformSelectorLeakWarning([target performSelector:sel withObject:param]);
```


npm缓慢问题

 ```bash
使用cnpm替换npm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```


替换及重置Homebrew默认源，解决Updating Homebrew…卡顿问题

 ```bash
替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```


 ```bash
重置brew.git:
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

重置homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```


