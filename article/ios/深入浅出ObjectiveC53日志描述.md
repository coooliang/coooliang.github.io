# 5.3日志描述

`原创` `2014-01-29 15:13:54`

1.使用NSLog的打印结果更详细

2.NSLog原理详解

3.对象description重写



```
#import <Foundation/Foundation.h>
#import "asl.h"
#import "Person.h"

#define PR(...) printf(__VA_ARGS__)
#define PSQR(x) printf(" the square of " #x " is %d.\n",(x)*(x))

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        NSLog(@"----1.普通格式打印----");//Hello, World! 直接打印字符串
        
        //%@  %%  %d  %u  %f,%.2f  %e,%E  %C  %p  %x,%X
        NSLog(@"hello %@",@"world");//hello world
        NSLog(@"%%");//% %字符串
        NSLog(@"%d",-123);//-123 有符号整型（4字节）
        NSLog(@"%u",-1);//4294967295 无符号整型（4字节）
        NSLog(@"%f %.2f",0.123,0.123);//0.123000 0.12 浮点数（8字节）
        NSLog(@"%e %E",123456789.321,123456789.321);//1.234568e+08 1.234568E+08 使用科学计数法的浮点数（8字节）区别在于E是大写还是小写显示
        NSLog(@"%C",(unichar)'u');//Unicode字符（2字符）
        NSLog(@"%p",@"abc");//0x100001170 指针
        NSLog(@"%x %X",0x123abc,-0x123abc);//123abc FFEDC544 无符号十六进制数（4字节）区别在十六进制a~f是大写还是小写显示
        
        
        NSLog(@"----2.打印结果更详细----");
        //使NSLog的打印结果更详细
        //__FUNCTION__ 当前函数名称
        //__LINE__ 函数行数
        //__DATE__ 日期
        //__TIME__ 时间
        NSLog(@"%s %d %s %s",__FUNCTION__,__LINE__,__DATE__,__TIME__);//我们也可以定义一个宏
        
        PR("hello ");
        PR(" weight = %d, shipping = %d",1,2);
        
        PSQR(6);
        
        
        
        //打开终端，进入目录: cd /var/log
        //查看文件：cat system.log
        NSLog(@"----3.ASL (apple system log facility)----");
        NSString *strTest = @"testLog";
        aslclient client = asl_open(NULL, "com.apple.console", 0);
        asl_log(client, NULL, ASL_LEVEL_WARNING, "%s",[strTest UTF8String]);
        
        asl_close(client);
        
        
        NSLog(@"----4.重写对象description方法----");
        Person *p = [[Person alloc]init];
        p.name = @"coooliang";
        NSLog(@"%@",p);
    }
    return 0;
}
```


```
#import <Foundation/Foundation.h>

@interface Person : NSObject{
    NSString *_name;
}

@property (retain,nonatomic) NSString *name;

@end
```



```
#import "Person.h"

@implementation Person

-(NSString *)description{
    NSMutableString *strPrint = [NSMutableString stringWithCapacity:0];
    [strPrint appendFormat:@"class name= %@",[self class]];
    [strPrint appendFormat:@" name = %@",[self name]];
    return strPrint;
}

@end
```



扩展（printf的使用）：

http://blog.csdn.net/coooliang/article/details/18889229 

 

