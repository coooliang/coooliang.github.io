# UIView翻转

`转载` `2015-02-03 14:45:34`

转载自：code4app

CMSCoinView.h

```objectivec
#import <UIKit/UIKit.h>

@interface CMSCoinView : UIView

- (id) initWithPrimaryView: (UIView *) view1 andSecondaryView: (UIView *) view2 inFrame: (CGRect) frame;

@property (nonatomic, retain) UIView *primaryView;
@property (nonatomic, retain) UIView *secondaryView;
@property float spinTime;

-(void)showEnable;
-(void)showUnable;
@end
```

CMSCoinView.m 

```objectivec
#import "CMSCoinView.h"


@interface CMSCoinView (){
    bool displayingPrimary;
}
@end

@implementation CMSCoinView

@synthesize primaryView=_primaryView, secondaryView=_secondaryView, spinTime;

- (id) initWithCoder:(NSCoder *)aDecoder{
    self = [super initWithCoder:aDecoder];
    if(self){
        displayingPrimary = YES;
        spinTime = 1.0;
    }
    return self;
}

- (id) initWithPrimaryView: (UIView *) primaryView andSecondaryView: (UIView *) secondaryView inFrame: (CGRect) frame{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
        self.primaryView = primaryView;
        self.secondaryView = secondaryView;
        
        displayingPrimary = YES;
        spinTime = 0.5;
    }
    return self;
}

- (void) setPrimaryView:(UIView *)primaryView{
    _primaryView = primaryView;
    CGRect frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    [self.primaryView setFrame: frame];
//    [self roundView: self.primaryView];
    self.primaryView.userInteractionEnabled = YES;
    [self addSubview: self.primaryView];
    
//    UITapGestureRecognizer *gesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(flipTouched:)];
//    gesture.numberOfTapsRequired = 1;
//    [self.primaryView addGestureRecognizer:gesture];
//    [self roundView:self];
}

- (void) setSecondaryView:(UIView *)secondaryView{
    _secondaryView = secondaryView;
    CGRect frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    [self.secondaryView setFrame: frame];
//    [self roundView: self.secondaryView];
    self.secondaryView.userInteractionEnabled = YES;
    [self addSubview: self.secondaryView];
    [self sendSubviewToBack:self.secondaryView];
    
//    UITapGestureRecognizer *gesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(flipTouched:)];
//    gesture.numberOfTapsRequired = 1;
//    [self.secondaryView addGestureRecognizer:gesture];
//    [self roundView:self];
}

//- (void) roundView: (UIView *) view{
//    [view.layer setCornerRadius: (self.frame.size.height/2)];
//    [view.layer setMasksToBounds:YES];
//}

-(IBAction) flipTouched:(id)sender{
    [UIView transitionFromView:(displayingPrimary ? self.primaryView : self.secondaryView)
                        toView:(displayingPrimary ? self.secondaryView : self.primaryView)
                      duration: spinTime
                       options: UIViewAnimationOptionTransitionFlipFromRight+UIViewAnimationOptionCurveEaseInOut
                    completion:^(BOOL finished) {
                        if (finished) {
                            //UIView *view = (displayingPrimary ? view1 : view2);
                            
                            displayingPrimary = !displayingPrimary;
                        }
                    }
     ];
}

-(void)showEnable{
    [UIView transitionFromView:self.primaryView toView:self.secondaryView
                      duration: spinTime
                       options: UIViewAnimationOptionTransitionFlipFromRight+UIViewAnimationOptionCurveEaseInOut
                    completion:^(BOOL finished) {
                        if (finished) {
                            //UIView *view = (displayingPrimary ? view1 : view2);
                            
                            displayingPrimary = !displayingPrimary;
                        }
                    }
     ];
}
-(void)showUnable{
    [UIView transitionFromView:self.secondaryView toView:self.primaryView
                      duration: spinTime
                       options: UIViewAnimationOptionTransitionFlipFromRight+UIViewAnimationOptionCurveEaseInOut
                    completion:^(BOOL finished) {
                        if (finished) {
                            //UIView *view = (displayingPrimary ? view1 : view2);
                            
                            displayingPrimary = !displayingPrimary;
                        }
                    }
     ];
}
```

使用方式：

```objectivec
CMSCoinView *attentionImageView = [[CMSCoinView alloc]initWithPrimaryView:[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"manage_xin_unable"]] andSecondaryView:[[UIImageView alloc]initWithImage:[UIImage imageNamed:@"manage_xin"]] inFrame:CGRectMake(20, 207, 18, 18)];

[detailView addSubview:attentionImageView];
```

```objectivec
[attentionImageView showUnable];
或
[attentionImageView showEnable];
```
