
# Code Snippets

* async

```objc
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
     
});
```

* const string

```objc
static NSString *const constString = @"123456";
```

* string

```objc
#define __cl_aspects_example_md_json__(x) #x
    static NSString *exampleMDJson = @__cl_aspects_example_md_json__(
         ([
           {
               "eventName": "点击立即注册",
               "eventId": "Register_Begin_Button",
               "eventLabels": {
                   "Channel": "$channel",
                   "Equipment": "$Equipment",
                   "VersionNumber": "4.5.3"
               },
               "md": {
                   "class": "TestViewController",
                   "method": "viewDidLoad"
               },
               "desc": "渠道(Channel):"
           }
       ])
    );
#undef __cl_aspects_example_md_json__
```

* IMP

```objc
NSString * (*idfaIMP)(id, SEL) = (NSString * (*)(id, SEL))[cla methodForSelector:sel];
```

* main_async

```objc
dispatch_async(dispatch_get_main_queue(), ^{
     
});
```

* 单例

```objc
static UserInfo *instance = nil;
+ (UserInfo *)sharedInstance{
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        instance = [[self alloc] init];
    });
    return instance;
}
```