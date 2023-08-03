# 替换{0}为指定的字符串(MessageFormat)

`原创` `2011-10-12 10:49:47`

```java
package com.text;

import java.text.MessageFormat;

/**替换{0}为指定的字符串*/
public class MessageFormatTest {
	public static void main(String[] args) {
		String message = "hello {0}{1}";
		message  =  MessageFormat.format(message ,"world","!!!");
		System.out.println(message);
	}
}
```



