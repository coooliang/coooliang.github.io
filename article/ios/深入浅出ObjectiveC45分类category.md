# 4.5分类（category）

`原创` `2014-01-25 15:46:36`

category可以理解为类的扩展

在 http://blog.csdn.net/coooliang/article/details/18768317 中我们使用了如下代码来判断对象是否可以受到攻击，如果对NSObject类进行扩展的话就不需要进行此判断。

```objectivec
//攻击对象判定  
    if([(NSObject *)hitTarget respondsToSelector:@selector(receiveAttack:)]){//为NSObject添加Category后，无需此if判断
        [hitTarget performSelector:@selector(receiveAttack:) withObject:[NSNumber numberWithInt:[self attackValue]]];  
    }  
```

扩展如下：

文件名：NSObject+Enemy.h

```objectivec
#import <Foundation/Foundation.h>

@interface NSObject (Enemy)

-(void)receiveAttack:(int)attackValue;

@end
```

文件名：NSObject+Enemy.m 

```objectivec
#import "NSObject+Enemy.h"

@implementation NSObject (Enemy)

-(void)receiveAttack:(int)attackValue{
    if(attackValue > 100){
        NSLog(@"dead...");
    }else{
        NSLog(@"defind successfully...");
    }
}

@end
```
