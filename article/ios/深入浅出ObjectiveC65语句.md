# 6.5语句

`原创` `2014-01-31 12:41:38`

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        //if,else if,for,goto,while,do while,switch
        int i = 1;//非0为true
        
        goto here;//goto直接跳到标签处
        if(0){
            NSLog(@"000");
        }
        if(i){
            NSLog(@"i=%d",i);
        }else if(i){
            NSLog(@"0为false");
        }
        
    here:
        NSLog(@"here!!!");
        
        while(i){
            NSLog(@"while...");
            i = 0;
        }
        do{
            NSLog(@"do while...");
        }while(0);
        
        switch (i) {
            case 0:
                NSLog(@"switch 0");
                break;
            case 1:
                NSLog(@"switch 1");
                break;
            default:
                NSLog(@"default...");
                break;
        }
    }
    return 0;
}
```
