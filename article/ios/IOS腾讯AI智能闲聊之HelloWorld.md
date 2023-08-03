

```objectivec
/**
 app_id    是    int    正整数    1000001    应用标识（AppId）
 time_stamp    是    int    正整数    1493468759    请求时间戳（秒级）
 nonce_str    是    string    非空且长度上限32字节    fa577ce340859f9fe    随机字符串
 sign    是    string    非空且长度固定32字节        签名信息，详见接口鉴权
 session    是    string    UTF-8编码，非空且长度上限32字节    10000    会话标识（应用内唯一）
 question    是    string    UTF-8编码，非空且长度上限300字节    你叫啥    用户输入的聊天内容
 
 
 ret    是    int    返回码； 0表示成功，非0表示出错
 msg    是    string    返回信息；ret非0时表示出错时错误原因
 data    是    object    返回数据；ret为0时有意义
 session    是    string    UTF-8编码，非空且长度上限32字节
 answer    是    string    UTF-8编码，非空
 
 */
-(void)aiRequest:(NSString *)question block:(void(^)(id result))block{
    NSString *time_stamp = [NSString stringWithFormat:@"%d",(int)[[NSDate new]timeIntervalSince1970]];
    NSString *nonce_str = [self getRandom32String];
    NSString *session = [[[[UIDevice currentDevice]identifierForVendor]UUIDString]md5String];
    
    NSMutableDictionary *params = [NSMutableDictionary dictionaryWithDictionary:@{@"app_id":aiAppId,@"session":session,@"question":question,@"time_stamp":time_stamp,@"nonce_str":nonce_str}];
    NSString *sign = [self getReqSign:params appkey:aiAppKey];
    [params setObject:sign forKey:@"sign"];
    NSLog(@"params = %@",params);
    
    NSString *url = @"https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
    [self post:url params:params block:^(id result) {
        if (block) {
            if (result) {
                NSDictionary *d = [result objectForKey:@"data"];
                if (d) {
                    NSString *s = [d objectForKey:@"answer"];
                    block(s);
                }
            }
        }
    }];
}
-(void)post:(NSString *)url params:(NSDictionary *)params block:(void(^)(id result))block{
    NSMutableURLRequest *request = [[AFHTTPRequestSerializer serializer]requestWithMethod:@"POST" URLString:url parameters:params error:nil];
    AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    NSURLSessionDataTask *dataTask = [manager dataTaskWithRequest:request completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
        if (block) {
            block(responseObject);
        }
    }];
    [dataTask resume];
}

-(NSString *)getReqSign:(NSDictionary *)params appkey:(NSString *)appkey{
    // 1. 字典升序排序
    NSArray *keyArray = [params allKeys];
    NSArray *sortArray = [keyArray sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
        return [obj1 compare:obj2 options:NSNumericSearch];
    }];
    
    // 2. 拼按URL键值对
    NSMutableArray *valueArray = [NSMutableArray array];
    for (NSString *sortString in sortArray) {
        [valueArray addObject:[params objectForKey:sortString]];
    }
    
    NSMutableArray *signArray = [NSMutableArray array];
    for (int i = 0; i < sortArray.count; i++) {
        NSString *value = valueArray[i];
        value = [value stringByURLEncode];
        NSString *keyValueStr = [NSString stringWithFormat:@"%@=%@",sortArray[i],value];
        [signArray addObject:keyValueStr];
    }
    NSString *sign = [signArray componentsJoinedByString:@"&"];
    
    // 3. 拼接app_key
    sign = [NSString stringWithFormat:@"%@&app_key=%@",sign,appkey];
    NSLog(@"sign = %@",sign);
    
    // 4. MD5运算+转换大写，得到请求签名
    sign = [[sign md5String]uppercaseString];
    NSLog(@"sign = %@",sign);
    
    return sign;
}

-(NSString *)getRandom32String{
    int length = 30;
    char data[length];
    for (int i=0; i<length; i++) {
       data[i] = (char)('A' + (arc4random_uniform(26)));
    }
    NSString *randomStr = [[NSString alloc] initWithBytes:data length:length encoding:NSUTF8StringEncoding];
    NSString *string = [NSString stringWithFormat:@"%@",randomStr];
    NSLog(@"getRandomStr = %@",string);
    return string;
}
```


