# Struts2枚举转换器(helloworld)

`原创` `2011-12-01 11:06:06`

1.枚举类:

```java
public enum AreaType implements IEnumConverter {
	
	FZ("福州", 591), 
	XM("厦门", 592);
	
	private String text;
	private Integer value;

	private AreaType(String text, Integer value) {
		this.text = text;
		this.value = value;
	}

	@Override
	public String getName() {
		return this.name();
	}

	@Override
	public Integer getOrdinal() {
		return this.ordinal();
	}

	@Override
	public String getText() {
		return text;
	}

	@Override
	public Integer getValue() {
		return value;
	}

	/**
	 * 根据序数得到枚举
	 * 
	 * @param ordinal
	 * @return
	 */
	public static AreaType getByOrdinal(Integer ordinal) {
		if (null != ordinal) {
			for (AreaType t : AreaType.values()) {
				if (t.ordinal() == ordinal) {
					return t;
				}
			}
		}
		return null;
	}
}
```

2.接口，让枚举实现这个接口，达到所有的枚举都可以转换的效果

```java
/**
 * 自定义的枚举转换器接口，自己定义的枚举实现这个接口，struts2的转换器就会对其进行转换
 * 
 * @author chenl 创建日期 Dec 1, 2011
 */
public interface IEnumConverter {
	/**
	 * 得到序数
	 */
	Integer getOrdinal();

	/**
	 * 返回此枚举常量的名称，在其枚举声明中对其进行声明
	 */
	String getName();

	String getText();
	
	Integer getValue();
}
```

3.枚举转换器，继承StrutsTypeConverter类 

```java
/**
 * 枚举转换器
 * 
 * @author chenl 创建日期 Dec 1, 2011
 */
public class EnumCommonConverter extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class clazz) {
		System.out.println("进入转换器......");
		String str = values[0];
		if (str != null && !"".equals(str)) {
			try {
				IEnumConverter[] enums = (IEnumConverter[]) clazz.getMethod("values").invoke(null);// 调用枚举的values方法
				if (null != enums && enums.length > 0) {
					for (IEnumConverter e : enums) {
						if (str.equals(e.getValue().toString())) {
							return e;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@Override
	public String convertToString(Map context, Object o) {
		System.out.println("入进转换器的convertToString方法......");
		return null != o && o instanceof IEnumConverter ? ((IEnumConverter) o).getText() : "";
	}

	public static void main(String[] args) {
		Object obj = new EnumCommonConverter().convertFromString(null, new String[] { "1" }, AreaType.class);
		System.out.println(obj);

	}
}
```

4.最后是在工程的src的目录下加入﻿﻿xwork-conversion.properties文件，

内容为：com.coooliang.enums.IEnumConverter = com.coooliang.enums.EnumCommonConverter

请求页面：

```
<!-- 枚举转换器 例子-->
<%
	AreaType[] areas = AreaType.values();
	request.setAttribute("areas",areas);
%>
<s:form action="enum!execute.action" namespace="/">
	<s:select name="area" list="#request.areas" id="area"
		listKey="value" listValue="text">
	</s:select>
	<s:submit></s:submit>
</s:form>
```

Action:

```java
import com.coooliang.enums.AreaType;
import com.opensymphony.xwork2.ActionSupport;

@Results(value = { @Result(name = "success", location = "/enum.jsp") })
public class EnumAction extends ActionSupport {
	private AreaType area;
	@Override
	public String execute() throws Exception {
		System.out.println("EnumAction.execute():" + area);
		return SUCCESS;
	}
	public AreaType getArea() {
		return area;
	}
	public void setArea(AreaType area) {
		this.area = area;
	}
}
```

结果页：

```html
<s:property value="area.name"/>
<s:property value="area.text"/>
<s:property value="area.value"/>
```

转换器写得不是很完善，还需要改进，这篇文章只是想起到抛砖引玉的作用。

这里的Action使用了无配置的插件需要用到struts2-convention-plugin.jar可以查看我的另一篇文章：http://blog.csdn.net/cl61917380/article/details/7017745

这篇的重点是转换器。你也可以使用常规的方法访问. 
