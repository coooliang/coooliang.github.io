# OC中运行时抽象基类

`转载` `2020-04-16 10:27:43`

PS：代码来自Masonry源代码

```objectivec
#define MASMethodNotImplemented() \
    @throw [NSException exceptionWithName:NSInternalInconsistencyException \
                                   reason:[NSString stringWithFormat:@"You must override %@ in a subclass.", NSStringFromSelector(_cmd)] \
                                 userInfo:nil]

@implementation MASConstraint

#pragma mark - Init

- (id)init {
	NSAssert(![self isMemberOfClass:[MASConstraint class]], @"MASConstraint is an abstract class, you should not instantiate it directly.");
	return [super init];
}

- (void)activate { MASMethodNotImplemented(); }

@end
```


子类调用activate方法时，必须重写它，仅在运行时会有异常，编译期间不报错。

