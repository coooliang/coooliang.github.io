# GCD中队列与任务嵌套的组合测试
`原创` `2019-04-08 15:38:33 `

参考以下内容：

[GCD容易让人迷惑的几个小问题](https://www.jianshu.com/p/ff444d664e51)

[GCD中队列与任务嵌套的组合情况分析](https://www.jianshu.com/p/de406582131e)

[线程安全Array](https://github.com/dearkong/NSKSafeMutableArrayTest)

```objectivec
dispatch_async、dispatch_sync、dispatch_barrier_async、dispatch_barrier_sync

PS: 队列分为串行队列和并形队列，线程分为同步和异步
```


## 1.串行队列(SERIAL)

### 1) 异步嵌套异步

```objectivec
-(void)serialAsyncAsync{
    dispatch_queue_t serialQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_SERIAL);
    dispatch_async(serialQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_async(serialQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：

```bash
2019-04-08 11:35:46.614228+0800 GCDDemo[4091:214368] outside -- <NSThread: 0x6000002e2080>{number = 3, name = (null)}
2019-04-08 11:35:46.614478+0800 GCDDemo[4091:214368] outside -- 0
2019-04-08 11:35:46.614588+0800 GCDDemo[4091:214368] outside -- 1
...
2019-04-08 11:35:46.615971+0800 GCDDemo[4091:214368] outside -- 9
2019-04-08 11:35:46.616262+0800 GCDDemo[4091:214368] outside end -- <NSThread: 0x6000002e2080>{number = 3, name = (null)}
2019-04-08 11:35:46.616494+0800 GCDDemo[4091:214368] inside -- <NSThread: 0x6000002e2080>{number = 3, name = (null)}
2019-04-08 11:35:46.616695+0800 GCDDemo[4091:214368] inside -- 0
2019-04-08 11:35:46.617105+0800 GCDDemo[4091:214368] inside -- 1
...
2019-04-08 11:35:46.621248+0800 GCDDemo[4091:214368] inside -- 9
```


### 2) 异步嵌套同步（ERROR）


```objectivec
-(void)serialAsyncSync{
    dispatch_queue_t serialQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_SERIAL);
    dispatch_async(serialQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_sync(serialQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：错误

### 3) 同步嵌套异步


```objectivec
-(void)serialSyncAsync{
    dispatch_queue_t serialQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_SERIAL);
    dispatch_sync(serialQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_async(serialQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：

```bash
2019-04-08 11:38:28.763058+0800 GCDDemo[4142:222924] outside -- <NSThread: 0x600003262d40>{number = 1, name = main}
2019-04-08 11:38:28.763196+0800 GCDDemo[4142:222924] outside -- 0
2019-04-08 11:38:28.763270+0800 GCDDemo[4142:222924] outside -- 1
...
2019-04-08 11:38:28.763843+0800 GCDDemo[4142:222924] outside -- 9
2019-04-08 11:38:28.763984+0800 GCDDemo[4142:222924] outside end -- <NSThread: 0x600003262d40>{number = 1, name = main}
2019-04-08 11:38:28.764156+0800 GCDDemo[4142:223088] inside -- <NSThread: 0x600003206280>{number = 3, name = (null)}
2019-04-08 11:38:28.764441+0800 GCDDemo[4142:223088] inside -- 0
2019-04-08 11:38:28.764633+0800 GCDDemo[4142:223088] inside -- 1
...
2019-04-08 11:38:28.769840+0800 GCDDemo[4142:223088] inside -- 9
```


### 4) 同步嵌套同步


```objectivec
-(void)serialSyncSync{
    dispatch_queue_t serialQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_SERIAL);
    dispatch_sync(serialQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_sync(serialQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：错误

### 结论：


```bash
在同一个队列中，串行队列总是先执行完外部，再执行内部；且内部不能为同步队列。
```


## 2.并行队列(CONCURRENT)


### 1) 异步嵌套异步


```objectivec
-(void)currentAsyncAsync{
    dispatch_queue_t currentQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_CONCURRENT);
    dispatch_async(currentQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_async(currentQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：不可预测，无序

### 2) 异步嵌套同步


```objectivec
-(void)currentAsyncSync{
    dispatch_queue_t currentQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_CONCURRENT);
    dispatch_async(currentQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_sync(currentQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            
            dispatch_sync(currentQueue, ^{
                NSLog(@"inside inside");
                for (int i=0; i<10; i++) {
                    NSLog(@"inside inside -- %@",@(i));
                }
            });
            
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：先 inside 再 outside

```bash
2019-04-08 15:22:32.998533+0800 GCDDemo[13049:500501] outside -- <NSThread: 0x60000173fcc0>{number = 3, name = (null)}
2019-04-08 15:22:32.998799+0800 GCDDemo[13049:500501] inside -- <NSThread: 0x60000173fcc0>{number = 3, name = (null)}
2019-04-08 15:22:32.998881+0800 GCDDemo[13049:500501] inside inside
2019-04-08 15:22:32.998989+0800 GCDDemo[13049:500501] inside inside -- 0
2019-04-08 15:22:32.999955+0800 GCDDemo[13049:500501] inside inside -- 1
...
2019-04-08 15:22:33.001734+0800 GCDDemo[13049:500501] inside inside -- 9
2019-04-08 15:22:33.001803+0800 GCDDemo[13049:500501] inside -- 0
2019-04-08 15:22:33.002653+0800 GCDDemo[13049:500501] inside -- 1
...
2019-04-08 15:22:33.008001+0800 GCDDemo[13049:500501] inside -- 9
2019-04-08 15:22:33.008077+0800 GCDDemo[13049:500501] outside -- 0
2019-04-08 15:22:33.008151+0800 GCDDemo[13049:500501] outside -- 1
...
2019-04-08 15:22:33.009867+0800 GCDDemo[13049:500501] outside -- 9
2019-04-08 15:22:33.010082+0800 GCDDemo[13049:500501] outside end -- <NSThread: 0x60000173fcc0>{number = 3, name = (null)}
```


### 3) 同步嵌套异步


```objectivec
-(void)currentSyncAsync{
    dispatch_queue_t currentQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_CONCURRENT);
    dispatch_sync(currentQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_async(currentQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：不可预测，无序

### 4) 同步嵌套同步


```objectivec
-(void)currentSyncSync{
    dispatch_queue_t currentQueue = dispatch_queue_create("com.chenl.gcddemo", DISPATCH_QUEUE_CONCURRENT);
    dispatch_sync(currentQueue, ^{
        NSLog(@"outside -- %@",[NSThread currentThread]);
        dispatch_sync(currentQueue, ^{
            NSLog(@"inside -- %@",[NSThread currentThread]);
            for (int i=0; i<10; i++) {
                NSLog(@"inside -- %@",@(i));
            }
        });
        
        for (int i=0; i<10; i++) {
            NSLog(@"outside -- %@",@(i));
        }
        NSLog(@"outside end -- %@",[NSThread currentThread]);
    });
}
```


结果：先 inside 再 outside

```bash
2019-04-08 15:24:15.335330+0800 GCDDemo[13082:506871] outside -- <NSThread: 0x6000003a2f80>{number = 1, name = main}
2019-04-08 15:24:15.335629+0800 GCDDemo[13082:506871] inside -- <NSThread: 0x6000003a2f80>{number = 1, name = main}
2019-04-08 15:24:15.335725+0800 GCDDemo[13082:506871] inside -- 0
2019-04-08 15:24:15.335796+0800 GCDDemo[13082:506871] inside -- 1
...
2019-04-08 15:24:15.336425+0800 GCDDemo[13082:506871] inside -- 9
2019-04-08 15:24:15.336583+0800 GCDDemo[13082:506871] outside -- 0
2019-04-08 15:24:15.336770+0800 GCDDemo[13082:506871] outside -- 1
...
2019-04-08 15:24:15.343693+0800 GCDDemo[13082:506871] outside -- 9
2019-04-08 15:24:15.343779+0800 GCDDemo[13082:506871] outside end -- <NSThread: 0x6000003a2f80>{number = 1, name = main}
```


### 结论：


```bash
在同一队列中，并行队列先执行内部的同步任务，执行完再执行外部的任务。
```

## 3.dispatch_barrier_async 和 dispatch_barrier_sync

barrier的作用是**承上启下**，先执行完barrier之前的任务再执行barrier之后的任务。
