

部分代码转载自：https://www.jianshu.com/p/9bade610ed30

 

1.新建一个项目，在工程目录下创建Podfile，引入MagicalRecord



```
inhibit_all_warnings!

source 'https://github.com/CocoaPods/Specs.git'

def pods

pod 'MagicalRecord', '~> 2.3.2'

end

target 'CoreDataDemo' do
    pods
end
```
 2.AppDelegate初始化MagicalRecord 



```
#import "AppDelegate.h"
#import <MagicalRecord/MagicalRecord.h>

@interface AppDelegate ()
@end

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [MagicalRecord setupCoreDataStackWithStoreNamed:@"demo.sqlite"];
    return YES;
}

- (void)applicationWillTerminate:(UIApplication *)application {
    [MagicalRecord cleanUp];
}
@end
```


3.New --> File --> Data Model


![./figures/20171226162150313](./figures/20171226162150313)
  3.选中Person.xcdatamodeld ，Editor --> Create NSManagedObject Subclass 


![./figures/20171226162338462](./figures/20171226162338462)
 4.增删改查demo



```
#import "ViewController.h"
#import <MagicalRecord/MagicalRecord.h>
#import "Person+CoreDataClass.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
}

-(IBAction)insert{
    Person *person = [Person MR_createEntity];
    person.name = [NSString stringWithFormat:@"%@%d",@"张三",arc4random()%100];
    person.age = 25;
    person.sex = 1;
    [[NSManagedObjectContext MR_defaultContext]MR_saveToPersistentStoreAndWait];
}
// 查询记录
- (IBAction)findData {
    // 查找数据库中的所有数据
    NSArray *persons = [Person MR_findAll];
    for (Person *person in persons) {
        NSLog(@"person: %@ , %d , %d",person.name,person.age,person.sex);
    }
}

// 更新记录
- (IBAction)updateData {
    NSArray *personArr = [Person MR_findByAttribute:@"age" withValue:    [NSNumber numberWithInt:25]];
    NSEnumerator *keyEnumerator;
    keyEnumerator = [personArr objectEnumerator];
    Person *person;
    while (person = [keyEnumerator nextObject]) {
        person.name = @"李";
    }

    [[NSManagedObjectContext MR_defaultContext] MR_saveToPersistentStoreAndWait];
}

// 删除记录
- (IBAction)deleteData {
    NSArray *personArr = [Person MR_findByAttribute:@"age" withValue:[NSNumber numberWithInt:25]];
    for (Person *person in personArr) {
        [person MR_deleteEntity];
    }
    
    [[NSManagedObjectContext MR_defaultContext] MR_saveToPersistentStoreAndWait];
}

@end
```




  

 

 

 

