# 8.2数组(NSArray)和集合(NSSet)

`原创` `2014-02-03 16:38:48`

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        //1.多个对象，最后需要使用nil
        NSArray *array = [NSArray arrayWithObjects:@"Peter",@"James",@"Li", nil];
        NSSet *set = [NSSet setWithObjects:@"Peter",@"James",@"Li", nil];
        NSLog(@"array = %@",array);
        NSLog(@"set = %@",set);
        //2.单个对象，最后不需要nil
        NSArray *singleArray = [NSArray arrayWithObject:@"coooliang"];
        NSSet *singleSet = [NSSet setWithObject:@"setObject1"];
        NSLog(@"%@",singleArray);
        NSLog(@"%@",singleSet);
        
        //3.获得元素
        NSUInteger index = [singleArray indexOfObject:@"coooliang"];
        NSLog(@"coooliang in index = %lu",(unsigned long)index);
        NSLog(@"index 0 object is %@",[singleArray objectAtIndex:0]);
        
        //4.数组的遍历
        for (int i=0; i<array.count; i++) {
            id temp = [array objectAtIndex:i];
            NSLog(@"array %@ %@",temp,[temp isKindOfClass:[NSString class]]== YES?@"YES":@"NO");
        }
        
        for(id obj in array){//in语法
            NSLog(@"%@ %@",obj,[obj isKindOfClass:[NSString class]] == YES?@"yes":@"no");
        }
        
        for(id obj in set){
            NSLog(@"set obj is: %@",obj);
        }
        //5.枚举遍历
        NSEnumerator *nse = [array objectEnumerator];
        id anObj = nil;
        while ((anObj = [nse nextObject])) {
            if([anObj isKindOfClass:[NSString class]]){
                NSLog(@"anObj = %@",anObj);
            }
        }
        
        //6.block方法
        [array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            
            if(idx == array.count - 1){
                *stop = YES;
            }
            if([obj isKindOfClass:[NSString class]]){
                NSLog(@"enumerateObjectsUsingBlock obj = %@",obj);
            }
        }];
        
        
        //7.可变数组和可变集合的使用
        NSMutableArray *marray = [NSMutableArray arrayWithCapacity:0];
        NSString * mxw = @"毛血旺/12";
        [marray addObject:mxw];
        [marray addObject:@"白菜/11"];
        [marray insertObject:@"螃蟹/30" atIndex:1];//插入
        [marray removeObject:@"白菜/11"];//移除
        
        for(NSString *str in marray){
            NSLog(@"for : %@",str);
        }
        NSLog(@"%@",marray);//
        
        [marray replaceObjectAtIndex:1 withObject:@"potato"];//替换
        NSLog(@"%@",marray);
        
        //8.创建可变的set
        //合并unionSet
        NSSet *bset = [NSSet setWithObjects:@"2",@"3",@"4", nil];
        NSMutableSet *aset = [NSMutableSet setWithCapacity:0];
        [aset addObject:@"1"];
        [aset addObject:@"2"];
        [aset addObject:@"3"];
        [aset unionSet:bset];
        NSLog(@"aset = %@",aset);//3 1 4 2 去除重复的内容 调用的是isEqualToString,对象比较需要重写isEqual和hash方法。
        NSLog(@"bset = %@",bset);//2 3 4
        
        //减去，minusSet
        //根据作为参数的集合中的所有无素，将集合中的相应元素全部删除。
        [aset minusSet:bset];
        NSLog(@"aset = %@",aset);//1
        NSLog(@"bset = %@",bset);//2 3 4
        
        //交集，interactSet
        //根据作为参数的集合中的所有元素，将本集合中没有被包含在参数集合中的元素，全部删除。
        [aset addObject:@"2"];
        [aset addObject:@"3"];
        [aset intersectSet:bset];
        NSLog(@"aset = %@",aset);//3 2
        NSLog(@"bset = %@",bset);//2 3 4
        
    }
    return 0;
}
```
