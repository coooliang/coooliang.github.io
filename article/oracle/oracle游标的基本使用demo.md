# Oracle游标的基本使用demo

`原创` `2013-11-25 10:34:43`

```sql
create or replace procedure p_rbt_ihone_member is
  v_msisdn         number; --ID
  v_family_account varchar2(20); --账号
  v_count          number := 0; --计数器
  v_ihome_id       number := 0;
  v_info_count     number := 0;
  cursor c_member is
    select t.msisdn, t.family_account from t_rbt_family_member_sync t; --信息的游标
begin
  open c_member; --打开游标
  loop
    v_count := v_count + 1;
    fetch c_member
      into v_msisdn, v_family_account; --拿到当前成员信息的ID和账号
    exit when c_member%notfound; --假如没有检索到数据
    select count(1) into v_info_count from t_rbt_ihome_info tt where tt.family_account = v_family_account;
    if v_info_count > 0 then
        select tt.id into v_ihome_id from t_rbt_ihome_info tt where tt.family_account = v_family_account;
        insert into t_rbt_ihome_member
          (id,
           phone_number,
           is_tone_member,
           create_time,
           ihome_id,
           status,
           name,
           set_type,
           family_account)
        values
          (seq_ihome_member.nextval,v_msisdn,0,sysdate,v_ihome_id,0,'',1,v_family_account);
    else
          insert into t_rbt_ihome_member
            (id,
             phone_number,
             is_tone_member,
             create_time,
             status,
             name,
             set_type,
             family_account)
          values
            (seq_ihome_member.nextval,v_msisdn,0,sysdate,0,'',1,v_family_account);
    end if;
    if (mod(v_count, 30000) = 0) then
      commit;
      --dbms_output.put_line('已更新的家庭数量：' || v_count);
    end if;
  end loop;
  close c_member; --关闭游标
  dbms_output.put_line('已更新的家庭数量：' || v_count);
  commit;
end;
```
