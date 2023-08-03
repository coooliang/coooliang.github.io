# JavaScript实现文字列表无缝向上滚动

`转载` `2011-09-27 10:52:45`

转自：[http://www.codefans.net/jscss/code/1639.shtml](http://www.codefans.net/jscss/code/1639.shtml)

实际的应用中demo中的元素会有宽度的样式所以我总是出现了 scrollTop总是小于OffsetTop 的现象。也就是demo2到demo最顶的高度总是大于滚动条可以到的最大高度，所以不会进入if语句，我这里修改之后在我的项目中可以使用了。^_^

```html
<body>
<div id="demo" style="overflow:hidden;height:80px;width:280px;">
<ul id="demo1">  
	<li><a href="/soft/4085.shtml" target="_blank">XP Menu 仿QQ菜单管理器左侧菜单</a></li>
	<li><a href="/soft/5884.shtml" target="_blank">多层嵌套的一个层展开</a></li>
	<li><a href="/soft/1852.shtml" target="_blank">《Java2核心技术卷2:高级特性》第7版</a></li>
	<li><a href="/soft/1286.shtml" target="_blank">CSS、HTML教程打包下载 (CHM)</a></li>
	<li><a href="/soft/4216.shtml" target="_blank">《C++ Primer》中文第四版 chm</a></li>
	<li><a href="/soft/3388.shtml" target="_blank">C++工资管理系统(Access)</a></li>
	<li><a href="/soft/2009.shtml" target="_blank">非常牛的左侧栏JS折叠菜单</a></li>
</ul> 
<div id="demo2"></div>
</div> 
<script> 
    var speed=40; 
    var demo=document.getElementById("demo"); 
    var demo2=document.getElementById("demo2"); 
    var demo1=document.getElementById("demo1");
    demo2.innerHTML = demo1.innerHTML;  
    var demoMaxOffsetTop = demo.scrollHeight-demo.offsetHeight;//demo的最大scrollTop
    function Marquee(){
     if(demoMaxOffsetTop - demo.scrollTop<=0) {   
       demo.scrollTop-=demo1.offsetHeight;
     }
     else{ 
       demo.scrollTop++;
     } 
    } 
    var MyMar=setInterval(Marquee,speed); 
    demo.οnmοuseοver=function() {clearInterval(MyMar);} 
    demo.οnmοuseοut=function() {MyMar=setInterval(Marquee,speed);} 
    </script> </body>
```

对scollTop,offsetTop,offsetHeight的理解：

转自 [http://www.cnblogs.com/borthers11/articles/566243.html](http://www.cnblogs.com/borthers11/articles/566243.html)

7.scrollTop 对象的最顶部到对象在当前窗口显示的范围内的顶边的距离． 即是在出现了纵向滚动条的情况下，滚动条拉动的距离．

1.offsetTop     : 当前对象到其上级层顶部的距离. 不能对其进行赋值.设置对象到页面顶部的距离请用style.top属性.

4.offsetHeight : 与style.height属性的区别在于:如对象的宽度设定值为百分比高度,则无论页面变大还是变小,style.height都返回此百分比,而offsetHeight则返回在不同页面中对象的高度值而不是百分比值

2.offsetLeft    : 当前对象到其上级层左边的距离. 不能对其进行赋值.设置对象到页面左部的距离请用style.left属性.

3.offsetWidth   : 当前对象的宽度. 与style.width属性的区别在于:如对象的宽度设定值为百分比宽度,则无论页面变大还是变小,style.width都返回此百分比,而offsetWidth则返回在不同页面中对象的宽度值而不是百分比值

5.offsetParent  : 当前对象的上级层对象. 注意.如果对象是包括在一个DIV中时,此DIV不会被当做是此对象的上级层,(即对象的上级层会跳过DIV对象)上级层是Table时则不会有问题. 利用这个属性，可以得到当前对象在不同大小的页面中的绝对位置． 

6.scrollLeft    : 对象的最左边到对象在当前窗口显示的范围内的左边的距离． 即是在出现了横向滚动条的情况下，滚动条拉动的距离．  
