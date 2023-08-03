# NSObject的几个方法

`原创` `2013-11-11 23:58:42`

Person.h:

```
#import <Foundation/Foundation.h>

@interface Person : NSObject{
    @private
        NSString *ID;
    @protected
        NSString *name;
    @public
        int age;
    
}
@property NSString *ID;
@property NSString *name;
@property int age;
- (NSString*) say;
@end
```

Person.m: 

```
#import "Person.h"

@implementation Person
@synthesize ID;
@synthesize name;
@synthesize age;

- (NSString*) say{
    NSString *str = [[[NSString alloc] init] stringByAppendingFormat:@"id=%@,age=%d,name=%@",ID,age,name];
    return str;
}
@end
```

Man.h 

```
#import <Foundation/Foundation.h>
#import "Person.h"
@interface Man : Person
- (void) manSay;//男人说
 @end
```

Man.m: 

```
#import "Man.h"

@implementation Man
- (void) manSay{
    //NSLog(@"id=%@,age=%d,name=%@",ID,age,name);//id is private
    NSLog(@"manSay:age=%d,name=%@",age,name);
}
 @end
```

main: 

```
#import <Foundation/Foundation.h>
#import "Man.h"
int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        Person *person = [[Man alloc]init];
        
        person.name = @"chenliang";
        person.age = 18;
        person.ID = @"1";
        NSString *str = [person say];
        NSLog(str,nil);// 1.id=1,age=18,name=chenliang
        
        //[person manSay];// 2.这里是不可以访问的
        
        Man *man = [[Man alloc]init];
        [man manSay];// 3.manSay:age=0,name=(null)
        
        // 4.下面说一下NSObject类的一些方法
        BOOL iskindof = [person isKindOfClass:[Man class]];
        NSLog(@"person isKindOfClass :%@",iskindof?@"true":@"false");//true
        
        BOOL ismemberof = [person isMemberOfClass:[Man class]];
        NSLog(@"person isMemberOfClass :%@",ismemberof?@"true":@"false");//true
        
        BOOL isSubclassOfClass = [[man class] isSubclassOfClass:[person class]];
        NSLog(@"person isSubclassOfClass :%@",isSubclassOfClass?@"true":@"false");//true

        
        SEL sel = NSSelectorFromString(@"say");
        BOOL resolveClassMethod = [[person class] resolveClassMethod:sel];
        NSLog(@"person resolveClassMethod :%@",resolveClassMethod?@"true":@"false");//false
        
        [man performSelector:@selector(manSay)];//调用mancfqjrmanSay方法：manSay:age=0,name=(null)
        
    }
    return 0;
}
```
