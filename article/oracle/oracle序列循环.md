# Oracle序列循环

`原创` `2011-10-12 10:43:21`

```sql
序列到最大值后从最小值开始
create   sequence   seq_1 
minvalue   1 
maxvalue   3 
start   with   1 
increment   by   1 
cycle; 
```

当序列到达最大值时，会变为最小值。 

