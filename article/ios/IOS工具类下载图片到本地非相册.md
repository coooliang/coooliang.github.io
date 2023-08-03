# 下载图片到本地(非相册)

`原创` `2015-01-30 11:45:38`

UIImageBankUtil.h:

```objectivec
#import <UIKit/UIKit.h>

@interface UIImageBankUtil : NSObject 

-(void)getBankImage:(NSString *)downurl bankView:(UIImageView *)biv;

@end
```

UIImageBankUtil.m 

```objectivec
#import "UIImageBankUtil.h"

@implementation UIImageBankUtil{
    NSMutableData *imageData;
    NSString *imageName;
    NSURLConnection *downCon;
    UIImageView *bankImageView;
}

-(void)getBankImage:(NSString *)downurl bankView:(UIImageView *)biv{
    NSLog(@"downurl=%@",downurl);
    imageData = [[NSMutableData alloc]init];
    NSArray *subStr = [downurl componentsSeparatedByString:@"/"];
    imageName = [[[subStr lastObject] componentsSeparatedByString:@"."] objectAtIndex:0];
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *path = [[[paths objectAtIndex:0] stringByAppendingPathComponent:@"dataCaches"] stringByAppendingPathComponent:imageName];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:path]) {
        NSData *image = [NSData dataWithContentsOfFile:path];
        biv.image = [UIImage imageWithData:image];
        return;
    }else {
        downCon = [[NSURLConnection alloc] initWithRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:downurl]] delegate:self];
        [downCon start];
    }
    bankImageView = biv;
}


-(BOOL)saveImage:(NSData*)image toFile:(NSString*)fileName
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *path = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"dataCaches"];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if (![fileManager fileExistsAtPath:path]){
        if (![fileManager createDirectoryAtPath:path withIntermediateDirectories:YES attributes:nil error:nil]) {
            return NO;
        }
    }
    return [fileManager createFileAtPath:[path stringByAppendingPathComponent:fileName]
                                contents:image
                              attributes:nil];
}
-(void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
    [imageData setLength:0];
}
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data{
    if (connection == downCon) {
        [imageData appendData:data];
    }
}
-(void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error{
    
}
-(void)connectionDidFinishLoading:(NSURLConnection *)connection{
    if ([UIImage imageWithData:imageData]!=NULL) {
        [self saveImage:imageData toFile:imageName];
        bankImageView.image = [UIImage imageWithData:imageData];
    }
}
```

使用方式：传入url和需要设置的ImageView 

```objectivec
if(bankImageView != nil){
        UIImageBankUtil *util = [[UIImageBankUtil alloc]init];
        [util getBankImage:[NSString stringWithFormat:bank_logo_image_url,[InfoCtxUtil getCtx],shortPng] bankView:bankImageView];
    }
```






 

 

 

 

 

 

