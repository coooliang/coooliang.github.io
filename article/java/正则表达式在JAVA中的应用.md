# 正则表达式在JAVA中的应用

`转载` `2011-10-30 23:29:32`

个人觉得要熟练运用正则不是件容易的事情，所以需要在工作中不断的学习，这篇文章蛮不错的。有的时候忘记了如何使用可以回头看下，所以转载，并对作者表示感谢。

本文转载自closewbq的博客：

[http://blog.csdn.net/closewbq/article/details/5704158](http://blog.csdn.net/closewbq/article/details/5704158)

 1. 什么是正则表达式？
正则表达式就是使用某种 模式去 匹配字符串的公式。
可以说任何的编程语言都提供的机制。
2. 正则表达式使用的场合
•表单验证：如长度验证，邮件格式验证等等。
•字符串处理：如匹某条数据的某段信息，将字符串进行分割，替换等操作。
3. 正则表达式的构成
正则表达式有一些 普通字符和一些 元字符组成。普通字符包括大小写的字符和数字。
元字符包括以下几种：

```java
/** .元字符的使用 */
public static void RegexMethodOne() {
        String[] arrays = {"rat", "rut", "r t", "root", "remst" };
        String regex = "r.t";
        for (String str : arrays) {
            System.out.println(str + "------->" + str.matches(regex));
        }
    }

$  :匹配行结束的标记。
*  :匹配O个或者多个在它之前的那个字符。
/** $,*元字符的使用 */
 public static void RegexMethodTwo() {
        String[] arrays = {"I love you", "I love you." };
        String regex = "^I.*you$";
        for (String str : arrays) {
            System.out.println(str + "------->" + str.matches(regex));
        }
    }

^  :匹配一行的开始。
*  :匹配O个或者多个在它之前的那个字符。
/** ^,*元字符的使用 */
public static void RegexMethodThree() {
        String[] arrays = {"where are you going", "what are you doing" };
        String regex = "^where.*";
        for (String str : arrays) {
            System.out.println(str + "------->" + str.matches(regex));
        }
    }

[] :匹配括号中的任意一个字符。例如：例如正则表达式[0-9]可以匹配任何数字字符；例如正则表达式[A-Za-z]可以匹配任何大小写字母。[]元字符还有一个重要的用法就是“排除”。例如正则表达式[^wubq] 可以匹配除了w,u,b,q字母之外的任何字符。
/** []元字符的使用 */
public static void RegexMethodFour() {
   String[] arrays = {"A,is a character", "B,is a character", "C,is a character" };
   String regex = "^[AB],is a character$";
   for (String str : arrays) {
      System.out.println(str + "------->" + str.matches(regex));
   }
}

() :将(和)之间的表达式定义为“组”。组的含义类似于数学中的小括号，括号内部的运算是一个整体。
/** ()元字符的使用 */
 public static void RegexMethodFive() {
   String str = "{loginname=wubaoquan,loginpassword=1987521,usersex=man,userage=23}";
   String regex = "=([a-z0-9]+)";
   Pattern pattern = Pattern.compile(regex);
   Matcher m = pattern.matcher(str);
   while (m.find()) {
   System.out.println(m.group(1));
   }
}

+  :匹配1或多个正好在它之前的那个字符。
/** +元字符的使用 */
public static void RegexMethodSix() {
   String[] arrays = {"8", "88", "888", "8a", "89" };
   String regex = "8+";
   for (String str : arrays) {
      System.out.println(str + "------->" + str.matches(regex));
   }
}

?  :匹配0或1个正好在它之前的那个字符。
/** ?元字符的使用 */
public static void RegexMethodEight() {
   String str = "</input><p>12312312312</br><a>b.jsp</a>";
   String regex = "</?[a-z]+>";
   Pattern pattern = Pattern.compile(regex);
   Matcher m = pattern.matcher(str);
   while (m.find()) {
      System.out.println(m.group());
   }
}

{} :匹配指定数目的字符。{}元字符以下几种用法：
{i}   :匹配指定i个字符。
{i，} :匹配指定大于等于i个字符。
{i，j}:匹配指定i到j个字符。
/** {}元字符的使用 */
public static void RegexMethodSeven() {
   String[] arrays = {"cc", "aaaaa", "000000", "bbbbbbb", "dddddddd", "111111111" };
   String regex = "[0-9a-z]{5,8}";
   // String regex = "[0-9a-z]{5,}";
   // String regex = "[0-9a-z]{5}";
   for (String str : arrays) {
      System.out.println(str + "------->" + str.matches(regex));
   }
}

```

```java
其他一些常用的元字符：
|  匹配或。如A|B，能够匹配A或者是B
/w 匹配字母或数字或下划线或汉字
/s 匹配任意的空白符
/d 匹配数字
/b 匹配单词的开始或结束

正则表达式在Java中使用形式
1.String.split(“正则表达式”);返回一个字符串数组。
/** String.split(regexStr) */
public static void RegexTypeOne(){
   String str="txt.jpg,csv|xls";
   String[] array=str.split("[.,|]");
   for(String string:array){
      System.out.println(string);
   }
}

2.String.split(“正则表达式”，int limit);返回一个字符串数组。limit 参数控制模式应用的次数，因此影响结果数组的长度。如果该限制n 大于 0，则模式将被最多应用 n - 1 次，数组的长度将不会大于 n。如果 n 为非正，则模式将被应用尽可能多的次数，而且数组可以是任意长度。如果n 为零，则模式将被应用尽可能多的次数，数组可有任何长度。
 
/** String.split(regexStr,limit) */
public static void RegexTypeTwo(){
   String str="15*(8+36*11)";
   String[] array=str.split("//*",2);
   for(String string:array){
      System.out.println(string);
   }
}

3.String.matches(“正则表达式”) ;返回true或者false.
 /** String.matches(regex)  */
    public static void RegexTypeThree(){
        String[] array={"123","123a","@123","444"};
        for(String str : array){
            System.out.println(str+"-------->"+str.matches("//d+"));
 
4.String.replaceAll (“正则表达式”,“替换后的字符串”);返回进行替换后的新字符串。
 /** String.replaceAll(regex, replacement) */
    public static void RegexTypeFour(){
        String str="<p>we will replace of html mark</p>";
        System.out.println(str.replaceAll("</?p>",""));
    }
5.Pattern、Matcher模式匹配。
Pattern就是正则表达式的编译表示形式。也可理解为模式。
Pattern p = Pattern.compile(“正则表达式”)；
Matcher m = p.matcher(“字符序列");
```


```java
实例2：从一个字符串中选出邮件地址的格式正确的子串。
 /** Pattern Matcher */
public static void RegexTypeSix() {
   String str="wubq@xxxxx.cn";
   Pattern pattern=Pattern.compile("//w+([-+.]//w+)*@//w+([-.]//w+)*//.//w+([-.]//w+)*");
   Matcher m=pattern.matcher(str);
   if (m.find()){
   //如果匹配成功，通过m.group()可以获取匹配到的字符串
      System.out.println(str+"------>"+m.group());
//如果匹配成功，通过m.start()可以获取匹配子串的开始位置
      System.out.println(str+“------>”+m.start());
//如果匹配成功，通过m.end()可以获取匹配子串的结束位置
      System.out.println(str+"------>"+m.end());
   }
}

实例3：从一串数字中挑选出所有以135，136，158，159开头的手机号。
 
/** Pattern Matcher */
public static void RegexTypeSeven() {
   String str="786313521102915898884821362123456777136234515921117511";
   Pattern pattern=Pattern.compile("(135|136|158|159)[0-9]{8}");
   Matcher m=pattern.matcher(str);
   while(m.find()){
      System.out.println(str+"------>"+m.group());
   }
}
在上述一串数字的字符串中，存在符合条件的手机号码有：
13521102915，15898884821，13621234567
13623451592，15921117511
而我们执行程序后发现，只得到以下三个手机号：
13521102915，13621234567，13623451592
我们猜想是我们的正则表达式写错了吗？
(135|136|158|159)[0-9]{8}，去匹配135或者136或者158或者159的数字，后面在跟上8位数字，没有错呀。呵呵，确实没有错，玄机其实在find方法中。

实例4：改进刚才的实例3，选出正确的手机号码。
 
/** Pattern Matcher */
public static void RegexTypeEight() {
   String str="786313521102915898884821362123456777136234515921117511";
   Pattern pattern=Pattern.compile("(135|136|158|159)[0-9]{8}");
   Matcher m=pattern.matcher(str);
//记录匹配的起点
   int step=0;
   while(m.find(step)){
      System.out.println(m.group());
//当匹配成功后，将下次匹配的位置向后移动三位。
      step=m.start()+3;
   }
}
再次运行后，我们得到了正确的结果：
13521102915，15898884821，13621234567
13623451592，15921117511
原来find()方法，从匹配器区域的开头开始，如果该方法的前一次调用成功了并且从那时开始匹配器没有被重置，则从以前匹配操作没有匹配的第一个字符开始。

实例5：忽略大小写匹配。
/** Pattern Matcher */
public static void RegexTypeNine() {
   String str ="Book";
   Pattern pattern = Pattern.compile("book");
   //Pattern pattern =Pattern.compile("book",Pattern.CASE_INSENSITIVE);
   Matcher matcher = pattern.matcher(str);
   System.out.println(str+"------->"+matcher.matches());
}
上面的这个表达式 book 是不能匹配字符串 Book 的，这时我们只要给定编译时的参数就可以了：
Pattern pattern = Pattern.compile(“book”, Pattern.CASE_INSENSITIVE);
Pattern.CASE_INSENSITIVE 这是一个 int 类型的常量，值为 2。表示表达式忽略大小写进行区配。如果我们不采用 Pattern 和 Matcher 两个类来匹配的话，只是使用 String 的 matches 方法的话，我们就不能指定表达式的编译参数了，这时就需要采用内嵌标志表达式了。 

实例6：内嵌标志表达式。
 
/** Pattern Matcher */
public static void RegexTypeTen() {
   String str = "Book";
   String regex = "(?i)book";
   System.out.println(str+"------->"+str.matches(regex));
}
与 Pattern.CASE_INSENSITIVE 对应的内嵌标志表达式是 (?i)，它有四种形式：
1:(?i)
2:(?-i)
3:(?i:X)
4:(?-i:X)
不带有 - 的是开标志，带有 - 的是关标志。我们就达到了同样的效果，当然这样并不是最好的，因为字符串中只有B是大写的，
 
我们没有必要把所有的字符都进行不区分大小写匹配，我们可以在打开标志，用(?i)的第二种形式马上关掉它：
    String regex = “(?i)b(?-i)ook”;

这样的话,只有b是区分大小写了，而(?-i)后面的还是得区分大小写匹配的。这样写可能看上去很不顺眼，我们还能使用第3种形式直接指定某些字符是不区分大小写的。
    String regex = “(?i:b)ook”;

这样的表达式与上面的那个在语义上是相同的。就效率上肯定是优于一下子开，一下子关的。可见内嵌标志表达式要比指定编译参数的功能强大许多。
 
使用建议：如果能确定某些字符的大小写时，尽量使用已确定的字符，对于不确定的可以采用 (?i:X) 的方式指定。因此打开不区分大小写开关时，对匹配的性能是有一定影响的。

实例7：多行匹配 。
/** Pattern Matcher */
public static void RegexTypeEleven() {
   String str =
            "<table>                /n"
               + "  <tr>                 /n"
               + "    <td>               /n"
               + "       Hello World!    /n"
               + "    </td>              /n"
               + "  </tr>                /n"
               + "</table>";
   String regex = "<td>(.+?)</td>";
   Pattern pattern = Pattern.compile(regex);
   Matcher m = pattern.matcher(str);
   while (m.find()) {
      System.out.println(m.group(1).trim());
   }
}
执行结果后，我们没有得到任何的结果。在默认的情况下.元字符是不能匹配行结束符的。

同样，可以像匹配大小写匹配那样使用编译参数：Pattern.DOTALL
实例7不能从str抽取出东西的，因为td的后面带有换行符，我们只要更改一下：
Pattern pattern = Pattern.compile(regex, Pattern.DOTALL);
这样就行了，如果td还得不区分大小写的话，再改成：
Pattern pattern = Pattern.compile(regex, Pattern.DOTALL | Pattern.CASE_INSENSITIVE);
当然和 Pattern.CASE_INSENSITIVE 一样，Pattern.DOTALL 也有内嵌标志表达式，即(?s),s的意思表示 single-line 就是忽略换行符什么的，只看成单行进行处理。
这个表达式使用内嵌 (?s) 的话可以改为：
String regex = "(?s)<td>(.+?)</td>";
如果还要不区分大小写的话，再加上 i 标志：
String regex = "(?s)(?i)<td>(.+?)</td>";
但这样显得很拖沓，可以把它们合并起来：
String regex = "(?is)<td>(.+?)</td>";    //秩序无所谓

Negative Lookahead是什么？
个人理解为缝隙匹配，接下来我们通过实例进行分析。
实例1：不以www开头。
/** Negative Lookahead的应用 */
public static void RegexNegaTiveOne(){
   String[] strs = {"abc1232", "wwwadsf", "awwwfas",
                     "wwadfsf", "", "ww", " ", "www" };
   String regex = "(?!^www).*";
   for (String str : strs) {
      System.out.println(str+"------>"+str.matches(regex));
   }
}

前面我们讲过，^元字符表示行的开始。那么上述的实例中,^www的就是意思就是以www开头，但是前面添加了?!的符号,?!是什么意思呢？
?!就是缝隙匹配中的一种,?!x表示字符间缝隙后面不允许出现x字符。那么?!^www表达式的意思就是开头的缝隙后面不能出现www。
 
大家是不是还在思考“开头的缝隙后面”是什么意思呀？接下来我们进一步说明。
实例2：从字符串中截取出我们组（我们开发小组- -！）所有人的名字。
 /** Negative Lookahead */
public static void RegexNegaTiveTwo(){
   String strs ="ZhouguokuLixinZhangchunchaoQiuhuHuangzhiguoWubaoquanZhangfeiChenleiGenghaiqingHuonanHanxiaodong";
   String regex = "(?=[A-Z])";
   String[] array=strs.split(regex);
   for(String str: array){
      System.out.println(str);
   }
}
?=x指缝隙后面必须出现x字符。那么我们很容易去理解(?=[A-Z])的意思。它指缝隙后面必须出现A-Z大写字母，然后我们通过这个匹配的缝隙去分割。
 
通过运行刚才的程序，我们发现多出一行空行，这是什么原因呢？
空行
Zhouguoku
Lixin
Zhangchunchao
......
我们再来看下刚才的字符串。（）
ZhouguokuLixinZhangchunchaoQiuhuHuangzhiguoWubaoquan
我们刚才的正则表达式想要表达的意思是：
Zhouguoku | Lixin | Zhangchunchao | Qiuhu | Huangzhiguo | Wubaoquan
在他们的之间的，按照|这个缝隙去分割。然而我们忽略了一个问题，那就是在Zhouguoku之前也是有缝隙的。字符串分割如下：
| Zhouguoku | Lixin | Zhangchunchao | Qiuhu | Huangzhiguo | Wubaoquan
所以会多出一行空行。那么实例1中的"开头的缝隙后面"这句话，也应该可以理解了。
那我们如何去掉多出的空行呢？

实例3：从字符串中截取出我们组所有人的名字，并且去掉多出的空行。
 /** Negative Lookahead */
    public static void RegexNegaTiveThree(){
        String strs ="ZhouguokuLixinZhangchunchaoQiuhuHuangzhiguoWubaoquanZhangfeiChenleiGenghaiqingHuonanHanxiaodong";
        String regex = "(?<!^)(?=[A-Z])";
        String[] array=strs.split(regex);
        for(String str: array){
            System.out.println(str);
        }
    }
这次大家再次运行，空行就没有了。我们只是修改了前面的表达式，那?<!^的作用肯定就是为了去掉空行的。 ?<!^的意思是指：表示缝隙不允许前面是行的开始，即缝隙不能出现在首字母的前面。
 
通过前面的例子，我们队缝隙匹配已经了解了。现在我们进行整理下。
缝隙匹配有以下四种表达式：
(?=X) 
(?!X) 
(?<=X) 
(?<!X)
 
(?!) 表示缝隙后面不允许出现的东西
(?<!) 表示缝隙前不允许出现的东西。
(?=) 表示缝隙后允许出现的东西。
(?<=) 表示缝隙前允许出现的东西。
最后给出一些常用的正则表达式：
 
匹配中文字符： [/u4e00-/u9fa5]
匹配Email地址：/w+([-+.]/w+)*@/w+([-.]/w+)*/./w+([-.]/w+)*
匹配网址URL：[a-zA-z]+://[^/s]*
匹配身份证：/d{17}[/d|X]|/d{15}
匹配ip地址:((2[0-4]/d|25[0-5]|[01]?/d/d?)/.){3}(2[0-4]/d|25[0-5]|[01]?/d/d?
匹配正整数:^[1-9]/d*$
匹配负整数:^-[1-9]/d*$
匹配整数:^-?[1-9]/d*$　
匹配非负整数（正整数 + 0）:^[1-9]/d*|0$　
匹配非正整数（负整数 + 0）：^-[1-9]/d*|0$
匹配由26个英文字母组成的字符串：^[A-Za-z]+$
匹配由26个英文字母的大写组成的字符串：^[A-Z]+$
匹配由26个英文字母的小写组成的字符串：^[a-z]+$
匹配由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
匹配由数字、26个英文字母或者下划线组成的字符串：^/w+$

```
