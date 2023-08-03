# 对汉字进行排序（RuleBasedCollator）

`原创` `2011-10-12 10:46:18`


```java
package com.text;

import java.text.Collator;
import java.text.RuleBasedCollator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

/**对汉字进行排序*/
public class RuleBasedTest {
	public static void main(String[] args) {
		String aa = "啊啊";
		String bb = "拜拜";
		List<String> list = new ArrayList<String>();
		list.add(bb);
		list.add(aa);
		System.out.println(Arrays.toString(list.toArray()));
		Collections.sort(list, new StringCompable());
		System.out.println(Arrays.toString(list.toArray()));
	}
}

class StringCompable implements Comparator<String> {
	RuleBasedCollator collator_ch = (RuleBasedCollator) Collator.getInstance(Locale.CHINA);

	public int compare(String o1, String o2) {
		return collator_ch.compare(o1.toString(), o2.toString());
	}
}
```
