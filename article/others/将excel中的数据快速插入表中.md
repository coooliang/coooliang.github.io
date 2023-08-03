

当需要将EXCEL的数据快速插入表中时，需要将EXCEL保存为CSV格式的文件，如果你用记事本打开会看到各行用逗号分格开来了。这时用以下脚本可以将CSV中的字段和表中的数据一一对应并且插入。

 

1.创建 a.cmd文件内容如下： 

```
sqlldr chenl/chenl@oracle control=d:\insert\a.ctl errors=5000000 log=d:\insert\a.log```





PS: 

chenl/chenl@oracle 为数据库连接地址; d:\insert\a.ctl为ctl文件路径; errors=5000000表示记录错误数据条数；log=d:\insert\a.log表示日志记录地址。

 

2.创建a.ctl内容如下： 

```
load data
infile "d:\insert\0411.csv"
TRUNCATE
into table sm_send_tmp append
FIELDS TERMINATED BY ","
trailing nullcols
(
  ID,
  PHONE_NUMBER,
  STATUS,
  REMARK,
  TIMES
)```


****



PS：

infile "d:\insert\0411.csv" 表示引入的csv文件路径；

(    ID,   PHONE_NUMBER,   STATUS,   REMARK,   TIMES )

内容表示数据库中的字段顺序，顺序与csv中顺序一致。

****** **

3.读取的0411.csv文件数据格式例子如下：


![./figures/1368744163_2626.jpg](./figures/1368744163_2626.jpg)


 

4.接着执行cmd文件就可以将数据插入表中，如有插入失败的数据，会自动记录在a.log日志文件中。

 

