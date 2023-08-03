# 多个请求完成的监听（dispatch_group_t）

`原创` `2018-12-12 16:47:14`

PS: CLNetworking使用的是AFNetworking封装的，没有特别的地方

```objectivec
-(IBAction)groupCilck:(id)sender{
    //如果多次调用groupCilck方法时，dispatch_group_t对象应为成员变量，只创建一次
    dispatch_group_t group = dispatch_group_create();
    for (int i=0; i<5; i++) {
        dispatch_group_enter(group);
        [[CLNetworking sharedInstance]postData:@"https://www.baidu.com" params:nil successBlock:^(id  _Nonnull result) {
            NSLog(@"request success %d",i);
            dispatch_group_leave(group);
        } failBlock:^(id  _Nonnull result) {
            NSLog(@"request fail %d",i);
            dispatch_group_leave(group);
        }];
    }
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
        NSLog(@"request finish...");
    });
    NSLog(@"groupCilck...");
// 无序,且finish总是最后

// groupCilck...
// request success 2
// request success 3
// request success 0
// request success 1
// request success 4
// request finish...
}
```


