# js中this的理解

`转载` `2014-10-21 09:31:38`
  
文章转载自：http://jonson.iteye.com/blog/1097559

因为发现身边的一些朋友对js的this指针的理解不是很全面。下面本人简单的讲解一下js的this指针的相关内容，仅供需要的朋友学习参考。

简单的，我先用一句话来概括javascript的this。在js里面，this指针代表的是执行当前代码的对象的所有者。

下面举几个简单的例子加以说明：

 
```js
var name="jonson";  
function test(){alert("您好，我的名字叫"+this.name);}  
test(); 
```

这段代码很简单，我们定义了一个全局变量name，一个全局的function，最后调用了这个test方法。运行这段代码，会弹出"您好，我的名字叫jonson"。

这里的test方法以及name方法都属于js的最初始的对象window的。简单的说：下面调用test方法的对象就是window。

```js
var obj={};  
var name="jonson_window";  
obj.name="jonson_obj";  
obj.test=function (){alert("您好，我的名字是"+this.name)};  
obj.test();  
```

运行这段代码，页面弹出"您好，我的名字是jonson_obj"，而不是"您好，我的名字是jonson_wondow"。因为最后一句obj.test(),指的是obj对象调用test方法，所以这里的this.name指的自然就是obj.name的值。

```
function test(){        
alert(this.title);  
}  
<input  type="button" value="test" οnclick="test()" id="test" title="test">  
```
  
运行这段代码页面弹出undefined字样。有人会说，我的input标签里面明明有title属性的值为test的。但是这里为什么会弹出undefined字样呢。其实道理很简单，这里是通过onclick方法调用的。其实οnclick="test()"，相当于function onclick(evenet){test();},而function onclick其实也是一个全局的function，上面的 test方法也是全局的function，都可以视为window对象的两个属性。这里其实就是通过这个在onclick方法里面调用这个test方法，其实这里和第一种说法是一样的。

通过以上的几个例子，我相信大家都多少理解了js的this指代含义------this指针代表的是执行当前代码的对象的所有者。

我希望大家看完这个博客之后，可以自己去测试一下，加深对js的this指代的理解。

以下是我个人的demo：

```html
<html>
<head>
<meta charset="utf-8">
<title>jQuery validation ui plug-in - main demo</title>
<script type="text/javascript" src="jquery-1.8.0.js"></script>

<script type="text/javascript">
	function test1(){
		alert(this);//window
	}

	var test2 = function(){
		alert('test2 1:' + this);//window
		return {
			a:function(){
				return this;
			},
			methods:{
				b:function(){
					return this;
				}
			}
		}
	}

	var test3 = function(){
		//alert('test3 1:' + this);//window
		return {
			a:function(){
				return this;
			},
			methods:{
				b:function(){
					return this;
				}
			}
		}
	}()

	var test4 = {
		a:function(){
				return this;
			},
		methods:{
			b:function(){
				return this;
			}
		}
	}
</script>

</head>
<body>
	<center>
		<p>
			<button οnclick="test1();">test1</button>
			<button οnclick="test2();">test2</button>
			<br/>
			<button οnclick="var tt2 = test2();alert(tt2.a() == tt2);">test2.a</button><!--true-->
			<button οnclick="var tt2 = test2();alert(tt2.methods.b() == tt2.methods);">test2.methods.b</button><!--true-->
			<br/>
			<button οnclick="test3()">test3</button><!--ERROR:object is not a function -->
			
			<button οnclick="alert(test3.a() == test3)">test3.a</button><!--true-->
			<button οnclick="alert(test3.methods.b() == test3.methods)">test3.methods.b</button><!--true-->
			<br/>
			<button οnclick="alert(test4.a() == test4)">test4.a</button><!--true-->
			<button οnclick="alert(test4.methods.b() == test4.methods);">test4.methods.b</button><!--true-->
		</p>
	</center>
</body>
</html>
```
