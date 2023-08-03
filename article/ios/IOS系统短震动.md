# IOS系统短震动

`原创` `2021-07-21 11:31:46`

```objectivec
+(void)feedback{
    if (@available(iOS 10.0, *)){
    	//设置->声音与触感->关闭系统触感反馈开关，将不会震动
        UIImpactFeedbackGenerator *feedBackGenertor = [[UIImpactFeedbackGenerator alloc]initWithStyle:UIImpactFeedbackStyleLight];
        [feedBackGenertor prepare];
        [feedBackGenertor impactOccurred];
    }else{
        //震动，1519，1520（kSystemSoundID_Vibrate震动时间过长）
        AudioServicesPlaySystemSound(1519);
    }

//    播放系统声音    
//    SystemSoundID soundID;
//    NSURL *soundURL = [[NSBundle mainBundle]URLForResource:@"keyboard-click.aiff" withExtension:nil];
//    AudioServicesCreateSystemSoundID((__bridge CFURLRef _Nonnull)(soundURL), &soundID);
//    AudioServicesPlaySystemSound(soundID);
}
```


keyboard-click.aiff: [https://download.csdn.net/download/cl61917380/20391695](https://download.csdn.net/download/cl61917380/20391695)

