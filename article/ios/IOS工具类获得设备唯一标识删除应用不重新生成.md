# 获得设备唯一标识，删除应用不重新生成

`转载` `2015-04-29 14:42:37`

文章转载自：http://www.cnblogs.com/qingjoin/p/3549325.html （有做修改）

PS:因为使用keychain方式，所以删除应用不重新生成identifierForVendor

```objectivec
#define safeString(obj) (([obj isEqual:[NSNull null]]||obj==nil||[@"null"isEqual:obj]) ? @"" : ([NSString stringWithFormat:@"%@",obj]))
```

```objectivec
#import <Foundation/Foundation.h>

@interface UUIDUtil : NSObject


+(NSString *)getUUID;

@end
```

```objectivec
#import "UUIDUtil.h"


@implementation UUIDUtil

static UUIDUtil * instance = nil;


+(NSString *)getUUID{
    NSString * const KEY_USERNAME_PASSWORD = @"com.sb.giftcardapp.usernamepassword";//这里你需要修改为自己应用的id，才不会重复
    NSString * const KEY_PASSWORD = @"com.sb.giftcardapp.password";
    NSMutableDictionary *readUserPwd = (NSMutableDictionary *)[self load:KEY_USERNAME_PASSWORD];
    if(readUserPwd == nil || [@""isEqualToString:safeString([readUserPwd objectForKey:KEY_PASSWORD])]){
        NSString *identifierStr = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
        NSMutableDictionary *usernamepasswordKVPairs = [NSMutableDictionary dictionary];
        [usernamepasswordKVPairs setObject:identifierStr forKey:KEY_PASSWORD];
        //save
        [self save:KEY_USERNAME_PASSWORD data:usernamepasswordKVPairs];
        //read
        readUserPwd = (NSMutableDictionary *)[self load:KEY_USERNAME_PASSWORD];
    }
    NSString *uuidString = [readUserPwd objectForKey:KEY_PASSWORD];
    NSLog(@"uuidString = %@",uuidString);
    return uuidString;
}

+ (void)save:(NSString *)service data:(id)data{
    //Get search dictionary
    NSMutableDictionary *keychainQuery = [self getKeychainQuery:service];
    //Delete old item before add new item
    SecItemDelete((__bridge CFDictionaryRef)keychainQuery);
    //Add new object to search dictionary(Attention:the data format)
    [keychainQuery setObject:[NSKeyedArchiver archivedDataWithRootObject:data] forKey:(__bridge id)kSecValueData];
    //Add item to keychain with the search dictionary
    SecItemAdd((__bridge CFDictionaryRef)keychainQuery, NULL);
}

+ (NSMutableDictionary *)getKeychainQuery:(NSString *)service {
    return [NSMutableDictionary dictionaryWithObjectsAndKeys:
            (__bridge id)kSecClassGenericPassword,(__bridge id)kSecClass,
            service, (__bridge id)kSecAttrService,
            service, (__bridge id)kSecAttrAccount,
            (__bridge id)kSecAttrAccessibleAfterFirstUnlock,(__bridge id)kSecAttrAccessible,
            nil];
}

//取
+ (id)load:(NSString *)service {
    id ret = nil;
    NSMutableDictionary *keychainQuery = [self getKeychainQuery:service];
    //Configure the search setting
    //Since in our simple case we are expecting only a single attribute to be returned (the password) we can set the attribute kSecReturnData to kCFBooleanTrue
    [keychainQuery setObject:(__bridge id)kCFBooleanTrue forKey:(__bridge id)kSecReturnData];
    [keychainQuery setObject:(__bridge id)kSecMatchLimitOne forKey:(__bridge id)kSecMatchLimit];
    CFDataRef keyData = NULL;
    if (SecItemCopyMatching((__bridge CFDictionaryRef)keychainQuery, (CFTypeRef *)&keyData) == noErr) {
        @try {
            ret = [NSKeyedUnarchiver unarchiveObjectWithData:(__bridge NSData *)keyData];
        } @catch (NSException *e) {
            NSLog(@"Unarchive of %@ failed: %@", service, e);
        } @finally {
        }
    }
    if (keyData)
        CFRelease(keyData);
    return ret;
}


+ (void)delete:(NSString *)service {
    NSMutableDictionary *keychainQuery = [self getKeychainQuery:service];
    SecItemDelete((__bridge CFDictionaryRef)keychainQuery);
}

@end
```

使用方法 

```objectivec
#import "UUIDUtil.h"

#define UDID [UUIDUtil getUUID]
```

此类可以搭配我的另一个博文使用：http://blog.csdn.net/coooliang/article/details/39373649 
