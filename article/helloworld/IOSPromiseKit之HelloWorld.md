

PromiseKit：[https://github.com/mxcl/PromiseKit](https://github.com/mxcl/PromiseKit)  RWPromiseKit：[https://github.com/deput/RWPromiseKit](https://github.com/deput/RWPromiseKit)

```
RWPromise *promise = [RWPromise promise:^(ResolveHandler resolve, RejectHandler reject) {
        //post url1
        NSDictionary *dict = @{@"code":@"0",@"data":@{@"name":@"111"}};
        NSString *code = dict[@"code"];
        if([@"0"isEqualToString:code]){
            resolve(dict);
        }else{
            reject([NSError errorWithDomain:@"mydomain" code:1 userInfo:dict]);
        }
    }];
    promise.then(^id(id obj){
        NSLog(@"%@",obj);
        //post url2
        NSDictionary *dict = @{@"code":@"0",@"data":@{@"name":@"222"}};
        return [NSError errorWithDomain:@"mydomain" code:0 userInfo:dict];
    })
    .then(^id(id obj){
        NSLog(@"%@",obj);
        //post url3
        NSDictionary *dict = @{@"code":@"0",@"data":@{@"name":@"333"}};
        return dict;
    })
    .catch(^(NSError* error){
        NSDictionary *dict = error.userInfo;
        NSLog(@"%@",dict);
        NSString *code = dict[@"code"];
        if([@"0"isEqualToString:code]){

        }else{

        }
    })
    .finally(^{
        NSLog(@"finally...");
    });```


