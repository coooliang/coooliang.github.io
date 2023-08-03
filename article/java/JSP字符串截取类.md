# JSP字符串截取类..

`原创` `2012-03-15 16:45:50`

页面使用时：

```xml
<s:bean name="com.hwtt.rbt.user.bean.CutStringBean" id="cutString">
  <s:param name="str" value="singerName"/>
  <s:param name="hold" value="3"/>
  <s:property value="formatStr"/>
</s:bean>
```

工具类： 

```java
public class CutStringBean {

    private String str;//要格式化的字符串
    private int hold;//保留的长度
    private String end;//结束符
    private String formatStr;//格式化后的字符串

    private static final String END = "..";

    public CutStringBean() {
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public int getHold() {
        return hold;
    }

    public void setHold(int hold) {
        this.hold = hold;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getFormatStr() {
        formatStr = getShortStr(str, hold, end);
        return formatStr;
    }

    public void setFormatStr(String formatStr) {
        this.formatStr = formatStr;
    }

    /**
     * 将字符串缩短到指定长度，且与结束符结束
     *
     * @param str
     * @param hold 保留的长度
     * @param end  结束字符串，为空则为“..”
     * @return String
     */
    public String getShortStr(String str, int hold, String end) {
        if (str == null || hold < 1) return "";
        str = str.trim();
        if (hold > str.length()) return str;

//        int length = (hold % 2) != 0 ? hold - 1 : hold;
        end = end == null ? END : end;
        int abc123Size=0;//数字和字母个数
        if (str.length() > hold){
            for(int i=0;i<hold;i++){
                if(java.util.regex.Pattern.matches("[a-zA-Z0-9]",""+str.charAt(i))){ //判断数字或字母时增1
                    abc123Size++;
                }
            }

            int tempHold = hold;
            int twoAbc123=0;
            for(int i=tempHold;i<tempHold+abc123Size && i<str.length();i++){
                if(java.util.regex.Pattern.matches("[a-zA-Z0-9]",""+str.charAt(i))){ //如果是数字或字母时长度增1
                    hold++;
                }else if(twoAbc123 == 1){//一个中文需要两个数字或字母
                    hold++;
                    twoAbc123=0;
                }else{
                    twoAbc123++;
                }
            }
            return hold >= str.length() ? str : str.substring(0, hold) + end;
        }
        return str;
    }

}
```
