# UINavigationController

`原创` `2014-02-15 14:45:41`

```objectivec
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (retain, nonatomic) UIWindow *window;

@end
```






```objectivec
#import "AppDelegate.h"
#import "NavRootViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.backgroundColor = [UIColor whiteColor];
    
    UINavigationController *navVC = [self makeNavigationControllerWithRootVC];
    self.window.rootViewController = navVC;
    
    //隐藏应用程序顶部的状态栏，IOS7无效，现需要每个视图控制器重写prefersStatusBarHidden方法
    [[UIApplication sharedApplication]setStatusBarHidden:YES];
    
    [self.window makeKeyAndVisible];
    return YES;
}

-(UINavigationController *)makeNavigationControllerWithRootVC{
    NavRootViewController *rootVC = [[NavRootViewController alloc]initWithNibName:@"NavRootViewController" bundle:nil];
    
    UINavigationController *navVC = [[UINavigationController alloc]initWithRootViewController:rootVC];
    
    return [navVC autorelease];
}
```

```objectivec
#import <UIKit/UIKit.h>

@interface NavRootViewController : UIViewController

@end
```

```objectivec
#import "NavRootViewController.h"
#import "SecondViewController.h"
@interface NavRootViewController ()

@end

@implementation NavRootViewController


-(BOOL)prefersStatusBarHidden{
    return YES;
}

-(IBAction)actNext:(id)sender{
    NSLog(@"actNext");
    SecondViewController *secondVC = [[SecondViewController alloc]initWithNibName:@"SecondViewController" bundle:nil];
    
    
    //动画
    CATransition *cati = [CATransition animation];
    cati.delegate = self;
    cati.duration = 0.5f;
    cati.timingFunction = UIViewAnimationCurveEaseInOut;
    cati.removedOnCompletion = NO;
    cati.type = @"pageCurl";
    cati.subtype = kCATransitionFromBottom;
    cati.endProgress = 1.0f;
    [self.navigationController.view.layer addAnimation:cati forKey:@"cati"];
    
    
    [self.navigationController pushViewController:secondVC animated:NO];
    [secondVC release];
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        self.title = @"title";
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
```

```objectivec
#import <UIKit/UIKit.h>

@interface SecondViewController : UIViewController

@end
```


```objectivec
#import "SecondViewController.h"

@interface SecondViewController ()

@end

@implementation SecondViewController

-(BOOL)prefersStatusBarHidden{
    return YES;
}

//返回
-(IBAction)actBack:(id)sender{
    NSLog(@"actBack");
    
    //动画
    CATransition *cati = [CATransition animation];
    cati.delegate = self;
    cati.duration = 0.5f;
    cati.timingFunction = UIViewAnimationCurveEaseInOut;
    cati.removedOnCompletion = NO;
    cati.type = @"suckEffect";
    cati.subtype = kCATransitionFromBottom;
    cati.endProgress = 1.0f;
    [self.navigationController.view.layer addAnimation:cati forKey:@"cati"];
    
    [self.navigationController popViewControllerAnimated:NO];
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    self.navigationController.navigationBarHidden = YES;
    self.navigationController.toolbarHidden = YES;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
```
工程下载地址：http://pan.baidu.com/s/1bnelLYB 
