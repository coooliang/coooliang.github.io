# IOS使用本地通知(UILocalNotification)删除应用角标小红点不删除通知中心内容

`原创` `2016-11-01 10:07:35`

1.本地通知需要当应用在后台时执行，比如放在applicationDidEnterBackground方法里；

2.需要注册通知

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	[self notificationSetting];
	return YES;
}

/**
 *推送设置
 */
-(void)notificationSetting{
    // ios8后，需要添加这个注册，才能得到授权
    if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerUserNotificationSettings:)]) {
        UIUserNotificationType type =  UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound;
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:type
                                                                                 categories:nil];
        [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
        
    }
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    [self execLocalNofitication];
}

-(void)execLocalNofitication{
    UILocalNotification *notification = [[UILocalNotification alloc] init];
    if (notification) {
        // 设置触发通知的时间
        NSDate *fireDate = [NSDate dateWithTimeIntervalSinceNow:2];
        notification.fireDate = fireDate;
        // 时区
        notification.timeZone = [NSTimeZone defaultTimeZone];
        // 设置重复的间隔
        notification.repeatInterval = 0;
        // 通知内容
        notification.alertBody = nil;
        notification.applicationIconBadgeNumber = -99;
        // 通知被触发时播放的声音
        notification.soundName = nil;
        // 执行通知注册
        [[UIApplication sharedApplication] scheduleLocalNotification:notification];
    }
}
```
