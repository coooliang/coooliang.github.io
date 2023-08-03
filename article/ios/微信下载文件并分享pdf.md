# 微信下载文件并分享pdf

`原创` `2021-09-27 10:57:59`

```objectivec
-(__kindof NSURLSessionTask *)downloadWithURL:(NSString *)URL
                                       fileDir:(NSString *)fileDir
                                      progress:(void(^)(NSProgress *progress))progress
                                       success:(void(^)(NSString *filePath))success
                                       failure:(void(^)(NSError *error))failure{
    
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:URL]];
    NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
        //下载进度
        progress ? progress(downloadProgress) : nil;
        NSLog(@"下载进度:%.2f%%",100.0*downloadProgress.completedUnitCount/downloadProgress.totalUnitCount);
    } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
        //拼接缓存目录
        NSString *downloadStr = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES)lastObject] ;
        
        //拼接文件路径
        NSString *filePath = [downloadStr stringByAppendingPathComponent:fileDir];
        
        NSLog(@"downloadStr = %@",downloadStr);
        return [NSURL fileURLWithPath:filePath];
    } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
        NSLog(@"%@---%@", filePath, filePath.absoluteString);
        success ? success(filePath.absoluteString /** NSURL->NSString*/) : nil;
        failure && error ? failure(error) : nil;
    }];
    //开始下载
    [downloadTask resume];
    return downloadTask;
}
```


```objectivec
[self downloadWithURL:url fileDir:fileName progress:^(NSProgress *progress) {
        
} success:^(NSString *filePath) {
    NSLog(@"%@", filePath);
    filePath = [filePath replaceAll:@"file://" with:@""];
    //下载完成直接打开
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = fileName;
    message.description = @"Test Pdf";
    [message setThumbImage:[UIImage imageNamed:@"AppIcon"]];
    
    WXFileObject *ext = [WXFileObject object];
    ext.fileExtension = @"pdf";
//        NSString* filePath = [[NSBundle mainBundle] pathForResource:@"ML" ofType:@"pdf"];
    ext.fileData = [NSData dataWithContentsOfFile:filePath];
    
    message.mediaObject = ext;
    
    SendMessageToWXReq* req = [[SendMessageToWXReq alloc] init];
    req.bText = NO;
    req.message = message;
    req.scene = WXSceneSession;
    
    [WXApi sendReq:req completion:nil];
} failure:^(NSError *error) {
}];
```


