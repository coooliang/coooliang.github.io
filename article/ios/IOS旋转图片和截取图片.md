# IOS旋转图片和截取图片

`转载` `2017-05-03 15:47:10`

```objectivec
// 图片旋转
- (CGImageRef)createRotatedImage:(CGImageRef)original degrees:(float)degrees CF_RETURNS_RETAINED {
    if (degrees == 0.0f) {
        CGImageRetain(original);
        return original;
    } else {
        double radians = degrees * M_PI / 180;
        
#if TARGET_OS_EMBEDDED || TARGET_IPHONE_SIMULATOR
        radians = -1*radians;
#endif
        
        size_t _width = CGImageGetWidth(original);
        size_t _height = CGImageGetHeight(original);
        
        CGRect imgRect = CGRectMake(0, 0, _width, _height);
        CGAffineTransform __transform = CGAffineTransformMakeRotation(radians);
        CGRect rotatedRect = CGRectApplyAffineTransform(imgRect, __transform);
        
        CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
        CGContextRef context = CGBitmapContextCreate(NULL,
                                                     rotatedRect.size.width,
                                                     rotatedRect.size.height,
                                                     CGImageGetBitsPerComponent(original),
                                                     0,
                                                     colorSpace,
                                                     kCGBitmapAlphaInfoMask & kCGImageAlphaPremultipliedFirst);
        CGContextSetAllowsAntialiasing(context, FALSE);
        CGContextSetInterpolationQuality(context, kCGInterpolationNone);
        CGColorSpaceRelease(colorSpace);
        
        CGContextTranslateCTM(context,
                              +(rotatedRect.size.width/2),
                              +(rotatedRect.size.height/2));
        CGContextRotateCTM(context, radians);
        
        CGContextDrawImage(context, CGRectMake(-imgRect.size.width/2,
                                               -imgRect.size.height/2,
                                               imgRect.size.width,
                                               imgRect.size.height),
                           original);
        
        CGImageRef rotatedImage = CGBitmapContextCreateImage(context);
        CFRelease(context);
        
        return rotatedImage;
    }
}
```



```objectivec
/**
 * 图片截取
 * 从图片中按指定的位置大小截取图片的一部分
 * UIImage image 原始的图片
 * CGRect rect 要截取的区域
 */
- (UIImage *)imageFromImage:(UIImage *)image inRect:(CGRect)rect {
    float imageWidth =  image.size.width;
    float imageHeight =  image.size.height;
    //按图片和屏幕宽高比截取
    float wcount = imageWidth/_videoPreviewView.frame.size.width;
    float hcount = imageHeight/_videoPreviewView.frame.size.height;
    CGRect tt = CGRectMake(rect.origin.x*wcount, rect.origin.y*hcount, rect.size.width*wcount, rect.size.height*hcount);
    CGImageRef sourceImageRef = [image CGImage];
    CGImageRef newImageRef = CGImageCreateWithImageInRect(sourceImageRef, tt);
    UIImage *newImage = [UIImage imageWithCGImage:newImageRef];
    return newImage;
}
```



```objectivec
/**
 * 改变图片大小
 */
-(UIImage*)image:(UIImage*)image scaleToSize:(CGSize)size
{
    // 创建一个bitmap的context
    // 并把它设置成为当前正在使用的context
    UIGraphicsBeginImageContext(size);
    // 绘制改变大小的图片
    [image drawInRect:CGRectMake(0, 0, size.width, size.height)];
    // 从当前context中创建一个改变大小后的图片
    UIImage* scaledImage = UIGraphicsGetImageFromCurrentImageContext();
    // 使当前的context出堆栈
    UIGraphicsEndImageContext();
    // 返回新的改变大小后的图片
    return scaledImage;
}
```

使用方法：

```objectivec
//旋转后的图片
UIImage *imageRef = [UIImage imageWithCGImage:[self createRotatedImage:image.CGImage degrees:90]];//旋转90度
//截取后的图片
UIImage *rectImage = [self imageFromImage:imageRef inRect:_scanImageRect];

//UIImage *rotationImage = [UIImage imageWithCGImage:imageRef];

_resultImage = [self image:rectImage scaleToSize:CGSizeMake(CAMERA_WIDTH, CAMERA_HEIGHT)];
```

 PS：文章部分代码转载自ZXing源码 

