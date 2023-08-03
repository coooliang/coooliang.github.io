# 7.2单例和深拷贝

`原创` `2014-01-29 09:46:03`

1.单例：

```objectivec
#import <Foundation/Foundation.h>

@interface MySingletonClass : NSObject

@end
```

```objectivec
#import "MySingletonClass.h"

@implementation MySingletonClass

static MySingletonClass *shareSingletonObj = nil;

+(MySingletonClass *)shareSingleton{
    @synchronized(self){
        if(shareSingletonObj == nil){
            shareSingletonObj = [[super allocWithZone:NULL]init];
        }else{
            NSLog(@"shareSingletonObj is exist");
        }
    }
    return nil;
}

//重写以下方法
+(id)allocWithZone:(struct _NSZone *)zone{
    return [[MySingletonClass shareSingleton]retain];
}

+(id)copyWithZone:(struct _NSZone *)zone{
    return self;
}

-(id)retain{
    return self;
}

-(oneway void)release{
    
}

-(id)autorelease{
    return self;
}

-(NSUInteger)retainCount{
    return NSIntegerMax;
}
//end of 重写方法

@end
```

2.NSArray和NSDictionary的深拷贝 

NSArray: 

```objectivec
#import <Foundation/Foundation.h>

@interface NSArray (DeepCopy)

-(NSMutableArray *)mutableDeepCopy;

@end
```



```objectivec
#import "NSArray+DeepCopy.h"

@implementation NSArray (DeepCopy)

//NSArray的深拷贝
-(NSMutableArray *)mutableDeepCopy{
    NSMutableArray *arrRetain = [NSMutableArray arrayWithCapacity:self.count];
    for(id obj in self){
        id oneCopy = nil;
        if([obj respondsToSelector:@selector(mutableDeepCopy)]){
            oneCopy = [obj mutableDeepCopy];
        }else if([obj respondsToSelector:@selector(mutableCopy)]){
            oneCopy = [obj mutableCopy];
        }else if([obj conformsToProtocol:@protocol(NSCopying)]){
            oneCopy = [obj copy];
        }else{
            NSLog(@"%@",[obj class]);
        }
        [arrRetain addObject:obj];
    }
    return arrRetain;
}

@end
```

NSDictionary: 

```objectivec
#import <Foundation/Foundation.h>

@interface NSDictionary (DeepCopy)

-(NSDictionary *)mutableDeepCopy;

@end
```

```objectivec
#import "NSDictionary+DeepCopy.h"

@implementation NSDictionary (DeepCopy)

//NSDictionary的深拷贝
-(NSMutableDictionary *)mutableDeepCopy{
    NSMutableDictionary *dictRetain = [NSMutableDictionary dictionaryWithCapacity:self.count];
    NSArray *allKeys = [self allKeys];
    
    for(id key in allKeys){
        id oneObj = [self objectForKey:key];
        id oneCopy = nil;
        if(!oneObj){
            continue;
        }
        if([oneObj respondsToSelector:@selector(mutableDeepCopy)]){
            oneCopy = [oneObj mutableDeepCopy];
        }else if ([oneObj respondsToSelector:@selector(mutableCopy)]){
            oneCopy = [oneObj mutableCopy];
        }else if ([oneObj conformsToProtocol:@protocol(NSCopying)]){
            oneCopy = [oneObj copy];
        }else{
            NSLog(@"ClassName = %@",[oneObj class]);
            continue;
        }
        [dictRetain setObject:oneCopy forKey:key];
    }
    return dictRetain;
}

@end
```

```objectivec
#import <Foundation/Foundation.h>
#import "NSArray+DeepCopy.h"
#import "NSDictionary+DeepCopy.h"


#define RELEASE(obj) if(obj){NSLog(@"obj = %@",obj);[obj release];obj = nil;}

int main(int argc, const char * argv[])
{
    
        //1.内存的创建和释放
        NSString *testObject = [[NSString alloc]initWithString:@"hello"];
        
        RELEASE(testObject);//自定义宏，释放内存。
        
        if(testObject){
            NSLog(@"testObject = %@",testObject);
            [testObject release];
            testObject = nil;
        }
        
        
        
        //2.copy和retain
        //NSString遵循享元模式，所以地址一样。
        NSString *strOrigin = @"hello";//0x0000000100001090
        NSString *strA = [strOrigin copy];//0x0000000100001090
        NSString *strB = [strOrigin retain];//0x0000000100001090
        NSLog(@"%@",strA);
        NSLog(@"%@",strB);
        
        [strB release];
        [strA release];
        [strOrigin release];
        
        //
        NSMutableString *mm = [NSMutableString stringWithString:@"mutable String"];//0x0000000100103500
        NSMutableString *m1 = [mm retain];//0x0000000100103500 retain只是引用计数加1
        NSMutableString *m2 = [mm copy];//0x0000000100300670  copy是新的地址
        NSLog(@"%@",mm);
        NSLog(@"%@",m1);
        NSLog(@"%@",m2);
        
        //释放的顺序必须为m2,m1,mm
        [m2 release];
        [m1 release];
        [mm release];
        
        //3.深拷贝和浅拷贝
        //假设一个NSArray中有三个NSString元素，当例用copy的时候，新的数组的指针确实是全新的，里面的三个元素也都还在，
        //但其实，数组只是拷贝了原数组里面的指针
        //没有对里面的元素进行拷贝。数组里的三个NString仍然指向原来的地址，这就是“浅拷贝”。
        
        NSArray *arr = @[@"1",@"2",@"3"];
        NSMutableArray *copyArr = [arr mutableDeepCopy];
        NSLog(@"%@",arr);
        NSLog(@"%@",copyArr);
        
        [copyArr release];
        [arr release];
        
        
        NSDictionary *dict = [NSDictionary dictionaryWithObject:@"value1" forKey:@"key1"];
        NSDictionary *copyDict = [dict mutableDeepCopy];
        NSLog(@"%@",dict);
        NSLog(@"%@",copyDict);
        
        [copyDict release];
        [dict release];
    
        return 0;
}
```
