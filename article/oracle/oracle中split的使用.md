# Oracle中split的使用

`原创` `2014-04-26 11:33:50`

1. 创建自己的类型 VARCHAR2ARRAY

```sql
CREATE OR REPLACE TYPE "VARCHAR2ARRAY" as table of varchar2(300);
```

2. 创建函数SPLITSTR

```sql
CREATE OR REPLACE FUNCTION "SPLITSTR" (p_str       IN VARCHAR2,
                                    p_delimiter IN VARCHAR2)
  RETURN varchar2array IS
  /**
   *  对字符串进行相应的分割  p_str：字符串  p_delimiter：分割的字符
   **/
  j        INT := 0;
  i        INT := 1;
  len      INT := 0;
  len1     INT := 0;
  str      VARCHAR2(4000);
  my_split varchar2array := varchar2array();
BEGIN
  len  := LENGTH(p_str);
  len1 := LENGTH(p_delimiter);
  WHILE j < len LOOP
    j := INSTR(p_str, p_delimiter, i);
    IF j = 0 THEN
      j   := len;
      str := SUBSTR(p_str, i);
      my_split.EXTEND;
      my_split(my_split.COUNT) := str;
      IF i >= len THEN
        EXIT;
      END IF;
    ELSE
      str := SUBSTR(p_str, i, j - i);
      i   := j + len1;
      my_split.EXTEND;
      my_split(my_split.COUNT) := str;
    END IF;
  END LOOP;
  RETURN my_split;
END SPLITSTR;
```

1. 如何使用，一般在存储过程中使用
  
```sql
declare
mysplit varchar2array;
begin
select SPLITSTR('a,b,44,',',') into mysplit from dual;--用逗号拆分，
dbms_output.put_line(mysplit(1));
dbms_output.put_line(mysplit(2));--位置2的结果为b
dbms_output.put_line(to_number(mysplit(3)));
end;
```

打印结果： 

a

b

44