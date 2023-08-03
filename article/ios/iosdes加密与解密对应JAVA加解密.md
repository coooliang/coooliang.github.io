# ios des加密与解密（对应JAVA加解密）

`转载` `2015-12-28 15:21:25`

文章转载自互联网：http://www.cnblogs.com/xiaobaizhu/p/3453055.html

以下代码有添加用到hexString的转换过程

```objectivec
//
//  NSString+DES.h
//  TestDES
//
//  Created by coooliang on 15/12/25.
//  Copyright © 2015年 coooliang. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (DES)

+(NSString *)des:(NSString *)str key:(NSString *)key;

+(NSString *)decryptDes:(NSString*)str key:(NSString*)key;

@end
```

```objectivec
//
//  NSString+DES.m
//  TestDES
//
//  Created by coooliang on 15/12/25.
//  Copyright © 2015年 coooliang. All rights reserved.
//

#import "NSString+DES.h"
#import "GTMBase64.h"
#import <CommonCrypto/CommonCryptor.h>
#import "NSData+DataToHexString.h"

@implementation NSString (DES)

+(NSString *)des:(NSString *)str key:(NSString *)key{
    NSString *ciphertext = nil;
    
    NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
    
    char keyPtr[kCCKeySizeAES256+1];
    bzero(keyPtr, sizeof(keyPtr));
    [key getCString:keyPtr maxLength:sizeof(keyPtr) encoding:NSUTF8StringEncoding];
    
    NSUInteger dataLength = [data length];
    
    size_t bufferSize = dataLength + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);
    
    size_t numBytesEncrypted = 0;
    
    CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt, kCCAlgorithmDES,
                                              kCCOptionPKCS7Padding|kCCOptionECBMode,
                                              keyPtr, kCCBlockSizeDES,
                                              NULL,
                                              [data bytes], dataLength,
                                              buffer, bufferSize,
                                              &numBytesEncrypted);
    
                                          
    if (cryptStatus == kCCSuccess) {
        NSData *data = [NSData dataWithBytes:buffer length:(NSUInteger)numBytesEncrypted];
        NSLog(@"data = %@",data);
        ciphertext = [data dataToHexString];
        NSLog(@"ciphertext = %@",ciphertext);
    }
    return ciphertext;
}


//解密
+(NSString *)decryptDes:(NSString*)hexString key:(NSString*)key{
    NSData *data = [self hexStringToData:hexString];
    
    char keyPtr[kCCKeySizeAES256+1];
    bzero(keyPtr, sizeof(keyPtr));
    [key getCString:keyPtr maxLength:sizeof(keyPtr) encoding:NSUTF8StringEncoding];
    
    NSUInteger dataLength = [data length];
    
    size_t bufferSize = dataLength + kCCBlockSizeAES128;
    void *buffer = malloc(bufferSize);
    
    size_t numBytesEncrypted = 0;
    
    CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt, kCCAlgorithmDES, kCCOptionPKCS7Padding|kCCOptionECBMode, keyPtr, kCCBlockSizeDES, NULL, [data bytes], dataLength, buffer, bufferSize, &numBytesEncrypted);
    if(cryptStatus == kCCSuccess){
        NSString *string = [[NSString alloc]initWithData:[NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted] encoding:NSUTF8StringEncoding];
        NSLog(@"string = %@",string);
        return string;
    }
    free(buffer);
    return nil;
}

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

@end

```

```java
/**
	 * DES加密，输入内容将被UTF-8编码后进行加密，密钥长度不要大于8位
	 * 
	 * @param key 密钥
	 * @param content 明文
	 * @return 密文
	 */
	public static String encryptByDES(String key, String content) {
		if ((key == null) || (content == null))
			return null;

		// 生成密钥，密钥长度限定为8位，如果超出8位取前8位
		byte[] tmpBytes;
		try {
			tmpBytes = key.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("不支持的字符集。", e);
			return null;
		}
		byte[] keyBytes = new byte[8];
		for (int i = 0; i < tmpBytes.length && i < keyBytes.length; i++) {
			keyBytes[i] = tmpBytes[i];
		}
		// DES加密成为密文
		try {
			Key k = new SecretKeySpec(keyBytes, "DES");
			Cipher cipher = Cipher.getInstance("DES");
			cipher.init(Cipher.ENCRYPT_MODE, k);
			byte[] output = cipher.doFinal(content.getBytes("UTF-8"));
			return ConvertUtil.bytesToHexString(output);
		} catch (Exception e) {
			log.error("DES加密失败。", e);
		}
		return null;
	}

	/**
	 * DES解密，输入内容是密文，密钥长度不要大于8位
	 * 
	 * @param key 密钥
	 * @param cipherText 密文
	 * @return 明文
	 */
	public static String decryptByDES(String key, String cipherText) {
		if ((key == null) || (cipherText == null))
			return null;

		// 生成密钥，密钥长度限定为8位，如果超出8位取前8位
		byte[] tmpBytes;
		try {
			tmpBytes = key.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("不支持的字符集。", e);
			return null;
		}
		byte[] keyBytes = new byte[8];
		for (int i = 0; i < tmpBytes.length && i < keyBytes.length; i++) {
			keyBytes[i] = tmpBytes[i];
		}
		// DES解密成为明文
		try {
			Key k = new SecretKeySpec(keyBytes, "DES");
			Cipher cipher = Cipher.getInstance("DES");
			cipher.init(Cipher.DECRYPT_MODE, k);
			byte[] output = cipher.doFinal(ConvertUtil.hexStringToBytes(cipherText));
			return new String(output, "UTF-8");
		} catch (Exception e) {
			log.error("DES解密失败。", e);
		}
		return null;
	}
```



```java
public class ConvertUtil {
	
	public static String bytesToHexString(byte[] src){
		StringBuilder stringBuilder = new StringBuilder("");  
        if (src == null || src.length <= 0) {  
            return null;  
        }  
        for (int i = 0; i < src.length; i++) {  
            int v = src[i] & 0xFF;  
            String hv = Integer.toHexString(v);  
            if (hv.length() < 2) {  
                stringBuilder.append(0);  
            }  
            stringBuilder.append(hv);  
        }  
        return stringBuilder.toString();
	}
	
	public static byte[] hexStringToBytes(String hexString) {  
        if (hexString == null || hexString.equals("")) {  
            return null;  
        }  
        hexString = hexString.toUpperCase();  
        int length = hexString.length() / 2;  
        char[] hexChars = hexString.toCharArray();  
        byte[] d = new byte[length];  
        for (int i = 0; i < length; i++) {  
            int pos = i * 2;  
            d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));  
        }  
        return d;  
    }
	
	public static String stringToHexString(String str) {
        return bytesToHexString(str.getBytes());
    }
	
	public static String hexStringtoString(String hexString) {
        return new String(hexStringToBytes(hexString));
    }
	
	private static byte charToByte(char c) {  
        return (byte) "0123456789ABCDEF".indexOf(c);  
    }
}
```
