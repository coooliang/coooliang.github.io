# sql过滤类

`原创` `2011-08-23 17:03:39`

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**sql检查类*/
public class ReplaceString {
 private static final String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？\"]";
 private static final String inj_str = "'@/@=@and@exec@insert@select@delete@update@count@*@%@chr@mid@master@truncate@char@declare@;@or@lock table@grant@drop@ascii@-@+@,";

 private static String dealNull(String str) {
  String returnstr = null;
  if (str == null)
   returnstr = "";
  else
   returnstr = str;
  return returnstr;
 }

 private static String strReplace(String str, String restr) {
  return str.replace(restr, "");
 }

 /**
  *
  *
  * @info:过滤特殊字符
  * @add by luzy
  * @Version:
  * @Date:Sep 4, 2010
  *
  */
 public static String stringFunion(String str) {
  Pattern p = Pattern.compile(regEx);
  str = dealNull(str);
  if ("".equals(str)) {
   return "";
  }
  Matcher m = p.matcher(str);
  return m.replaceAll("").trim();
 }

 public static String sqlInfusion(String str) {
  String tempstr;
  boolean r = true;
  String inj_stra[] = inj_str.split("@");
  tempstr = dealNull(str);
  tempstr = tempstr.toLowerCase();
  for (int i = 0; i < inj_stra.length; i++) {
   if (tempstr.indexOf(inj_stra[i]) >= 0) {
    r = false;
    tempstr = strReplace(tempstr, inj_stra[i]);
   }
  }
  if (r) {
   return str;
  } else {
   return tempstr;
  }
 }
}
```