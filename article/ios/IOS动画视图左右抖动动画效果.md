# 【IOS动画】视图左右抖动动画效果

`原创` `2014-07-07 16:15:21`

```objectivec
CABasicAnimation* shake = [CABasicAnimation animationWithKeyPath:@"transform.translation.x"];
shake.fromValue = [NSNumber numberWithFloat:-5];
shake.toValue = [NSNumber numberWithFloat:5];
shake.duration = 0.1;//执行时间
shake.autoreverses = YES; //是否重复
shake.repeatCount = 2;//次数
[self.infoLabel.layer addAnimation:shake forKey:@"shakeAnimation"];
self.infoLabel.alpha = 1.0;
[UIView animateWithDuration:2.0 delay:0.0 options:UIViewAnimationOptionCurveEaseIn | UIViewAnimationOptionAllowUserInteraction animations:^{
    //self.infoLabel.alpha = 0.0; //透明度变0则消失
} completion:nil];
```

self.infoLabel是一个UILabel对象，实现label错误提示时左右抖动的效果
