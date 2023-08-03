

转载必须注明出处：http://blog.csdn.net/coooliang



ScrollLabel.h



```
//
//  ScrollLabel.h
//  ScrollLabel
//
//  Created by coooliang on 11/23/15.
//  Copyright © 2015 coooliang. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ScrollLabel : UIScrollView

@property(nonatomic,assign)CGFloat duration;
@property(nonatomic,assign)CGFloat delay;

-(void)setTextColor:(UIColor *)color;

-(void)setText:(NSString *)text;

-(void)setFont:(UIFont *)font;

-(void)start;

@end
```

 ScrollLabel.m 







```
//
//  ScrollLabel.m
//  ScrollLabel
//
//  Created by coooliang on 11/23/15.
//  Copyright © 2015 coooliang. All rights reserved.
//

#import "ScrollLabel.h"

@implementation ScrollLabel{
    UILabel *_label;
    UILabel *_label2;
    CGFloat _defaultDuration;
}

-(id)initWithFrame:(CGRect)frame{
    if (self = [super initWithFrame:frame]) {
        _defaultDuration = 0;
        self.backgroundColor = [UIColor clearColor];
        _label = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
        _label.backgroundColor = [UIColor clearColor];
        _label.textAlignment = NSTextAlignmentLeft;
        [self addSubview:_label];
        
    }
    return self;
}

-(void)setTextColor:(UIColor *)color{
    _label.textColor = color;
}

-(void)setText:(NSString *)text{
    _label.text = text;
}

-(void)setFont:(UIFont *)font{
    _label.font = font;
}

-(void)copyLabel{
    //复制一个UIView
    _label2 = [NSKeyedUnarchiver unarchiveObjectWithData:[NSKeyedArchiver archivedDataWithRootObject:_label]];
    CGRect rect = _label2.frame;
    rect.origin.x = rect.size.width;
    _label2.frame = rect;
    [self addSubview:_label2];
}

-(void)start{
    CGSize size = _label.frame.size;
    if([[[UIDevice currentDevice]systemVersion]floatValue] <= 7.0){
        size = [_label.text sizeWithAttributes:[NSDictionary dictionaryWithObject:_label.font forKey:NSFontAttributeName]];
    }else{
        //最大10000
        CGRect rect = [_label.text boundingRectWithSize:CGSizeMake(0, 10000) options:NSStringDrawingUsesLineFragmentOrigin attributes:[NSDictionary dictionaryWithObject:_label.font forKey:NSFontAttributeName] context:nil];
        size = rect.size;
    }
    
    if(size.width < self.frame.size.width){
        size.width = self.frame.size.width;
    }
    
    _defaultDuration = size.width/50.0;//默认每秒50像素
    CGRect rect = _label.frame;
    rect.size.width = size.width;
    _label.frame = rect;
    
    [self copyLabel];
    [self scroll];
   
}

-(void)scroll{
    [UIView animateWithDuration:(self.duration == 0?_defaultDuration:self.duration) delay:self.delay options:UIViewAnimationOptionCurveLinear animations:^{
        CGRect temp = _label.frame;
        temp.origin.x = - _label.frame.size.width;
        _label.frame = temp;
        
        CGRect temp2 = _label2.frame;
        temp2.origin.x = _label2.frame.origin.x - _label2.frame.size.width;
        _label2.frame = temp2;
    } completion:^(BOOL finished) {
        CGRect temp = _label.frame;
        temp.origin.x = 0;
        _label.frame = temp;
        
        CGRect temp2 = _label2.frame;
        temp2.origin.x = _label.frame.size.width;
        _label2.frame = temp2;
        if(finished)[self scroll];
    }];
}

@end
```





使用方式：

ViewController.m 



```
//
//  ViewController.m
//  ScrollLabel
//
//  Created by coooliang on 11/23/15.
//  Copyright © 2015 coooliang. All rights reserved.
//

#import "ViewController.h"
#import "ScrollLabel.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    ScrollLabel *sl = [[ScrollLabel alloc]initWithFrame:CGRectMake(20, 60, 200, 30)];
    sl.backgroundColor = [UIColor yellowColor];
    sl.text = @"一地在要工上是中国同和的有人我主产为为这民了发以经！一地在要工上是中国同和的有人我主产为为这民了发以经！！一地在要工上是中国同和的有人我主产为为这民了发以经！！！";
    
    sl.font = [UIFont systemFontOfSize:12];
    sl.textColor = [UIColor blackColor];
    
    [self.view addSubview:sl];
    
    [sl start];
    
    
    ScrollLabel *sl2 = [[ScrollLabel alloc]initWithFrame:CGRectMake(0, 120, 320, 30)];
    sl2.backgroundColor = [UIColor yellowColor];
    sl2.duration = 10;
    sl2.text = @"一地在要工上是中国同和的有人我主产为为这民了发以经！一地在要工上是中国同和的有人我主产为为这民了发以经！！一地在要工上是中国同和的有人我主产为为这民了发以经！！！";
    [self.view addSubview:sl2];
    
    [sl2 start];
    
    
    ScrollLabel *sl3 = [[ScrollLabel alloc]initWithFrame:CGRectMake(0, 180, 320, 30)];
    sl3.backgroundColor = [UIColor yellowColor];
    sl3.duration = 5;
    sl3.delay = 2;
    sl3.text = @"一地在要工上是中国同";
    [self.view addSubview:sl3];
    
    [sl3 start];
}


@end
```



我的github例子：

https://github.com/coooliang/ScrollLabel 



