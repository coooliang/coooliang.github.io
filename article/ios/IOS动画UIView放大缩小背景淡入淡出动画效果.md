# UIView放大缩小背景淡入淡出动画效果

`原创` `2014-09-03 14:21:29`

```objectivec
UIView+CGAffineTransform.h:

#import <UIKit/UIKit.h>

#define animateWithDuration_times 0.2
#define animateWithDuration_sade_times 0.1
@interface UIView (CGAffineTransform)
//放大
-(void)show:(void(^)(void))finishBlock;
//缩小
-(void)hidden:(void(^)(void))finishBlock;

//淡入
-(void)sadeIn:(void(^)(void))finishBlock;
//淡出
-(void)sadeOut:(void(^)(void))finishBlock;
@end


UIView+CGAffineTransform.m:

#import "UIView+CGAffineTransform.h"

#import "UIView+CGAffineTransform.h"

@implementation UIView (CGAffineTransform)
-(void)show:(void(^)(void))finishBlock{
    //缩小创建好的视图
    CGAffineTransform newTransform = CGAffineTransformScale(self.transform, 0.1, 0.1);
    [self setTransform:newTransform];
    
    //第一次显示的时候放大它
    [UIView animateWithDuration:animateWithDuration_times animations:^{
        CGAffineTransform newTransform = CGAffineTransformConcat(self.transform,  CGAffineTransformInvert(self.transform));
        [self setTransform:newTransform];
        self.alpha = 1.0;
    } completion:^(BOOL finished) {
        if(finishBlock != nil){
            finishBlock();
        }
    }];
}
-(void)hidden:(void(^)(void))finishBlock{
    [UIView animateWithDuration:animateWithDuration_times animations:^{
        CGAffineTransform newTransform =  CGAffineTransformScale(self.transform, 0.0, 0.0);
        [self setTransform:newTransform];
    } completion:^(BOOL finished) {
        if(finishBlock != nil){
            finishBlock();
        }
    }];
    
}

//淡入
-(void)sadeIn:(void(^)(void))finishBlock{
    self.alpha = 0.0;
    [UIView animateWithDuration:animateWithDuration_sade_times animations:^{
        self.alpha = 1.0;
    } completion:^(BOOL finished) {
        if(finishBlock != nil){
            finishBlock();
        }
    }];
}
//淡出
-(void)sadeOut:(void(^)(void))finishBlock;{
    [UIView animateWithDuration:animateWithDuration_sade_times animations:^{
        self.alpha = 0.0;
    } completion:^(BOOL finished) {
        if(finishBlock != nil){
            finishBlock();
        }
    }];
}
@end

调用方式：
[_background sadeIn:^{
        [_background addSubview:_webContainer];
        [_webContainer show:^{
            [self loadUrl:_url webview:alertWebView];
        }];
    }];
        
```






 

 

 

 

