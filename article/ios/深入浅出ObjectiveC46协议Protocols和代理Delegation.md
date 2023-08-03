# 4.6协议（Protocols）和代理（Delegation）

`原创` `2014-01-25 16:42:09`

1.为MoXieSword类添加协议，这里的协议可以理解为JAVA中的接口（interface）

```objectivec
#import "Sword.h"

@protocol MoXieUser;//添加协议
@interface MoXieSword : Sword{//继承
    id<MoXieUser> _delegate;//代理对象的变量
}
@property (nonatomic, assign) id<MoXieUser> delegate;

-(id)initWithProducerName:(NSString *)aProducerName produceAbility:(int)abilityValue;

-(void)love:(id)loveTarget;
-(void)attackPower:(id)hitTarget;

@end

//创建协议
@protocol MoXieUser <NSObject>

//必须
@required
-(void)wanJianGuiZongL:(MoXieSword *)aSword;
-(void)yiJinJing:(MoXieSword *)aSword;
-(void)love;

@optional
-(void)spaceStep:(MoXieSword *)aSword;

@end
```

```objectivec
#import "MoXieSword.h"

@implementation MoXieSword

-(id)initWithProducerName:(NSString *)aProducerName produceAbility:(int)abilityValue{
    return [self initWithName:@"莫邪" produceName:aProducerName producerAbility:abilityValue];
}

//重写override
-(id)initWithName:(NSString *)aWeaponName produceName:(NSString *)aProducerName producerAbility:(int)abilityValue{
    self = [super initWithName:aWeaponName produceName:aProducerName producerAbility:abilityValue];
    
    if(self){
        if(![_strName isEqualToString:@"莫邪"]){
            _strName = [[NSString alloc]initWithString:@"莫邪"];
        }
        _fLong = 1.2f;
        _fWeight = 20.0f;
    }
    return self;
}

//super initWithName 的时候会调用此重写的方法
-(void)initSwordAttr{
    NSLog(@"MoXieSword initSwordAttr...");
    _colorBody = [[NSColor darkGrayColor]retain];
    _materialBody = [[NSString alloc] initWithString:@"陨石"];
    
    //没有剑鞘
    _colorSheath = nil;
    _materialSheath = nil;
    
    _colorHandle = [[NSColor whiteColor]retain];
    _materialHandle = [[NSString alloc]initWithString:@"千年神木"];
}

-(void)attack:(id)hitTarget{
    if(!hitTarget){
        return;
    }
//    if([hitTarget respondsToSelector:@selector(receiveAttack:)]){//这里会执行一次。
//        [hitTarget performSelector:@selector(receiveAttack:) withObject:[NSNumber numberWithInt:[self attackValue] * 10]];
//    }
    //因为定义了NSObject+Enemy.h所有不需要再判断了
    [hitTarget performSelector:@selector(receiveAttack:) withObject:[NSNumber numberWithInt:[self attackValue] * 10]];
    
}

-(int)attackValue{
    switch (_quality) {
        case kExcellQuality:
            return 100000;
            break;
        default:
            return 700;
            break;
    }
}

//根据代理进行的修改
-(void)love:(id)loveTarget{
    if(_delegate){
        [_delegate love];
    }
}

-(void)attackPower:(id)hitTarget{
    if(_delegate){
        [_delegate wanJianGuiZongL:self];
        [_delegate yiJinJing:self];
        if([_delegate respondsToSelector:@selector(spaceStep:)]){
            [_delegate performSelector:@selector(spaceStep:) withObject:self];
            //[_delegate spaceStep:self];
        }
    }
}
@end
```

2.创建实现MoXieUser协议的一个类SwordMaster 

```objectivec
#import "Sword.h"
#import "MoXieSword.h"

@interface SwordMaster : NSObject<MoXieUser>{
    MoXieSword *_moXie;
}

-(MoXieSword *)takeSword;

@end
```

```objectivec
#import "SwordMaster.h"

@implementation SwordMaster

-(MoXieSword *)takeSword{
    if(!_moXie){
        _moXie = [[MoXieSword alloc]initWithProducerName:@"coooliang" produceAbility:100];
        _moXie.delegate = self;
    }
    return _moXie;
}

//必须实现的方法
-(void)wanJianGuiZongL:(MoXieSword *)aSword{
    NSLog(@"万剑归宗");
}
-(void)yiJinJing:(MoXieSword *)aSword{
    NSLog(@"易筋经");
}
-(void)love{
    NSLog(@"I love you!");
}

//可不实现接口协议中的此方法
//-(void)spaceStep:(MoXieSword *)aSword;

 @end
```

```objectivec
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Weapon.h"
#import "Sword.h"
#import "MoXieSword.h"
#import "SwordMaster.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        SwordMaster *master = [[SwordMaster alloc]init];
        MoXieSword *moxie = [master takeSword];
        
        [moxie attackPower:nil];
        [moxie love:nil];
        
    }
    return 0;
}
//输出结果：
2014-01-25 16:40:25.559 test[2410:303] MoXieSword initSwordAttr...
2014-01-25 16:40:25.560 test[2410:303] 万剑归宗
2014-01-25 16:40:25.561 test[2410:303] 易筋经
2014-01-25 16:40:25.561 test[2410:303] I love you!
```