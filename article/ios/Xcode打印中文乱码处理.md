# Xcode打印中文乱码处理

`转载` `2020-11-23 15:26:40 `

代码转载自 [allencelee/LYLUnicode](https://github.com/allencelee/LYLUnicode)

将类引入到项目中即可（因为是static所以会自行调用）

LYLUnicode.h

```objectivec
#import <Foundation/Foundation.h>
```


LYLUnicode.m

```objectivec

#import "LYLUnicode.h"

#ifdef DEBUG //这里我加了#ifdef DEBUG的判断
    
#import <objc/runtime.h>

static inline void LYL_swizzleSelector(Class class, SEL originalSelector, SEL swizzledSelector) {
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    if (class_addMethod(class, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod))) {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}

@implementation NSString (LYLUnicode)

- (NSString *)stringByReplaceUnicode {
    NSMutableString *convertedString = [self mutableCopy];
    [convertedString replaceOccurrencesOfString:@"\\U"
                                     withString:@"\\u"
                                        options:0
                                          range:NSMakeRange(0, convertedString.length)];
    
    CFStringRef transform = CFSTR("Any-Hex/Java");
    CFStringTransform((__bridge CFMutableStringRef)convertedString, NULL, transform, YES);
    return convertedString;
}

@end

@implementation NSArray (LYLUnicode)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        LYL_swizzleSelector(class, @selector(description), @selector(LYL_description));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:), @selector(LYL_descriptionWithLocale:));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:indent:), @selector(LYL_descriptionWithLocale:indent:));
    });
}

/**
 *  我觉得 
 *  可以把以下的方法放到一个NSObject的category中
 *  然后在需要的类中进行swizzle
 *  但是又觉得这样太粗暴了。。。。
 */

- (NSString *)LYL_description {
    return [[self LYL_description] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale {
    return [[self LYL_descriptionWithLocale:locale] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale indent:(NSUInteger)level {
    return [[self LYL_descriptionWithLocale:locale indent:level] stringByReplaceUnicode];
}

@end

@implementation NSDictionary (LYLUnicode)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        LYL_swizzleSelector(class, @selector(description), @selector(LYL_description));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:), @selector(LYL_descriptionWithLocale:));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:indent:), @selector(LYL_descriptionWithLocale:indent:));
    });
}

- (NSString *)LYL_description {
    return [[self LYL_description] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale {
    return [[self LYL_descriptionWithLocale:locale] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale indent:(NSUInteger)level {
    return [[self LYL_descriptionWithLocale:locale indent:level] stringByReplaceUnicode];
}

@end

@implementation NSSet (LYLUnicode)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        LYL_swizzleSelector(class, @selector(description), @selector(LYL_description));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:), @selector(LYL_descriptionWithLocale:));
        LYL_swizzleSelector(class, @selector(descriptionWithLocale:indent:), @selector(LYL_descriptionWithLocale:indent:));
    });
}

- (NSString *)LYL_description {
    return [[self LYL_description] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale {
    return [[self LYL_descriptionWithLocale:locale] stringByReplaceUnicode];
}

- (NSString *)LYL_descriptionWithLocale:(nullable id)locale indent:(NSUInteger)level {
    return [[self LYL_descriptionWithLocale:locale indent:level] stringByReplaceUnicode];
}

@end

#endif
```


