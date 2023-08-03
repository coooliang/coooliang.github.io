# dataToHexString与hexStringToData

`原创` `2015-12-31 11:35:08`

```objectivec
//
//  NSData+DataToHexString.h
//  TestDES
//
//  Created by coooliang on 15/12/28.
//  Copyright © 2015年 coooliang. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSData (DataToHexString)

-(NSString *)dataToHexString;

@end
```

```objectivec
//
//  NSData+DataToHexString.m
//  TestDES
//
//  Created by coooliang on 15/12/28.
//  Copyright © 2015年 coooliang. All rights reserved.
//

#import "NSData+DataToHexString.h"

@implementation NSData (DataToHexString)

-(NSString *)dataToHexString{
    NSUInteger len = [self length];
    char *chars = (char *)[self bytes];
    NSMutableString *hexString = [[NSMutableString alloc]init];
    for (NSUInteger i=0; i<len; i++) {
        [hexString appendString:[NSString stringWithFormat:@"%0.2hhx",chars[i]]];
    }
    return hexString;
}

@end
```

hexString to NSData 

```objectivec
+(NSData *)hexStringToData:(NSString *)hexString{
    const char *chars = [hexString UTF8String];
    int i = 0;
    int len = (int)hexString.length;
    NSMutableData *data = [NSMutableData dataWithCapacity:len/2];
    char byteChars[3] = {'\0','\0','\0'};
    unsigned long wholeByte;
    
    while (i<len) {
        byteChars[0] = chars[i++];
        byteChars[1] = chars[i++];
        wholeByte = strtoul(byteChars, NULL, 16);
        [data appendBytes:&wholeByte length:1];
    }
    return data;
}
```