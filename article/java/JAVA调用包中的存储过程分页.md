# Java 调用包中的存储过程（分页）

`转载` `2010-12-05 16:19:00`

这个分页的存储过程是转自互联网：

[http://kingmxj.javaeye.com/blog/438267](http://kingmxj.javaeye.com/blog/438267)

```sql
create or replace package package_page as
  type cursor_page is ref cursor;
  Procedure proc_page(
             p_tablename varchar2,  --表名emp e
             p_tablecolumn varchar2,             --查询列e.id,e.ename,e.job
             p_order varchar2,           --排序e.ename desc
             p_pagesize Number,     --每页大小
             p_curpage Number,       --当前页
             p_where varchar2,         --查询条件e.ename like '%S%'
             p_rowcount out Number,             --总条数,输出参数
             p_pagecount out number,            --总页数
             p_cursor out cursor_page);        --结果集
end package_page;
/

CREATE OR REPLACE Package Body package_page
Is
       --存储过程
      Procedure proc_page(
             p_tablename varchar2,  --表名emp e
             p_tablecolumn varchar2,             --查询列e.id,e.ename,e.job
             p_order varchar2,           --排序e.ename desc
             p_pagesize Number,     --每页大小
             p_curpage Number,       --当前页
             p_where varchar2,         --查询条件e.ename like '%S%'
             p_rowcount out Number,             --总条数,输出参数
             p_pagecount out number,            --总页数
             p_cursor out cursor_page          --结果集
      )
      is
            v_count_sql varchar2(2000);
            v_select_sql varchar2(2000);
      begin
            --查询总条数
            v_count_sql:='select count(*) from '||p_tablename;
            --连接查询条件(''也属于is null)
            if p_where is not null  then
               v_count_sql:=v_count_sql||' where '||p_where;
            end if;
            --执行查询,查询总条数
            execute immediate v_count_sql into p_rowcount;

            --dbms_output.put_line('查询总条数SQL=>'||v_count_sql);
            --dbms_output.put_line('查询总条数Count='||p_rowcount);

             --得到总页数
             if mod(p_rowcount,p_pagesize)=0 then
  p_pagecount:=p_rowcount/p_pagesize;
             else
  p_pagecount:=p_rowcount/p_pagesize+1;
             end if;

            --如果查询记录大于0则查询结果集
            if p_rowcount>0 and p_curpage>=1 and p_curpage<=p_pagecount then

               --查询所有(只有一页)
               if p_rowcount<=p_pagesize then
    v_select_sql:='select '||p_tablecolumn||' from '||p_tablename;
    if p_where is not null then
       v_select_sql:=v_select_sql||' where '||p_where;
    end if;
    if p_order is not null then
        v_select_sql:=v_select_sql||' order by '||p_order;
    end if;
               elsif p_curpage=1 then  --查询第一页
    v_select_sql:='select '||p_tablecolumn||' from '||p_tablename;
    if p_where is not null then
       v_select_sql:=v_select_sql||' where '||p_where||' and rownum<='||p_pagesize;
    else
       v_select_sql:=v_select_sql||' where rownum<='||p_pagesize;
    end if;
    if p_order is not null then
        v_select_sql:=v_select_sql||' order by '||p_order;
    end if;
               else      --查询指定页
    v_select_sql:='select * from (select '|| p_tablename || '.' || p_tablecolumn ||',rownum row_num from '|| p_tablename;
    if p_where is not null then
       v_select_sql:=v_select_sql||' where '||p_where;
    end if;
    if p_order is not null then
        v_select_sql:=v_select_sql||' order by '||p_order;
    end if;
    v_select_sql:=v_select_sql||') where row_num>'||((p_curpage-1)*p_pagesize)||' and row_num<='||(p_curpage*p_pagesize);
               end if;
               --执行查询
               --dbms_output.put_line('查询语句=>'||v_select_sql);
               open p_cursor for v_select_sql;
            else
               --dbms_output.put_line('查询语句=>'||'select * from '||p_tablename||' where 1!=1');
               open p_cursor for 'select * from '||p_tablename||' where 1!=1';
            end if;

      end proc_page;
end package_page;
/
```


```java
import com.cl.dao.bean.McBean;
import com.cl.dao.bean.PageMcBean;
import com.cl.dao.db.MyDataSource;
import com.cl.dao.inf.McDao;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import oracle.jdbc.driver.OracleTypes;


public PageMcBean searchMc(String tableName, String orderBy, int oneCount, int nowPage, String constraint) { 
    PageMcBean pageMcBean = new PageMcBean(); 
    Connection conn = MyDataSource.getInstance().getConnection(); 
    CallableStatement cstmt = null; ResultSet rs = null; 
    try { 
        cstmt = conn .prepareCall("{call package_page.proc_page(?,?,?,?,?,?,?,?,?)}"); 
        cstmt.setString(1, tableName); cstmt.setString(2, "*"); 
        cstmt.setString(3, orderBy); 
        cstmt.setInt(4, oneCount); cstmt.setInt(5, nowPage); 
        cstmt.setString(6, constraint); 
        cstmt.registerOutParameter(7, OracleTypes.INTEGER); 
        cstmt.registerOutParameter(8, OracleTypes.INTEGER); 
        cstmt.registerOutParameter(9, OracleTypes.CURSOR); 
        cstmt.execute(); int rowCount = cstmt.getInt(7); 
        int pageCount = cstmt.getInt(8); rs = (ResultSet) 
        cstmt.getObject(9); 
        int cols = rs.getMetaData().getColumnCount(); 
        List<McBean> list = new ArrayList<McBean>(); 
        while (rs.next()) { 
            int nid = rs.getInt("nid"); 
            String sname = rs.getString("sname"); 
            String sdescription = rs.getString("sdescription"); // 商品描述 
            double nprice = rs.getDouble("nprice"); 
            String simg = rs.getString("simg"); 
            String smctag = rs.getString("smctag"); // 是否缺贷 
            Date dcdate = new Date(rs.getDate("dcdate").getTime()); // 添加时间 
            int nmaxid = rs.getInt("nmaxid"); 
            int nminid = rs.getInt("nminid"); 
            McBean mcBean = new McBean(); 
            mcBean.setNid(nid); 
            mcBean.setSname(sname); 
            mcBean.setSdescription(sdescription); 
            mcBean.setNprice(nprice); 
            mcBean.setSimg(simg); 
            mcBean.setSmctag(smctag); 
            mcBean.setDcdate(dcdate); 
            mcBean.setNmaxid(nmaxid); 
            mcBean.setNminid(nminid); 
            list.add(mcBean); 
        } 
        pageMcBean.setList(list); 
        pageMcBean.setPageCount(pageCount); 
        pageMcBean.setRowCount(rowCount); 
        return pageMcBean; 
    } catch (SQLException e) { 
        e.printStackTrace(); 
    } finally { 
        if (rs != null) { 
            try { rs.close(); 
            } catch (SQLException e) { 
                e.printStackTrace(); 
            } 
        } 
        if (cstmt != null) { 
            try { 
                cstmt.close(); 
            } catch (SQLException e) { 
                e.printStackTrace(); 
            } 
        }
        if (conn != null) { 
            try { 
                conn.close(); 
            } catch (SQLException e) { 
                e.printStackTrace(); 
            } 
        } 
        return null; 
    }
}

public static void main(String[] args) { 
    PageMcBean pageMcBean = new McDaoImpl().searchMc("t_mc", "nid asc", 5, 3, ""); 
    List<McBean> list = pageMcBean.getList(); 
    for(McBean bean : list){ 
        System.out.println(bean); 
    } 
    System.out.println(pageMcBean.getPageCount()); 
    System.out.println(pageMcBean.getRowCount()); 
}
```

这里需要用到ojdbc14.jar包中的类： oracle.jdbc.driver.OracleTypes;

存储过程可以通用，显示数据可以根据自己需要定义对应的Bean
