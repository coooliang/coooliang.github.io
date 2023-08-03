

这两年都是用oracle，mysql虽然简单不过一些常用语句记不住。当然也可以使用navicat工具。这里做个小笔记。之后如果有用到一点一点的添加进来。

 

show databases; use 数据库名; show tables; 主键： ALTER TABLE `testtable` ADD PRIMARY KEY (`id`); ALTER TABLE `testtable` DROP PRIMARY KEY;  alert: ALTER TABLE `testtable` MODIFY COLUMN `id`  integer(11) NOT NULL DEFAULT 0 FIRST ;  CREATE TABLE `NewTable` ( `id`  integer(10) NOT NULL COMMENT '主键' , `username`  varchar(20) NOT NULL COMMENT '用户名' , `password`  varchar(32) NOT NULL COMMENT '密码' , PRIMARY KEY (`id`) ) ; 

