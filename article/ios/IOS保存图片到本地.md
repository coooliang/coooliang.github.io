# IOS保存图片到本地

`转载` `2014-07-04 11:41:10`

转载自：http://blog.csdn.net/hengshujiyi/article/details/22879495

```objectivec
NSString *data = [arguments  objectAtIndex0];
UIImage *image = [UIImage imageWithData:[GTMBase64 decodeString:data]];
//    UIImageWriteToSavedPhotosAlbum(image, nil,nil,nil);
    UIImageWriteToSavedPhotosAlbum(image, self, @selector(image:didFinishSavingWithError:contextInfo:), NULL);
    [SVProgressHUD show];

// 指定回调方法
- (void)image: (UIImage *) image didFinishSavingWithError: (NSError *) error contextInfo: (void *) contextInfo{
    [SVProgressHUD dismiss];
    NSString *msg = nil ;
    if(error != NULL){
        msg = @"保存失败,请在'设置->隐私->照片'中开启应用访问照片的权限";
    }else{
        msg = @"保存成功";
    }
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:msg delegate:self cancelButtonTitle:@"确定" otherButtonTitles:nil];
    [alert show];
    [alert release];
    
}
```
