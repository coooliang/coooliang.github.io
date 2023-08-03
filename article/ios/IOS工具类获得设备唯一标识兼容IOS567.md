# 【IOS工具类】获得设备唯一标识（兼容IOS5，6，7）

UIDevice+IdentifierAddition.h： 

```objectivec
#import <Foundation/Foundation.h>


@interface UIDevice (IdentifierAddition)

- (NSString *) uniqueDeviceIdentifier;

@end
```

UIDevice+IdentifierAddition.m 

```objectivec
#import "UIDevice+IdentifierAddition.h"
#import "NSString+MD5.h"
#import "EnvConstant.h"


#include <sys/socket.h>
#include <sys/sysctl.h>
#include <net/if.h>
#include <net/if_dl.h>

#define IS_IOS_7 ([[[UIDevice currentDevice] systemVersion] floatValue] >=7.0 ? YES : NO)

@interface UIDevice(Private)

- (NSString *) macaddress;

@end

@implementation UIDevice (IdentifierAddition)


#pragma mark - Private Methods
// Return the local MAC addy
// Courtesy of FreeBSD hackers email list
// Accidentally munged during previous update. Fixed thanks to erica sadun & mlamb.
- (NSString *) macaddress{
    
    int                 mib[6];
    size_t              len;
    char                *buf;
    unsigned char       *ptr;
    struct if_msghdr    *ifm;
    struct sockaddr_dl  *sdl;
    
    mib[0] = CTL_NET;
    mib[1] = AF_ROUTE;
    mib[2] = 0;
    mib[3] = AF_LINK;
    mib[4] = NET_RT_IFLIST;
    
    if ((mib[5] = if_nametoindex("en0")) == 0) {
        printf("Error: if_nametoindex error\n");
        return NULL;
    }
    
    if (sysctl(mib, 6, NULL, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 1\n");
        return NULL;
    }
    
    if ((buf = malloc(len)) == NULL) {
        printf("Could not allocate memory. error!\n");
        return NULL;
    }
    
    if (sysctl(mib, 6, buf, &len, NULL, 0) < 0) {
        printf("Error: sysctl, take 2");
        free(buf);
        return NULL;
    }
    
    ifm = (struct if_msghdr *)buf;
    sdl = (struct sockaddr_dl *)(ifm + 1);
    ptr = (unsigned char *)LLADDR(sdl);
    NSString *outstring = [NSString stringWithFormat:@"%02X:%02X:%02X:%02X:%02X:%02X", 
                           *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];
    free(buf);
    
    return outstring;
}

#pragma mark - uniqueDeviceIdentifier
- (NSString *) uniqueDeviceIdentifier{

    if(IS_IOS_7){
        NSString *identifierForVendor = [NSString stringWithFormat:@"%@",[[[UIDevice currentDevice]identifierForVendor]UUIDString]];
        NSLog(@"identifierForVendor=%@",identifierForVendor);
        NSString *stringToHash = [NSString stringWithFormat:@"%@%@",identifierForVendor,DEVICE_TOKEN_PASS];
        NSLog(@"stringToHash = %@",stringToHash);
        NSString *result = [NSString md5:stringToHash];
        NSLog(@"result = %@",result);
        return result;
    }else{
        NSString *macaddress = [[UIDevice currentDevice] macaddress];
        NSLog(@"macaddress = %@",macaddress);
        NSString *stringToHash = [NSString stringWithFormat:@"%@%@",macaddress,DEVICE_TOKEN_PASS];
        NSLog(@"stringToHash = %@",stringToHash);
        NSString *result = [NSString md5:stringToHash];
        NSLog(@"result = %@",result);
        return result;
    }
}

@end
```

NSString+MD5.h：

```objectivec
#import <Foundation/Foundation.h>

@interface NSString (MD5)

+(NSString *)md5:(NSString *)str;
@end
```

NSString+MD5.m： 

```objectivec
#import "NSString+MD5.h"
#import <CommonCrypto/CommonDigest.h> // Need to import for CC_MD5 access

@implementation NSString (MD5)

+(NSString *)md5:(NSString *)str{
    const char *cStr = [str UTF8String];
    unsigned char result[16];
    CC_MD5(cStr, strlen(cStr), result); // This is the md5 call
    return [NSString stringWithFormat:
            @"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]
            ]; 
}
@end
```

使用方法： 

```objectivec
[[UIDevice currentDevice]uniqueDeviceIdentifier];
```
