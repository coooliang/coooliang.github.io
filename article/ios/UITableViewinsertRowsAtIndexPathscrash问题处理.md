# UITableView insertRowsAtIndexPaths crash 问题处理

`原创` `2018-09-14 15:58:15`

UITableView insertRowsAtIndexPaths 后调用scrollToRowAtIndexPath出现闪退问题处理：

```objectivec
#define WEAKSELF typeof(self) __weak weakSelf = self;

- (void)exMainQueue:(void (^)(void))queue {
    dispatch_async(dispatch_get_main_queue(), queue);
}
-(void)sendMessageToList:(CellModel *)cellModel{
    WEAKSELF
    [self exMainQueue:^{
        [weakSelf.messageArray addObject:cellModel];
        NSIndexPath* insertion = [NSIndexPath indexPathForRow:weakSelf.messageArray.count - 1 inSection:0];

        [CATransaction begin];
        [CATransaction setCompletionBlock:^{
            [weakSelf scrollToLastMessage];
        }];

        [weakSelf.tableView beginUpdates];
        [weakSelf.tableView insertRowsAtIndexPaths:@[insertion] withRowAnimation:UITableViewRowAnimationNone];
        [weakSelf.tableView endUpdates];

        [CATransaction commit];
    }];
}

/**
 https://stackoverflow.com/questions/35291117/scrolltorowatindexpathatscrollposition-causing-table-view-to-jump
 */
-(void)scrollToLastMessage{
    WEAKSELF
    NSInteger bottomRow = [self.tableView numberOfRowsInSection:0]-1;
    NSIndexPath *bottomMessageIndex = [NSIndexPath indexPathForRow:bottomRow inSection:0];
    if(self.messageArray > 0){
        [CATransaction begin];
        [CATransaction setCompletionBlock:^{
            [weakSelf.tableView scrollToRowAtIndexPath:bottomMessageIndex atScrollPosition:UITableViewScrollPositionBottom animated:YES];
        }];
        float contentOffset = self.tableView.contentOffset.y;
        CGPoint newContentOffset = CGPointMake(0,contentOffset + 1);
        [self.tableView setContentOffset:newContentOffset animated:YES];
        [CATransaction commit];
    }
}
-(void)scrollToBottomAnimated:(BOOL)animate{
    if(self.messageArray.count > 0){
        [self.tableView scrollToRowAtIndexPath:[NSIndexPath indexPathForRow:self.messageArray.count - 1 inSection:0] atScrollPosition:UITableViewScrollPositionBottom animated:animate];
    }
}
```

说明：  
1）insertRowsAtIndexPaths需要放在主线程中，且使用beginUpdates和endUpdates  

2）在block中的使用self时需要weak，以防止循环引用，当block中再次使用block时可以使用strongSelf

```objectivec
__strong __typeof(weakSelf) strongSelf = weakSelf;
```


