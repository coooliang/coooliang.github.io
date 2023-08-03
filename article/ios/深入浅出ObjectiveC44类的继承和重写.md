# 4.4类的继承和重写

`原创` `2014-01-25 15:27:26`

```objectivec
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

-(void)receiveAttack:(int)who{
    NSLog(@"weapon receiveAttack...%d",who);
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

//下方两个类继承Weapon类 

```objectivec
#import "Weapon.h"
#import <AppKit/AppKit.h>

//继承
@interface Sword : Weapon{
    
    //子类新增的属性
    NSColor *_colorBody;//剑身颜色
    NSString *_materialBody;//剑身材质
    
    NSColor *_colorSheath;//剑鞘颜色
    NSString *_materialSheath;//剑鞘材质
    
    NSColor *_colorHandle;//剑柄颜色
    NSString *_materialHandle;//剑柄材质
    
}

-(void)initSwordAttr;

@end
```

```objectivec
#import "Sword.h"

@implementation Sword

//重写override
-(id)initWithName:(NSString *)aWeaponName produceName:(NSString *)aProducerName producerAbility:(int)abilityValue{
    self = [super initWithName:aWeaponName produceName:aProducerName producerAbility:abilityValue];
    if(self){
        [self initSwordAttr];
    }
    return self;
}

//初始化方法
-(void)initSwordAttr{
    NSLog(@"Sword initSwordAttr...");
    _colorBody = [[NSColor lightGrayColor]retain];
    _materialBody = [[NSString alloc]initWithString:@"铁"];
    
    _colorSheath = [[NSColor brownColor]retain];
    _materialSheath = [[NSString alloc]initWithString:@"皮革"];
    
    _colorHandle = [[NSColor blackColor]retain];
    _materialHandle = [[NSString alloc]initWithString:@"木头"];
    
    _fLong = 1.2f;
    _fWeight = 20.0f;
}

-(int)attackValue{
    switch (_quality) {
        case kNormalQuality:
            return 500;
            break;
        case kGoodQuality:
            return 700;
            break;
        case kExcellQuality:
            return 1100;
            break;
        default:
            return 20;
    }
}
```

```objectivec
#import "Sword.h"

//继承
@interface MoXieSword : Sword

-(id)initWithProducerName:(NSString *)aProducerName produceAbility:(int)abilityValue;

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
    if([hitTarget respondsToSelector:@selector(receiveAttack:)]){
        [hitTarget performSelector:@selector(receiveAttack:) withObject:[NSNumber numberWithInt:[self attackValue] * 10]];
    }
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

@end
```

```objectivec
#import <Foundation/Foundation.h>
#import "Person.h"
#import "Weapon.h"
#import "Sword.h"
#import "MoXieSword.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        Weapon *weapon = [[[Weapon alloc]initWithName:@"剑" produceName:@"coooliang" producerAbility:100]autorelease];
        
        MoXieSword *moxie = [[MoXieSword alloc]initWithProducerName:@"coooliang" produceAbility:100];
		[moxie attack:weapon];
        
    }
    return 0;
}
```
