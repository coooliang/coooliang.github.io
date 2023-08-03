# 关键字之 #define const static extern

`原创` `2018-10-16 10:37:31`

关键字解析说明#define宏宏与常量不同的是，可以是对象或方法const常量不可变static静态的每个对象的静态数据都一样extern外部的查找外部所有同名的变量static const静态常量静态常量,注意const位置

宏的定义

```objectivec
#define TIME 0.1
#define URL @"https://github.com"
#define COLOR ([UIColor colorWithRed:1.000 green:0.659 blue:0 alpha:1])
```

常量的正确写法

```objectivec
const NSString *const1 = @"const1";//可修改
NSString *const const2 = @"const2";//不可修改，正确使用
NSString const *const3 = @"const3";//可修改
    
const1 = @"1";
const2 = @"2";//编译时就错误了
const3 = @"3";

NSLog(@"const1: %@",const1);//1
NSLog(@"const2: %@",const2);//const2
NSLog(@"const3: %@",const3);//3
```


静态变量

```objectivec
//当创建对象时，每个对象中的constString都是相同的
static NSString *constString = @"123456";
```


静态常量

```objectivec
//使用静态常量取代#define，静态常量只有一份且不可变
//效率高于#define，优先使用
static NSString *const constString = @"123456";
```


外部的

```objectivec
//会查找其它文件定义的名为externString的成员变量
extern NSString *externString;
NSLog(@"%@", externString);//这时候是有值的,会是其它类中同名的全局变量的值
```


