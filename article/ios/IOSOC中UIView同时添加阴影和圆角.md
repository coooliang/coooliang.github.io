# OC中UIView同时添加阴影和圆角

`原创` `2022-01-07 14:22:52`

圆角中的masksToBounds=YES和阴影中的clipsToBounds=NO存在冲突，所以圆角与阴影不能共存，现在使用一个单独的UIView在下层做为阴影，上层原来的UIView设置圆角。

扩展类 UIView+Shadow.h

```objectivec
@interface UIView (Shadow)

-(UIView *)flipShadow;
-(UIView *)flipShadow:(int)radius;

@end
```


UIView+Shadow.m

```objectivec
#import "UIView+Shadow.h"

@implementation UIView (Shadow)

-(UIView *)flipShadow{
    return [self flipShadow:0];
}

-(UIView *)flipShadow:(int)radius{
    UIView *view = [[UIView alloc]initWithFrame:self.frame];
    view.backgroundColor = UIColor.whiteColor;
    view.layer.backgroundColor = UIColor.whiteColor.CGColor;//需要有颜色才有阴影
    view.layer.shadowOffset = CGSizeMake(0, 2);
    view.layer.shadowColor = [UIColor colorWithRed:0.7 green:0.7 blue:0.7 alpha:1.000].CGColor;
    view.layer.shadowOpacity = 0.2;
    if (radius > 0) {
        self.layer.cornerRadius = radius;
        self.layer.masksToBounds = YES;
        view.layer.cornerRadius = radius;
    }
    self.frame = self.bounds;
    [view addSubview:self];
    return view;
}
@end
```


如何使用:

```objectivec
UIView *view = [[UIView alloc]initWithFrame:frame];

UIView *view1 = [view flipShadow];
UIView *view2 = [view flipShadow:5];

[self addSubview:view1];
[self addSubview:view2];
```


