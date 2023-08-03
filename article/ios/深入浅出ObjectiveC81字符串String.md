# 8.1字符串String

`原创` `2014-01-31 20:41:49`

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        //1.NSString常用方法（格式化，拼接，转byte,转char）
        //initWithString,initWithFormat,stringWithString
        //initWithBytes,cStringUsingEncoding,stringByAppendingString
        NSString *aString = @"aString";
        NSString *bString = [[NSString alloc]initWithString:@"bString"];
        NSString *cString = [NSString stringWithString:@"cString"];
        NSString *dString = [[NSString alloc]initWithFormat:@"format is %@",@"dString"];
        char cTest[100] = "initWithBytes hello world\0";
        NSString *eString = [[NSString alloc]initWithBytes:cTest length:100 encoding:NSUTF8StringEncoding];
        
        const char *cTestAgain1 = [eString UTF8String];
        const char *cTestAgain2 = [eString cStringUsingEncoding:NSUTF8StringEncoding];
        
        NSLog(@"%@",aString);
        NSLog(@"%@",bString);
        NSLog(@"%@",cString);
        NSLog(@"%@",dString);
        NSLog(@"%@",eString);
        
        NSLog(@"eTestAgain1 %s",cTestAgain1);
        NSLog(@"eTestAgain2 %s",cTestAgain2);
        
        
        NSString *gString = @"";
        gString = [gString stringByAppendingString:@"Hello "];
        gString = [gString stringByAppendingString:@"World"];
        NSLog(@"gString = %@",gString);
        
        NSString *hString = @"2013/10/01";
        NSLog(@"[%@]",[hString componentsSeparatedByString:@"/"]);//split
        
        NSString *iString = @"subStringTest";
        NSLog(@"%@",[iString substringFromIndex:3]);//StringTest
        NSLog(@"%@",[iString substringToIndex:3]);//sub
        NSLog(@"%@",[iString substringWithRange:NSMakeRange(0, 3)]);//sub
        
        //2.字符串比较大小
        NSComparisonResult compareResult = [hString compare:iString];
        NSLog(@"%d",compareResult == NSOrderedSame);//0
        
        NSRange range = [iString rangeOfString:@"test" options:NSCaseInsensitiveSearch];//不区分大小写查找
        NSLog(@"%lu",range.length);//4
        
        //3.替换：需要更换的字符串，替换成什么，是否区分大小写，查找范围（一般为整个字符串）
        NSString *jString = [iString stringByReplacingOccurrencesOfString:@"Test" withString:@"rep" options:NSCaseInsensitiveSearch range:NSMakeRange(0, [iString length])];
        NSLog(@"jString = %@",jString);//subStringrep
        
        //4.大小写,注意这里的内存管理
        NSString *kString = @"helloWorld";
        NSLog(@"大写%@",[kString uppercaseString]);//HELLOWORLD
        NSLog(@"小写%@",[kString lowercaseString]);//helloworld
        NSLog(@"首字母大写%@",[kString capitalizedString]);//Helloworld
        
        //5.数值转换
        NSString *lString = @"3.141592653";
        NSLog(@"%f",[lString floatValue]);//3.141593
        NSLog(@"%.2f",[lString doubleValue]);//3.14
        NSLog(@"%d",[lString intValue]);//3
        NSString * mString = [NSString stringWithFormat:@"%.3f",3.141592653];
        NSLog(@"%@",mString);//3.143
        
        
        //6.可变字符串转换
        NSMutableString *maString = [NSMutableString stringWithCapacity:0];
        NSMutableString *mbString = [[NSMutableString alloc]initWithCapacity:0];
        
        //与NSString不同的是，改变直接体现在自身上。
        [maString appendString:@"Hello"];
        NSLog(@"NSMutableString maString = %@",maString);
        
        [maString deleteCharactersInRange:NSMakeRange(0,1)];
        NSLog(@"%@",maString);//ello
        
        [maString insertString:@" World" atIndex:4];
        NSLog(@"%@",maString);
        
        //7.字符串中路径的相关使用
        NSString *pathString = @"/Users/chenliang/Documents/feige.app";
        pathString = [pathString lastPathComponent];//文件名
        NSLog(@"%@",pathString);
        pathString = [pathString pathExtension];//文件类型
        NSLog(@"%@",pathString);
        pathString = [[pathString pathComponents]objectAtIndex:0];
        NSLog(@"%@",pathString);
        //苹果中，在用户目录下可以使用~代替用户路径
        NSString *ppString = @"~/Documents/test.txt";
        ppString = [ppString stringByExpandingTildeInPath];
        NSLog(@"%@",ppString);//展开 /Users/chenliang/Documents/test.txt
        
        ppString = [ppString stringByAbbreviatingWithTildeInPath];//与stringByExpandingTildeInPath相反
        NSLog(@"%@",ppString);//缩写 ~/Documents/feige.app
        
        //8.将字符串写入文本中
        NSString *fileString = @"将字符串写入文本中";
        NSError *error = nil;
        
        //atomically表示让系统在写test.txt文件时不要直接写到目标路径去，而是开一个临时的文件用于保存。
        //名字取成和test.txt不同，待临时文件保存完成后再替换原有的文件，这样在保存的时候出错不会破坏原来的文件。
        [fileString writeToFile:@"/Users/chenliang/Documents/test.txt" atomically:YES encoding:NSUTF8StringEncoding error:&error];
        NSLog(@"%@",error);
        
    }
    return 0;
}
```
