# 8.3字典(NSMutableDictionary)

`原创` `2014-02-03 17:18:31`

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        NSDictionary *aDict = [NSDictionary dictionaryWithObject:@"value1" forKey:@"key1"];
        
        NSDictionary *bDict = [[NSDictionary alloc]initWithObjects:[NSArray arrayWithObjects:@"coooliang",@"20",@"fz", nil] forKeys:[NSArray arrayWithObjects:@"name",@"age",@"city", nil]];

        NSLog(@"aDict = %@",aDict);
        NSLog(@"bDict = %@",bDict);
        
        
        //此处使用objectForKey和valueForKey结果相同
        //键名不为NSString的时候，只能使用objectForKey,valueForKey键值只能是NSString
        id name = [bDict objectForKey:@"name"];
        if([name isKindOfClass:[NSString class]]){
            NSLog(@"objectForKey name = %@",name);
        }
        id age = [bDict valueForKey:@"age"];
        if([age isKindOfClass:[NSString class]]){
            NSLog(@"valueForKey age = %@",age);
        }
        
        //遍历
        NSEnumerator *aEnum = [bDict objectEnumerator];
        id oneObj = nil;
        
        while (oneObj = [aEnum nextObject]) {
            if([oneObj isKindOfClass:[NSString class]]){
                NSLog(@"%@",oneObj);
            }
        }
        
        //访问所有键名和值以及配合NSDictionary
        NSLog(@"allkey = %@",[bDict allKeys]);
        NSLog(@"allValue = %@",[bDict allValues]);
        
        //NSError *error = nil;
        //NSDictionary *fileDict = [[NSFileManager alloc]attributesOfFileSystemForPath:@"path" error:&error];
        
        //可变数组
        NSMutableDictionary *maDict = [NSMutableDictionary dictionaryWithCapacity:0];
        NSMutableDictionary *mbDict = [[NSMutableDictionary alloc]initWithObjects:[NSArray arrayWithObjects:@"a",@"b", nil] forKeys:[NSArray arrayWithObjects:@"va",@"vb", nil]];
        
        [maDict addEntriesFromDictionary:mbDict];
        [maDict setObject:@"c" forKey:@"vc"];
        NSLog(@"maDict = %@",maDict);

        [maDict removeAllObjects];
        NSLog(@"remove a %@",maDict);
        NSLog(@"remove after b %@",mbDict);
    }
    return 0;
}
```
