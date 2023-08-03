# 按钮双图片翻转动画

`原创` `2022-02-28 10:54:29`

CMSCoinView.h

```objectivec
#import <UIKit/UIKit.h>


typedef void (^ClickBlock)(BOOL isObcerse);

@interface CMSCoinView : UIView
 
-(id)initWithPrimaryView:(UIView *)view1 andSecondaryView:(UIView *)view2 inFrame:(CGRect)frame;
 
@property (nonatomic,strong) UIView *primaryView;
@property (nonatomic,strong) UIView *secondaryView;
@property (nonatomic,assign)float spinTime;

@property (nonatomic,strong)ClickBlock block;
 
@end


```


CMSCoinView.m

```objectivec
#import "CMSCoinView.h"

@implementation CMSCoinView{
    bool _displayingPrimary;
    float _spinTime;
    
    BOOL _isObcerse;//是否正面
    
    ClickBlock _clickBlock;
}
 
-(id)initWithPrimaryView:(UIView *)primaryView andSecondaryView: (UIView *)secondaryView inFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        self.primaryView = primaryView;
        self.secondaryView = secondaryView;
        _displayingPrimary = YES;
        _spinTime = 0.5;
        _isObcerse = YES;
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(flipTouched)];
        [self addGestureRecognizer:tap];
    }
    return self;
}

-(void)setPrimaryView:(UIView *)primaryView{
    _primaryView = primaryView;
    CGRect frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    self.primaryView.frame = frame;
    self.primaryView.backgroundColor = UIColor.clearColor;
    self.primaryView.userInteractionEnabled = YES;
    [self addSubview:self.primaryView];
}
 
-(void)setSecondaryView:(UIView *)secondaryView{
    _secondaryView = secondaryView;
    CGRect frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    self.secondaryView.frame = frame;
    self.secondaryView.backgroundColor = UIColor.clearColor;
    self.secondaryView.userInteractionEnabled = YES;
    [self addSubview: self.secondaryView];
    [self sendSubviewToBack:self.secondaryView];
    self.secondaryView.hidden = YES;
}

-(void)flipTouched{
    _isObcerse = !_isObcerse;
    if (_isObcerse) {
        [self showFront];
    }else{
        [self showBack];
    }
}
 
-(void)showBack{
    self.secondaryView.hidden = NO;
    [UIView transitionFromView:self.primaryView toView:self.secondaryView
                      duration:_spinTime
                       options: UIViewAnimationOptionTransitionFlipFromRight+UIViewAnimationOptionCurveEaseInOut
                    completion:^(BOOL finished) {
        if (finished) {
            self->_displayingPrimary = !self->_displayingPrimary;
            if(self->_clickBlock){
                self->_clickBlock(self->_isObcerse);
            }
        }
    }];
}
-(void)showFront{
    [UIView transitionFromView:self.secondaryView toView:self.primaryView
                      duration:_spinTime
                       options: UIViewAnimationOptionTransitionFlipFromRight+UIViewAnimationOptionCurveEaseInOut
                    completion:^(BOOL finished) {
        if (finished) {
            self->_displayingPrimary = !self->_displayingPrimary;
            if(self->_clickBlock){
                self->_clickBlock(self->_isObcerse);
            }
        }
    }];
}


-(void)setBlock:(ClickBlock)block{
    _clickBlock = block;
}

@end
```


使用：

```objectivec
//关怀版切换按钮
    _agedButton = [[CMSCoinView alloc]initWithPrimaryView:[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"aged"]] andSecondaryView:[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"young"]] inFrame:CGRectMake(15, (CGRectGetHeight(_titleLabel.frame)-20)/2.0, 20, 20)];
    [_titleLabel addSubview:_agedButton];
    _agedButton.block = ^(BOOL isObcerse) {
        NSLog(@"isObcerse = %d",isObcerse);
    };
```


