# 读取和写入大字段(Oracle,JDBC)

`原创` `2010-11-03 12:21:00`

```java
package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//向数据库中写入大字段
public class CLOB_Test {
  static {
    try {
      Class.forName("oracle.jdbc.driver.OracleDriver");
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    }
  }

  public static void main(String[] args) {
    // insertCLOB();
    readCLOB();
  }

  // 插入大文本
  private static void insertCLOB() {
    String url = "jdbc:oracle:thin:@127.0.0.1:1521:oracle";
    String user = "chenl";
    String password = "chenl";
    String sql = "insert into c_lob_blob(C) values(?)";
    Connection conn = null;
    PreparedStatement pstmt = null;
    FileInputStream input = null;
    try {
      conn = DriverManager.getConnection(url, user, password);
      pstmt = conn.prepareStatement(sql);
      File file = new File("src/com/CSDNSwing.java");
      input = new FileInputStream(file);
      Reader reader = new InputStreamReader(input);
      pstmt.setCharacterStream(1, reader, (int) file.length());
      pstmt.executeUpdate();
      conn.commit();
      System.out.println("writer ok!");
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      if (pstmt != null) {
        try {
          pstmt.close();
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
    }
  }

  private static void readCLOB() {
    String url = "jdbc:oracle:thin:@127.0.0.1:1521:oracle";
    String user = "chenl";
    String password = "chenl";
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    try {
      conn = DriverManager.getConnection(url, user, password);
      String sql = "select c from c_lob_blob";
      pstmt = conn.prepareStatement(sql);
      rs = pstmt.executeQuery();
      System.out.println(rs);
      while (rs.next()) {
        Clob clob = rs.getClob(1);
        Reader reader = clob.getCharacterStream();
        BufferedReader buff = new BufferedReader(reader);
        System.out.println(buff);
        String temp = "";
        while ((temp = buff.readLine()) != null) {
          System.out.println(temp);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```
