# 4.3类的创建

`原创` `2014-01-21 22:39:21`

例子来自于钱成的《深入浅出Objective-C》，我手抄里面的代码，正在学习中。

```objectivec
/*!
 @file Werpon.h
 @brief 武器类的头文件
 @author Copyright (c) chenliang 2014

 @date 2014-1-21
 */
#import <Foundation/Foundation.h>

//四个宏定义武器的默认值
#define DEFAULT_WEAPON_NAME @""
#define DEFAULT_WEAPON_PRODUCER @""
#define DEFAULT_WEAPON_LONG 1.0 //1米
#define DEFAULT_WEAPON_WEIGHT 10.0 //10斤

//枚举类型定义武器的所有可能品质
typedef enum WeaponQuality{
    kPoorQuality = 1,//品质差
    kNormalQuality,//品质一般
    kGoodQuality,//品质好
    kExcellQuality,//极品
}WeaponQuality;

//类的声明中有简单类型的int，有指针类型的NSString *
//在Object-c中类成员量声明中，默认都是使用protected来修饰亦是，即变量对于子类是可以看到且使用的
//如果你想把成员量变成public或者private，只需在需要变更类型的亦是前增加个 @public 或 @private
@interface Weapon : NSObject{
    //武器名字
    NSString *_strName;
    //武器制作人
    NSString *_strProducer;
    //武器制作时间
    NSDate *_dateBirth;
    //武器品质
    WeaponQuality _quality;
    //武器长度
    float _fLong;
    //武器重量
    float _fWeight;
}
//打造武器
-(id)initWithName:(NSString *)aWeaponName produceName:(NSString *)aProducerName producerAbility:(int)abilityValue;

//攻击
-(void)attack:(id)hitTarget;

//武器的攻击力
-(int)attackValue;

@end
```



```objectivec
#import "Weapon.h"

@implementation Weapon
-(id)initWithName:(NSString *)aWeaponName produceName:(NSString *)aProducerName producerAbility:(int)abilityValue{
    self = [super init];
    if(self){
        //武器名字赋值
        if(aWeaponName){
            _strName = [[NSString alloc]initWithString:aWeaponName];
        }else{
            _strName = [DEFAULT_WEAPON_NAME retain];
        }
        //武器制作人赋值
        if(aProducerName){
            _strProducer = [[NSString alloc]initWithString:aProducerName];
        }else{
            _strName = [DEFAULT_WEAPON_PRODUCER retain];
        }
        
        //当前时间
        _dateBirth = [[NSDate date] retain];

        //根据制作人的实力决定武器的品质
        if(abilityValue <= 10){
            _quality = kPoorQuality;
        }else if (abilityValue <= 50){
            _quality = kNormalQuality;
        }else if (abilityValue <= 80){
            _quality = kGoodQuality;
        }else{
            _quality = kExcellQuality;
        }
        
        //默认武器属性
        _fLong = DEFAULT_WEAPON_LONG;
        _fWeight = DEFAULT_WEAPON_WEIGHT;
    }
    return self;
}
-(void)dealloc{
    [_strName release];
    [_strProducer release];
    [_dateBirth release];
    [super dealloc];
}

-(void)attack:(id)hitTarget{
    NSLog(@"attack...%@",hitTarget);
    //没有攻击对象
    if(!hitTarget){
        NSLog(@"not target...");
        return;
    }

    //攻击对象判定
    if([(NSObject *)hitTarget respondsToSelector:@selector(receiveAttack:)]){
        [hitTarget performSelector:@selector(receiveAttack:) withObject:[NSNumber numberWithInt:[self attackValue]]];
    }
}

-(void)receiveAttack:(NSString *)who{
    NSLog(@"receiveAttack...");
}

-(int)attackValue{
    //根据品质决定攻击力
    switch (_quality) {
        case kNormalQuality:
            return 50;
            break;
        case kGoodQuality:
            return 70;
            break;
        case kExcellQuality:
            return 110;
        default:
            return 20;
            break;
    }
}
@end
```

```objectivec
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Weapon.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Weapon *weapon = [[[Weapon alloc]initWithName:@"剑" produceName:@"coooliang" producerAbility:100]autorelease];
        [weapon attack:[[[Weapon alloc]init]autorelease]];
        NSLog(@"end...");
        
    }
    return 0;
}
```
