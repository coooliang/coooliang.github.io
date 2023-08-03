# Oracle存储过程基本结构的编写与plsql测试执行

`原创` `2012-05-29 10:43:28 `

```sql
create or replace procedure p_gift8_lottery(v_phone_number in varchar2,
                                            v_tone_id      in varchar2,
                                            v_tone_code      in varchar2,
                                            v_tone_name      in varchar2,
                                            v_tone_type    in number,
                                            v_num          out varchar2, --序列号
                                            v_iswin        out number, --是否中奖 0未中，1中奖
                                            v_gift         out number --几等奖。
                                            ) is
  v_this_month      varchar2(20); --本月时间
  v_black_count     number; --是否在黑名单中
  v_gift_rate1      number; --一等奖数量
  v_gift_rate2      number; --二等奖数量
  v_gift_rate3      number; --三等奖数量
  v_gift_rate4      number; --四等奖数量
  v_gift_rate5      number; --五等奖数量
  v_gift_rate4_dmax number; --四等奖每日上限数量
  v_gift_rate5_dmax number; --五等奖每日上限数量
  v_temp_count      number;
  v_temp_amount     number;
  v_temp_num        number;
  TYPE T_VARRAY IS VARRAY(2) OF NUMBER;
  TYPE T_VARRAY_VARRAY IS VARRAY(21) OF T_VARRAY;
  V_VAR T_VARRoracle存储过程基本结构的编写与plsql测试执行AY_VARRAY := T_VARRAY_VARRAY(T_VARRAY(1, 5),T_VARRAY(6, 10));--二维数组的使用
 
  errno             number; --异常编码
  errterm           varchar2(1000); --异常信息
begin
  --本月时间
  v_this_month := to_char(sysdate, 'yyyymm');

  v_gift_rate1      := 1;
  v_gift_rate2      := 3;
  v_gift_rate3      := 15;
  v_gift_rate4      := 60;
  v_gift_rate5      := 600;
  v_gift_rate4_dmax := 2; --4等奖每日限额
  v_gift_rate5_dmax := 20; --5等奖每日限额


--  raise_application_error('-20002', 'you can not change the data !');--可以主动抛出异常

 --为了控制中奖次数需要再建一个中奖信息统计表。

 --如果中奖，修改中奖记录表
  select ceil(dbms_random.value(0, 10000000)) ||
             ceil(dbms_random.value(0, 8)) || ceil(dbms_random.value(0, 8))
             || ceil(dbms_random.value(0, 8)) into v_random_num from dual;--未中奖随机码
  if v_gift = 1 then
    select t.one into v_temp_count from t_rbt_gift9_result t for update;
    if v_temp_count < v_gift_one then
      update t_rbt_gift9_result t set t.one = (t.one + 1) where t.id = 1;

      --1等奖随机码
      select ceil(dbms_random.value(0, 10000000)) || '999' into v_random_num from dual;
    else
      v_gift := 0;
    end if;
    insert into t_rbt_gift9_info (ID,phone_number,gift,create_time,random_num)
             values(seq_rbt_gift9_info.nextval,v_phone_number,v_gift,sysdate,v_random_num);
  elsif v_gift = 2 then
  ......
  end if;


 commit;
  exception
  --异常处理
  when others then
    errno       := sqlcode;
    errterm     := sqlerrm;

    begin
      rollback;
      insert into T_RBT_JOB_LOGS
      values
        (SEQ_JOB_LOG.Nextval,
         errno,
         errterm,
         'p_gift8_lottery',
         sysdate);
      v_gift := 0;--0等奖
      v_result:='100003';
      select ceil(dbms_random.value(0, 10000000)) ||
               ceil(dbms_random.value(0, 8)) || ceil(dbms_random.value(0, 8))
               || ceil(dbms_random.value(0, 8)) into v_random_num from dual;--未中奖随机码
      insert into t_rbt_gift9_info (ID,phone_number,gift,create_time,random_num)
               values(seq_rbt_gift9_info.nextval,v_phone_number,v_gift,sysdate,v_random_num);

     commit;
    end;
  end p_gift8_lottery;
```

```sql
declare  
 v_phone_number   varchar2(20);
 v_tone_id   varchar2(20);
 v_tone_code   varchar2(20);
 v_tone_name   varchar2(20);
 v_tone_type   number;
 v_num   varchar2(20);--序列号
 v_iswin   number;--是否中奖 0未中，1中奖
 v_gift   number;--几等奖。
 i   number:=0; 
begin
v_phone_number := '152800123123';
v_tone_id := '333';
v_tone_code:='421421';
v_tone_name:='aab';
v_tone_type :=3;
for   i   in   1..1000
loop
/*执行你的pro*/
p_gift8_lottery(v_phone_number,v_tone_id,v_tone_code,v_tone_name,v_tone_type,v_num,v_iswin,v_gift);
/*dbms_output.put_line('vnum: ' || v_num);
dbms_output.put_line('v_iswin: ' || v_iswin);
dbms_output.put_line('v_gift: ' || v_gift);
dbms_output.put_line('=============='|| i ||'============');*/
end loop;
end;
```




 


 


