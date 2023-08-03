# Xtream的简单例子

`转载` `2011-09-21 16:47:33`

转载自:[http://www.ibm.com/developerworks/cn/xml/x-xstream/](http://www.ibm.com/developerworks/cn/xml/x-xstream/)

这个例子中

Writer类将类Employee以xml的形式写入文件

Reader类将xml转化为Employee类的实例。

XtreamTest 读取xml文件将xml中的各个节点变为属性。


Config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
	<datasource-name>IRIS</datasource-name>
	<ipaddress>9.124.74.85</ipaddress>
	<logfilename>DailyLogApplication.log</logfilename>
	<appender>console</appender>
</config>
```

```java
package com.xtream;

public class Employee {
	private String name;
	private String designation;
	private String department;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	@Override
	public String toString() {
		return "Name : " + this.name + "\nDesignation : " + this.designation + "\nDepartment : " + this.department;
	}
}
```

```java
package com.xtream;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.thoughtworks.xstream.XStream;

public class Writer {

	public static void main(String[] args) {
		Employee e = new Employee();

		// Set the properties using the setter methods
		// Note: This can also be done with a constructor.
		// Since we want to show that XStream can serialize
		// even without a constructor, this approach is used.
		e.setName("Jack");
		e.setDesignation("Manager");
		e.setDepartment("Finance");

		// Serialize the object
		XStream xs = new XStream();

		// Write to a file in the file system
		try {
			FileOutputStream fs = new FileOutputStream("D:/workspace/TestProject/src/com/xtream/employeedata.xml");
			xs.toXML(e, fs);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
	}
}
```

```java
package com.xtream;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import com.thoughtworks.xstream.*;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class Reader {

	public static void main(String[] args) {
		XStream xs = new XStream(new DomDriver());
		Employee e = new Employee();

		try {
			FileInputStream fis = new FileInputStream("D:/workspace/TestProject/src/com/xtream/employeedata.xml");
			xs.fromXML(fis, e);

			// print the data from the object that has been read
			System.out.println(e.toString());

		} catch (FileNotFoundException ex) {
			ex.printStackTrace();
		}

	}
}
```

```java
package com.xtream;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import com.thoughtworks.xstream.*;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class XtreamTest {

	String datasourcename = null;
	String ipaddress = null;
	String logfilename = null;
	String appender = null;

	@Override
	public String toString() {
		// This method prints out the values stored in the member variables
		return "Datasource Name : " + datasourcename + " \nIP Address : " + ipaddress + " \nLogfilename : " + logfilename + " \nAppender : " + appender;
	}

	/**
	 * @param args
	 * @throws FileNotFoundException
	 */
	public static void main(String[] args) throws FileNotFoundException {
		XStream xs = new XStream(new DomDriver());

		FileInputStream fis = new FileInputStream("D:/workspace/TestProject/src/com/xtream/Config.xml");
		xs.aliasField("datasource-name", XtreamTest.class, "datasourcename");
		xs.alias("config", XtreamTest.class);
		XtreamTest r = (XtreamTest) xs.fromXML(fis);

		System.out.println(r.toString());
	}
}
```
