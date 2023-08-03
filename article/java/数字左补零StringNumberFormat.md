# 数字左补零（String,NumberFormat）

`原创` `2011-10-12 10:41:41`

```java
package com.text;

import java.text.NumberFormat;
import java.util.Random;

/** 数字左补零 
* */
public class NumberFormatTest {
	public static void main(String[] args) {
		for (int x = 0; x < 100; x++) {
			// 待测试数据
			int i = new Random().nextInt(9999);
			// 得到一个NumberFormat的实例
			NumberFormat nf = NumberFormat.getInstance();
			// 设置是否使用分组
			nf.setGroupingUsed(false);//每三位会加逗号
			// 设置最大整数位数
			nf.setMaximumIntegerDigits(4);
			// 设置最小整数位数
			nf.setMinimumIntegerDigits(4);
			// 输出测试语句
			System.out.println(nf.format(i));

			//方法2：
			String str = String.format("%06d", new Random().nextInt(9999));
			System.out.println(str);
		}
	}
}
```
