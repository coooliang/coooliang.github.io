# YYCache获取所有数据

`原创` `2023-07-31 16:12:21`
 

YYKVStorage.h

 ```
- (NSArray *)getAllItems;
 ```

YYKVStorage.m

```

- (NSMutableArray *)_dbGetItems {
    NSString *sql = @"select key, filename, size, inline_data, modification_time, last_access_time, extended_data from manifest;";
    sqlite3_stmt *stmt = [self _dbPrepareStmt:sql];
    if (!stmt) return nil;
    NSMutableArray *items = [NSMutableArray new];
    do {
        int result = sqlite3_step(stmt);
        if (result == SQLITE_ROW) {
            YYKVStorageItem *item = [self _dbGetItemFromStmt:stmt excludeInlineData:NO];
            [items addObject:item];
        } else if (result == SQLITE_DONE) {
            break;
        } else {
            if (_errorLogsEnabled) NSLog(@"%s line:%d sqlite query error (%d): %s", __FUNCTION__, __LINE__, result, sqlite3_errmsg(_db));
            items = nil;
            break;
        }
    } while (1);
    return items;
}

- (NSArray *)getAllItems {
    return [self _dbGetItems];
}
```

YYDiskCache.h

```
-(NSDictionary *)getAllObjects;
```

YYDiskCache.m

```
-(NSDictionary *)getAllObjects {
    Lock();
    NSArray *arr = [_kv getAllItems];
    Unlock();
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithCapacity:arr.count];
    for (YYKVStorageItem *item in arr) {
        @try {
            id object = [NSKeyedUnarchiver unarchiveObjectWithData:item.value];
            if(object){
                [dict setObject:object forKey:item.key];
            }
        }@catch (NSException *exception) {
            // nothing to do...
        }
    }
    return dict;
}
```

使用：

```
YYCache *yyCache = [YYCache cacheWithName:@"YYCache_Data"];
    
NSString *cacheFolder = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
NSString *path = [cacheFolder stringByAppendingPathComponent:@"YYCache_Data_New"];
YYCache *newCache = [YYCache cacheWithPath:path];

if(yyCache.diskCache.totalCount > 0){
    NSDictionary *objs = [yyCache.diskCache getAllObjects];
    [objs enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        [newCache setObject:obj forKey:key];
    }];
}

NSDictionary *dic = [[NSUserDefaults standardUserDefaults] dictionaryRepresentation];
[dic enumerateKeysAndObjectsUsingBlock:^(id _Nonnull key, id _Nonnull obj, BOOL *_Nonnull stop) {
    [newCache setObject:obj forKey:key];
//            [[NSUserDefaults standardUserDefaults]removeObjectForKey:key];
//            [[NSUserDefaults standardUserDefaults]synchronize];
}];
    

NSDictionary *objs = [newCache.diskCache getAllObjects];
NSLog(@"newCache objs = %@",objs);
```