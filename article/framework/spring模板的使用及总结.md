# Spring模板的使用及总结

`原创` `2011-03-15 14:31:00`

运行环境：使用了dbcp数据源：

我用的JAR包有：

commons-collections-3.1.jar   commons-dbcp.jar   commons-pool.jar  ojdbc14.jar(或class12.jar)

如果不知道哪里找JAR包的话 可以建一个普通的java工程，不是web工程哦！~

再右键-->myeclipse--add spring capabilities 引入spring就可以了

sql:

```sql
drop table t_user;
create table t_user
(
  userid   NUMBER not null,
  username VARCHAR2(100)
);

create sequence SEQ_T_USER
minvalue 1
maxvalue 999999999999999999999999999
start with 1
increment by 1
cache 20; 
```


jdbcTemplate:

```java
package com.coooliang.test;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import com.coooliang.bean.User;

/**
 * Spring模板(JdbcTemplater例子)
 * */
public class JdbcTemplateTest {
	public static void main(String[] args) throws Exception {
		Properties ps = new Properties();
		ps.setProperty("url", "jdbc:oracle:thin:@localhost:1521:oracle");
		ps.setProperty("username", "chenl");
		ps.setProperty("password", "chenl");
		ps.setProperty("driverClassName", "oracle.jdbc.driver.OracleDriver");
		DataSource ds = BasicDataSourceFactory.createDataSource(ps);

		JdbcTemplate jdbcTemplate = new JdbcTemplate(ds);

		/*************************************** test ***********************/

		// 1.查
		System.out.println(query1(jdbcTemplate));

		// 2.条件查
		System.out.println(query2(jdbcTemplate, 1));

		// 3.改
		update(jdbcTemplate, new User(1, "aaaaaa"));

		// 4.增
		User user = new User();
		user.setUsername("11hahaa");
		insert(jdbcTemplate, user);

		// 5.删
		user = new User();
		user.setUserid(2);
		del(jdbcTemplate, user);

	}

	/**
	 * 1.使用 JdbcTemplate <br>
	 * 查出所有
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> query1(JdbcTemplate jdbcTemplate) {
		String sql = "select * from t_user";
		List<User> list = (List<User>) jdbcTemplate.query(sql,
				new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 2.使用 JdbcTemplate<br>
	 * 条件查出所有查出所有
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> query2(JdbcTemplate jdbcTemplate, int userid) {
		String sql = "select * from t_user where userid=?";

		List<User> list = (List<User>) jdbcTemplate.query(sql,
				new Object[] { userid }, new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 3.使用 JdbcTemplate<br>
	 * 修改数据
	 * */
	public static void update(JdbcTemplate jdbcTemplate, final User user) {
		String sql = "update t_user set username=? where userid=?";

		jdbcTemplate.update(sql, new PreparedStatementSetter() {
			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setString(1, user.getUsername());
				ps.setInt(2, user.getUserid());
			}
		});
	}

	/**
	 * 4.使用 JdbcTemplate<br>
	 * 插入数据
	 * */
	public static void insert(JdbcTemplate jdbcTemplate, final User user) {
		String idSql = "select seq_t_user.nextval from dual";
		final int id = jdbcTemplate.queryForInt(idSql); // 用序列得到ID

		String sql = "insert into t_user(userid,username) values(?,?) ";
		jdbcTemplate.update(sql, new PreparedStatementSetter() {
			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, id);
				ps.setString(2, user.getUsername());
			}
		});
	}

	/**
	 * 4.使用 JdbcTemplate<br>
	 * 删除数据
	 * */
	public static void del(JdbcTemplate jdbcTemplate, final User user) {

		String sql = "delete from t_user where userid=?";
		jdbcTemplate.update(sql, new PreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, user.getUserid());
			}

		});
	}
}
```

NamedParameterJdbcTemplate:

```java
package com.coooliang.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.coooliang.bean.User;

/**
 * Spring (NamedParameterJdbcTemplate命名模板例子)
 * */
public class NamedJdbcTemplateTest {
	public static void main(String[] args) throws Exception {
		Properties ps = new Properties();
		ps.setProperty("url", "jdbc:oracle:thin:@localhost:1521:oracle");
		ps.setProperty("username", "chenl");
		ps.setProperty("password", "chenl");
		ps.setProperty("driverClassName", "oracle.jdbc.driver.OracleDriver");
		DataSource ds = BasicDataSourceFactory.createDataSource(ps);

		NamedParameterJdbcTemplate namedJdbcTemplate = new NamedParameterJdbcTemplate(
				ds);
		JdbcTemplate jdbcTemplate = new JdbcTemplate(ds);

		// 1.条件查
		System.out.println(query(namedJdbcTemplate, new User(3, "aa")));

		// 2.插入
		User user = new User();
		user.setUsername("xx2");
		insert(jdbcTemplate, namedJdbcTemplate, user);

		// 3.修改
		update(namedJdbcTemplate, new User(3, "abc"));

		// 4.删除
		del(namedJdbcTemplate, new User(3, "abc"));

	}

	/**
	 * 1.有条件查询 没有条件使用 jdbcTemplate.query(sql,new
	 * BeanPropertyRowMapper(User.class));<br>
	 * 有条件 用NamedParameterJdbcTemplate
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> query(
			NamedParameterJdbcTemplate namedJdbcTemplate, User user) {
		String sql = "select * from t_user where userid=:userid";
		Map map = new HashMap();
		map.put("userid", user.getUserid());
		List<User> list = namedJdbcTemplate.query(sql, map,
				new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 2.插入
	 * */
	public static void insert(JdbcTemplate jdbcTemplate,
			NamedParameterJdbcTemplate namedJdbcTemplate, User user) {
		String idSql = "select seq_t_user.nextval from dual";
		final int id = jdbcTemplate.queryForInt(idSql); // 用序列得到ID
		user.setUserid(id);
		String sql = "insert into t_user(userid,username)values(:userid,:username)";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}

	/**
	 * 3.修改
	 * */
	public static void update(NamedParameterJdbcTemplate namedJdbcTemplate,
			User user) {
		String sql = "update t_user set username=:username where userid=:userid";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}

	/**
	 * 4.删除
	 * */
	public static void del(NamedParameterJdbcTemplate namedJdbcTemplate,
			User user) {
		String sql = "delete from t_user where userid=:userid";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}
}
```

总结:

```java
package com.coooliang.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.coooliang.bean.User;

/**
 * 模板总结<br>
 * 总结jdbcTemplate和NamedParameterJdbcTemplate的选择<br>
 * */
public class TotalTest {

	public static void main(String[] args) {
		/**
		 * 如下方法可见 只有在查询时候 选择JdbcTemplate,NamedParameterJdbcTemplate都一样 <br>增, 删 ,改
		 * 都应选择NamedParameterJdbcTemplate<br>
		 * 注意： queryForInt,queryForList 方法都只能用于基本数据类型<br>
		 * (如:template.queryForList(sql ,String.class);template.queryForInt(sql ,Integer.class);)<br>
		 * 自定义类型(如：User)的查询要用query方法
		 */
	}

	/**
	 * 1.使用 JdbcTemplate <br>
	 * 查出所有
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> jdbcQueryAll(JdbcTemplate jdbcTemplate) {
		String sql = "select * from t_user";
		List<User> list = (List<User>) jdbcTemplate.query(sql,
				new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 2.条件查询选择NamedParameterJdbcTemplate
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> ConditionQuery(
			NamedParameterJdbcTemplate namedJdbcTemplate, User user) {
		String sql = "select * from t_user where userid=:userid";
		Map map = new HashMap();
		map.put("userid", user.getUserid());
		List<User> list = namedJdbcTemplate.query(sql, map,
				new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 2.条件查询选择 JdbcTemplate
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<User> query2(JdbcTemplate jdbcTemplate, int userid) {
		String sql = "select * from t_user where userid=?";
		List<User> list = (List<User>) jdbcTemplate.query(sql,
				new Object[] { userid }, new BeanPropertyRowMapper(User.class));

		return list;
	}

	/**
	 * 3.插入选择 NamedParameterJdbcTemplate由其是在字段多时
	 * */
	public static void insert(JdbcTemplate jdbcTemplate,
			NamedParameterJdbcTemplate namedJdbcTemplate, User user) {
		String idSql = "select seq_t_user.nextval from dual";
		final int id = jdbcTemplate.queryForInt(idSql); // 用序列得到ID
		user.setUserid(id);
		String sql = "insert into t_user(userid,username)values(:userid,:username)";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}

	/**
	 * 4.删除选择 NamedParameterJdbcTemplate
	 * */
	public static void del(NamedParameterJdbcTemplate namedJdbcTemplate,
			User user) {
		String sql = "delete from t_user where userid=:userid";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}

	/**
	 * 5.修改选择 NamedParameterJdbcTemplate
	 * */
	public static void update(NamedParameterJdbcTemplate namedJdbcTemplate,
			User user) {
		String sql = "update t_user set username=:username where userid=:userid";
		namedJdbcTemplate.update(sql, new BeanPropertySqlParameterSource(user));
	}

}
```
