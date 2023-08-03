# Firefox异步加载页面乱码处理

`原创` `2013-08-09 19:07:23`

转载注明出处是一种美德。。。 

以下部分内容转载自：http://blog.csdn.net/hbzyaxiu520/article/details/5604098

```
js中escape,encodeURI,encodeURIComponent三个函数的区别 
js对文字进行编码涉及3个函数：escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent
1。传递参数时需要使用encodeURIComponent，这样组合的url才不会被#等特殊字符截断。                            
例如：<script language="javascript">document.write('<a href="http://passport.baidu.com/?logout&aid=7&u='+encodeURIComponent("http://cang.baidu.com/bruce42")+'">退出</a>');</script>
2。进行url跳转时可以整体使用encodeURI
例如：Location.href=encodeURI("http://cang.baidu.com/do/s?word=百度&ct=21");
3。js使用数据时可以使用escape
例如：搜藏中history纪录。
4。escape对0-255以外的unicode值进行编码时输出%u****格式，其它情况下escape，encodeURI，encodeURIComponent编码结果相同。
最多使用的应为encodeURIComponent，它是将中文、韩文等特殊字符转换成utf-8格式的url编码，所以如果给后台传递参数需要使用encodeURIComponent时需要后台解码对utf-8支持（form中的编码方式和当前页面编码方式相同）
escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z
encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z
encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z
```

PS:以下内容属个人情况，仅供参考，由于我的异步是需要访问两次Action故出现乱码问题（第一次得到总数，第二次得到列表）。如果你异步加载页面只访问一次那就不用考虑这些咯。

1.页面上第一次异步访问Action,要进行编码两次（这两次的作用是不让URL中有中文），load还会进行一次编码，这里应该是进行了三次编码，此时后台Action收到的Kw是中文setKw中转换后还是中文。 //后台setKw方法里还需要进行一次解码 

```js
var keyword="<s:property value='kw'/>".replace(/\s+/g,"+");//kw=手牵手
function ajaxLoad(id,ajaxUrl,ajaxData){
    var url = ajaxUrl+'?'+ ajaxData
    //此时url等于：/user/searchAll.action?queryFrom=singger&beginMark=nofirst&kw=%25E6%2589%258B%25E7%2589%25B5%25E6%2589%258B
    url = encodeURI(encodeURI(url));
    $(id).load(url);
}
```

2.第一次访问只得到总数return async，页面第二次异步访问Action这个时候不用编码，此次访问后台Action得到的Kw是%E6%89%8B%E7%89%B5%E6%89%8B在SetKw中转成中文。 


```js
var url = '<s:property value="queryUri" escape="flase"/>&queryType=2';
//url等于：/user/searchAll.action?queryFrom=singger&beginMark=nofirst&kw=%25E6%2589%258B%25E7%2589%25B5%25E6%2589%258B&queryType=2
$("#<s:property value="pageResult.tableKey"/>").load(url);
```

3.Action中setKw方法中进行解码 

```java
public void setKw(String kw) {
    try {
    kw = URLDecoder.decode(kw,"UTF-8");
    } catch (UnsupportedEncodingException e) {
    e.printStackTrace();
    }
    this.kw = kw;
}
```


![./figures/20130809191243000](./cl.png)





