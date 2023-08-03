# [IOS动画]KDProgressView（圆环）

`转载` `2015-08-10 11:06:58`

部分源码转自code4app

KDGoalBarPercentLayer.h 

```objectivec
#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>


@interface KDGoalBarPercentLayer : CALayer

@property (nonatomic) CGFloat percent;
@property (nonatomic,strong)UIColor *frontColor;
@property (nonatomic,strong)UIColor *backColor;


-(void)setRadius:(float)r;
-(void)setRadius:(float)r width:(float)w;

@end
```

KDGoalBarPercentLayer.m 

```objectivec
#import "KDGoalBarPercentLayer.h"


#define toRadians(x) ((x)*M_PI / 180.0)
#define toDegrees(x) ((x)*180.0 / M_PI)


@implementation KDGoalBarPercentLayer{
    float innerRadius;
    float outerRadius;
}

@synthesize percent,frontColor,backColor;

-(void)drawInContext:(CGContextRef)ctx {
    if(innerRadius == 0){innerRadius = 39;}
    if(outerRadius == 0){outerRadius = 45;}
    [self DrawRight:ctx];
    [self DrawLeft:ctx];
}

-(void)DrawRight:(CGContextRef)ctx {
    CGPoint center = CGPointMake(self.frame.size.width / (2), self.frame.size.height / (2));
    
    CGFloat delta = -toRadians(360 * percent);

    if(frontColor == nil){
        frontColor = [UIColor colorWithRed:255.0/255.0 green:144.0/255.0 blue:0 alpha:1];
    }
    CGContextSetFillColorWithColor(ctx, frontColor.CGColor);
    
    CGContextSetLineWidth(ctx, 1);
    
    CGContextSetLineCap(ctx, kCGLineCapRound);
    
    CGContextSetAllowsAntialiasing(ctx, YES);
    
    CGMutablePathRef path = CGPathCreateMutable();
    
    CGPathAddRelativeArc(path, NULL, center.x, center.y, innerRadius, -(M_PI / 2), delta);
    CGPathAddRelativeArc(path, NULL, center.x, center.y, outerRadius, delta - (M_PI / 2), -delta);
    CGPathAddLineToPoint(path, NULL, center.x, center.y- innerRadius);
    
    CGContextAddPath(ctx, path);
    CGContextFillPath(ctx);
    
//    CFRelease(path);

}

-(void)DrawLeft:(CGContextRef)ctx {
    CGPoint center = CGPointMake(self.frame.size.width / (2), self.frame.size.height / (2));
    
    CGFloat delta = toRadians(360 * (1-percent));

    if(backColor == nil){
        backColor = [UIColor colorWithRed:204/255.0f green:204/255.0f blue:204/255.0f alpha:1];
    }
    CGContextSetFillColorWithColor(ctx, backColor.CGColor);
    
    CGContextSetLineWidth(ctx, 1);
    
    CGContextSetLineCap(ctx, kCGLineCapRound);
    
    CGContextSetAllowsAntialiasing(ctx, YES);
    
    CGMutablePathRef path = CGPathCreateMutable();
    
    CGPathAddRelativeArc(path, NULL, center.x, center.y, innerRadius, -(M_PI / 2), delta);
    CGPathAddRelativeArc(path, NULL, center.x, center.y, outerRadius, delta - (M_PI / 2), -delta);
    CGPathAddLineToPoint(path, NULL, center.x, center.y- innerRadius);
    
    CGContextAddPath(ctx, path);
    CGContextFillPath(ctx);
    
//    CFRelease(path);
}

-(void)setRadius:(float)r{
    [self setRadius:r width:6];
}
-(void)setRadius:(float)r width:(float)w{
    innerRadius = r;
    outerRadius = r+w;
}

@end
```

KDProgressView.h 

```objectivec
#import <UIKit/UIKit.h>
#import <QuartzCore/QuartzCore.h>
#import "KDGoalBarPercentLayer.h"

/**
 *
 * _circle = [[KDProgressView alloc]initWithFrame:CGRectMake(0,0,95,95)];
 * [_circle setFrontProgressColor:redColor];
 * [_circle setBackProgressColor:IMAGE_BG_COLOR];
 * [_circle setPercent:10 animate:NO];//是否显示动画
 * [self addSubview:_circle];
 *
 */
@interface KDProgressView : UIView {
    UIImage * thumb;
    
    KDGoalBarPercentLayer *percentLayer;
    CALayer *thumbLayer;
          
}

-(void)setPercent:(int)percent;
-(void)setPercent:(int)percent animate:(BOOL)animate;
-(void)setBackProgressColor:(UIColor *)color;
-(void)setFrontProgressColor:(UIColor *)color;

@end
```

KDProgressView.m 

```objectivec
#import "KDProgressView.h"

@implementation KDProgressView{
    NSTimer *timer;
    int kdPercent;
    int tempPercent;
}

#pragma mark - init
-(id)init{
	if ((self = [super init])){
        self.backgroundColor = [UIColor clearColor];
		[self setup];
	}
	return self;
}

-(id)initWithCoder:(NSCoder *)aDecoder{
	if ((self = [super initWithCoder:aDecoder])){
		[self setup];
	}
	return self;
}

-(id)initWithFrame:(CGRect)frame{
	if ((self = [super initWithFrame:frame])){
        [self setup:frame.size.width/2-6];
	}
    
	return self;
}

-(void)setup:(float)radius{
    self.backgroundColor = [UIColor clearColor];
    self.clipsToBounds = NO;
    
    thumbLayer = [CALayer layer];
    thumbLayer.contentsScale = [UIScreen mainScreen].scale;
    thumbLayer.contents = (id) thumb.CGImage;
    thumbLayer.frame = CGRectMake(self.frame.size.width / 2 - thumb.size.width/2, 0, thumb.size.width, thumb.size.height);
    thumbLayer.hidden = YES;
    
    percentLayer = [KDGoalBarPercentLayer layer];
    [percentLayer setRadius:radius];
    percentLayer.contentsScale = [UIScreen mainScreen].scale;
    percentLayer.percent = 100;
    percentLayer.frame = self.bounds;
    percentLayer.masksToBounds = NO;
    [percentLayer setNeedsDisplay];
    
    
    [self.layer addSublayer:percentLayer];
    [self.layer addSublayer:thumbLayer];
}

-(void)setup{
    [self setup:39];
}


#pragma mark - Touch Events
- (void)moveThumbToPosition:(CGFloat)angle {
    CGRect rect = thumbLayer.frame;

    CGPoint center = CGPointMake(self.bounds.size.width/2.0f, self.bounds.size.height/2.0f);
    angle -= (M_PI/2);

    rect.origin.x = center.x + 75 * cosf(angle) - (rect.size.width/2);
    rect.origin.y = center.y + 75 * sinf(angle) - (rect.size.height/2);
    
    [CATransaction begin];
    [CATransaction setValue:(id)kCFBooleanTrue forKey:kCATransactionDisableActions];
    
    thumbLayer.frame = rect;
    
    [CATransaction commit];
}
#pragma mark - Custom Getters/Setters
-(void)animatePercent{
    tempPercent += 1;
    [self setPercent:tempPercent];
    if(tempPercent>=kdPercent){
        [timer invalidate];
        timer = nil;
        tempPercent = 0;
        kdPercent = 0;
    }
}
- (void)setPercent:(int)percent animate:(BOOL)animate{
    if(timer){
        [timer invalidate];
        timer = nil;
    }
    if(animate){//使用动画
        tempPercent = 0;
        kdPercent = percent;
        if(kdPercent > 1){
            timer = [NSTimer scheduledTimerWithTimeInterval:0.01 target:self selector:@selector(animatePercent) userInfo:nil repeats:YES];
        }
    }else{
        [self setPercent:percent];
    }
}
- (void)setPercent:(int)percent{
    CGFloat floatPercent = percent / 100.0;
    floatPercent = MIN(1, MAX(0, floatPercent));
    
    percentLayer.percent = floatPercent;
    [self setNeedsLayout];
    [percentLayer setNeedsDisplay];
    
    [self moveThumbToPosition:floatPercent * (2 * M_PI) - (M_PI/2)];
}

-(void)setBackProgressColor:(UIColor *)color{
    percentLayer.backColor = color;
    [percentLayer setNeedsDisplay];
}
-(void)setFrontProgressColor:(UIColor *)color{
    percentLayer.frontColor = color;
    [percentLayer setNeedsDisplay];
}

- (void)dealloc{
    if(timer != nil){
        [timer invalidate];
        timer = nil;
    }
}

@end
```

使用方法： 

```objectivec
#define IMAGE_BG_COLOR ([UIColor colorWithRed:237/255.0 green:237/255.0 blue:237/255.0 alpha:1])

UIColor *redColor = [UIColor colorWithRed:237/255.0 green:111/255.0 blue:68/255.0 alpha:1];

_circle = [[KDProgressView alloc]initWithFrame:CGRectMake(0,0,95,95)];
[_circle setFrontProgressColor:redColor];
[_circle setBackProgressColor:IMAGE_BG_COLOR];
[_circle setPercent:10 animate:NO];//是否显示动画
[self addSubview:_circle];
```






