# 8.4数据(NSData)和8.5数字(NSNumber)

`原创` `2014-02-03 18:22:59`

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        NSString *aPath = @"/Users/chenliang/DeskTop/desktop.ini";
        NSData * aData = [NSData dataWithContentsOfFile:aPath];
        void *pTest = malloc(100);
        NSData *bData = [NSData dataWithBytes:pTest length:100];
        NSData *cData = [@"hello" dataUsingEncoding:NSUTF8StringEncoding];
        
        //NSNumber
        NSNumber *aIntNumber = [NSNumber numberWithInt:10];
        NSNumber *bFloatNumber = [NSNumber numberWithFloat:10.12f];
        NSNumber *cBoolNumber = [NSNumber numberWithBool:YES];
        NSNumber *dCharNumber = [NSNumber numberWithChar:'a'];
        NSLog(@"%@ %@ %@ %@",aIntNumber,bFloatNumber,cBoolNumber,dCharNumber);//10 10.12 1 97
        
        int aInt = [aIntNumber intValue];
        float bFloat = [bFloatNumber floatValue];
        BOOL cBool = [cBoolNumber boolValue];
        char dChar = [dCharNumber charValue];
        char *aString = malloc(1);
        *aString = dChar;
        NSLog(@"%d %.2f %d %s",aInt,bFloat,cBool,aString);//10 10.12 1 a
        free(aString);
        
        //简单的运算NSNumber的子类NSDecimalNumber
        //9后11个零
        NSDecimalNumber *aNumber = [NSDecimalNumber decimalNumberWithString:@"9e11"];
        NSDecimalNumber *bNumber = [NSDecimalNumber decimalNumberWithMantissa:9 exponent:11 isNegative:NO];
        NSLog(@"aNumber = %@",aNumber);
        NSLog(@"bNumber = %@",bNumber);
        NSLog(@"%@",[aNumber decimalNumberByAdding:bNumber]);//相加
        //以NSNumber的方式来初始化NSDecimalNumber对象
        aNumber = (NSDecimalNumber *)[NSDecimalNumber numberWithFloat:1280.21];
        bNumber = (NSDecimalNumber *)[NSDecimalNumber numberWithInt:128];
        NSLog(@"aNumber = %@",aNumber);
        NSLog(@"bNumber = %@",bNumber);
        NSLog(@"%@",[aNumber decimalNumberBySubtracting:bNumber]);//相减
        
        //数字格式
        NSNumberFormatter *format = [[NSNumberFormatter alloc]init];
        NSNumber *numberTest = [NSNumber numberWithDouble:11122223333444.321321];
        [format setNumberStyle:NSNumberFormatterDecimalStyle];
        NSLog(@"NSNumberFormatterDecimalStyle = %@",[format stringFromNumber:numberTest]);//11,122,223,333,444.3
        
        [format setNumberStyle:NSNumberFormatterNoStyle];//无格式
        NSLog(@"NSNumberFormatterNoStyle = %@",[format stringFromNumber:numberTest]);//11122223333444
        
        [format setNumberStyle:NSNumberFormatterCurrencyStyle];//货币
        NSLog(@"NSNumberFormatterCurrencyStyle = %@",[format stringFromNumber:numberTest]);//￥11,122,223,333,444.30
        
        [format setRoundingMode:NSNumberFormatterRoundDown];
        [format setPositiveFormat:@"#,##0.###"];//#表示预设值，当数字没有此位时则舍去不补位，0表示位数，当数字没有此位时会以0去补位
        NSNumber *n = [NSNumber numberWithFloat:123456.3211f];
        NSLog(@"setPositiveFormat = %@",[format stringFromNumber:n]);//123,456.32
        
        [format setPositiveFormat:@"0.##"];
        NSLog(@"setPositiveFormat = %@",[format stringFromNumber:n]);//123456.32
        
        [format setPositiveFormat:@"0.####"];
        NSLog(@"setPositiveFormat = %@",[format stringFromNumber:n]);//123456.3203
        
        [format setPositiveFormat:@"0.00"];
        NSLog(@"setPositiveFormat = %@",[format stringFromNumber:n]);//123456.32
        
        [format setPositiveFormat:@"0.0000"];
        NSLog(@"setPositiveFormat = %@",[format stringFromNumber:n]);//123456.3203
        
        
        //NSNumberFormatterPercentStyle 百分号
        //NSNumberFormatterScientificStyle 科学技术法
        //NSNumberFormatterSpellOutStyle 拼写
        //NSNumberFormatterDecimalStyle 十进制
        
    }
    return 0;
}
```
