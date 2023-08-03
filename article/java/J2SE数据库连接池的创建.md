# J2SE——数据库连接池的创建

`原创` `2010-10-31 16:46:00`

```java
/**
 * A)当用户调用pool = ConnectionPool.getInstance(username,password)方法时<br>
 * 执行构造方法--> 调用init()方法(
 * 1.读取配置文件中的driverClassName,url并设置, <br>
 * 2.创建Vector容器<br>
 * 3.addConn():通过driverClassName,url,username,password 向容器中添加Connection对象)<br>
 * B)conn = pool.getConn();//得到Connection对象.
 * C)conn用完后不是调用close()方法而是调用 release()方法,将连接放回池中
 * D)退出程序时调用 closeAllConnection()方法关闭所有连接
 */

public class ConnectionPool {

  private String driverClassName;
  private String url;
  private String username;
  private String password;
  private Vector<Connection> pool;
  private int poolSize = 1;
  private static ConnectionPool instance;

  private ConnectionPool(String username, String password) {
    this.username = username;
    this.password = password;
    init();
  }

  public static ConnectionPool getInstance(String username, String password) {
    if (instance == null) {
      instance = new ConnectionPool(username, password);
    }
    return instance;
  }

  /** * 如果容器中有Connection 返回一个并从容器中移除<br> * 否则返回NULL */
  public synchronized Connection getConn() {
    if (pool.size() > 0) {
      Connection conn = pool.get(0);
      pool.remove(0);
      return conn;
    }
    return null;
  }

  public synchronized void release(Connection conn) {
    pool.add(conn);
  }

  public synchronized void closeAllConnection() {
    for (int i = 0; i < pool.size(); i++) {
      try {
        pool.get(i).close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
      pool.remove(i);
    }
  }

  private void init() {
    readConfig();
    // 读取配置文件中的url
    pool = new Vector<Connection>(poolSize);
    addConn();
  }

  private void readConfig() {
    FileInputStream input = null;
    try {
      input =
        new FileInputStream(
          System.getProperty("user.dir") + "/data/db.properties"
        );
    } catch (FileNotFoundException e1) {
      e1.printStackTrace();
    }
    Properties pro = new Properties();
    try {
      pro.load(input);
      driverClassName = (String) pro.get("driverClassName");
      url = (String) pro.get("url");
      poolSize = Integer.parseInt((String) pro.get("poolSize"));
    } catch (IOException e) {
      e.printStackTrace(); // 如果读取属性出错
    } finally {
      if (input != null) {
        try {
          input.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }

  private void addConn() {
    Connection conn = null;
    try {
      for (int i = 0; i < poolSize; i++) {
        Class.forName(driverClassName);
        conn = DriverManager.getConnection(url, username, password);
        pool.add(conn);
      }
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
      // driverClassName 错误时
    } catch (SQLException e) {
      e.printStackTrace(); // url, username, password错误时
    }
  }
}
```
