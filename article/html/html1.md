# 网页过渡效果(meta http-equiv=Page-Enter)

`转载` `2014-09-11 15:17:53`

文章转载自：http://www.cnblogs.com/sukiwqy/archive/2009/12/05/1617771.html



利用文本头的 <meta> 标记中,具体 meta 标记作用这里就不介绍,这里重点说明它如何实现页面过渡效果...


IE要求:

在IE5.5及以上版本的浏览器中.

启用网页过渡效果

默认情况下都已经启用了，如果需要手动启用则只需在Internet选项中： Advanced（高级） - Browsing（浏览） - Enable page transitions（启用页面过渡）即可。

应用过渡效果

当我们需要添加过渡效果时，只需在<head>中添加一个特殊的<meta>即可，比如：

 <meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=12)" />



> 1.先介绍下参数:

http-equiv作用很多,这里的值为 Page-Enter 是指在页面进入的时候发生,其他值还有:
Page-Enter : 进入页面
Page-Exit : 离开页面
Site-Enter : 进入网站
Site-Exit : 离开网站

content当然就是内容咯,这里表示页面过渡的效果设置,这里的两个属性表示分别表示
Duration : 过渡速度
Transition : 可选项。整数值(Integer)。设置或检索转换所使用的方式
具体数值介绍:
  0 : 矩形收缩转换。
  1 : 矩形扩张转换。
  2 : 圆形收缩转换。
  3 : 圆形扩张转换。
  4 : 向上擦除。
  5 : 向下擦除。
  6 : 向右擦除。
  7 : 向左擦除。
  8 : 纵向百叶窗转换。
  9 : 横向百叶窗转换。
  10 : 国际象棋棋盘横向转换。
  11 : 国际象棋棋盘纵向转换。
  12 : 随机杂点干扰转换。
  13 : 左右关门效果转换。
  14 : 左右开门效果转换。
  15 : 上下关门效果转换。
  16 : 上下开门效果转换。
  17 : 从右上角到左下角的锯齿边覆盖效果转换。
  18 : 从右下角到左上角的锯齿边覆盖效果转换。
  19 : 从左上角到右下角的锯齿边覆盖效果转换。
  20 : 从左下角到右上角的锯齿边覆盖效果转换。
  21 : 随机横线条转换。
  22 : 随机竖线条转换。
  23 : 随机使用上面可能的值转换。

> 2.下面介绍具体的例子啦:

混合 (淡入淡出)

```html
<meta http-equiv="Page-Enter" content="blendTrans(Duration=2.0)" />
```

盒状收缩

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=0)"/>
```

盒状展开

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=1)"/>
```

圆形收缩

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=2)"/>
```

圆形放射

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=3)"/>
```

向上擦除

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=4)"/>
```

向下擦除

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=5)"/>
```

向右擦除

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=6)"/>
```

向左擦除

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=7)"/>
```

垂直遮蔽

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=8)"/>
```

水平遮蔽

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=9)"/>
```

横向棋盘式

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=10)" />
```

纵向棋盘式

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=11)" />
```

随机溶解

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=12)" />
```

左右向中央缩进

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=13)" />
```

中央向左右扩展

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=14)"/>
```

上下向中央缩进

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=15)" />
```

中央向上下扩展

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=16)" />
```

从左下抽出

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=17)" />
```

从左上抽出

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=18)"/>
```

从右下抽出

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=19)"/>
```

从右上抽出

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=20)" />
```

随机水平线条

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=21)" />
```

随机垂直线条

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=22)" />
```

随机

```html
<meta http-equiv="Page-Enter" content="revealTrans(Duration=2.0,Transition=23)" />
```

> 3.其他过渡效果:

Blinds（百叶窗）

```html
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Blinds(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Blinds(Duration=2)"/>

属性: bands (default=10), Direction (default="down"), Duration ( no default)

Barn（扫除）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Barn(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Barn(Duration=2)"/>

属性: duration, motion, orientation (default="vertical")
CheckerBoard（无数小格）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.CheckerBoard(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.CheckerBoard(Duration=2)"/>

属性: Direction (default="right"), squaresX (default=12), squaresY (default=10)
Fade（淡入淡出）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Fade(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Fade(Duration=2)" />

属性: duration, overlap (default=1.0)
GradientWipe（渐变扫除）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.GradientWipe(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.GradientWipe(Duration=2)"/>

属性: duration, gradientSize (default=0.25), motion
Inset（从一角扩散）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Inset(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Inset(Duration=2)" />

属性: duration
Iris（十字扩散）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Iris(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Iris(Duration=2)" />

属性: duration, irisStyle (default="PLUS"), motion
Pixelate（震动出来）

<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Pixelate(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Pixelate(Duration=2)" />

属性: duration, maxSquare (default=25)
RadialWipe（螺旋扩展）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.RadialWipe(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.RadialWipe(Duration=2)" />

属性: duration, wipeStyle (default="CLOCK")
RandomBars（线条遮罩）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.RandomBars(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.RandomBars(Duration=2)" />

属性: duration, orientation (default="horizontal")
RandomDissolve（像素遮罩）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.RandomDissolve(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.RandomDissolve(Duration=2)" />

属性: duration
Slide（拉幕）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Slide(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Slide(Duration=2)" />

属性: bands (default=1), duration, slideStyle (default="SLIDE")
Spiral（向心旋转）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Spiral(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Spiral(Duration=2)" />

属性: duration, gridSizeX (default=16), gridSizeY (default=16)
Stretch（两边开幕效果）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Stretch(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Stretch(Duration=2)"/>

属性: duration, stretchStyle (default="SPIN")
Strips（一角锯齿开幕）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Strips(Duration=2)"/>
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Strips(Duration=2)" />

属性: duration, motion
Wheel（十字旋转开幕）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.Wheel(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.Wheel(Duration=2)" />

属性: duration, spokes (default=4)
ZigZag（Z字形展开）
<meta http-equiv="Page-Enter" content="progid:DXImageTransform.Microsoft.ZigZag(Duration=2)" />
<meta http-equiv="Page-Exit" content="progid:DXImageTransform.Microsoft.ZigZag(Duration=2)"/>

属性: duration, gridSizeX, gridSizeY
...

```

好了,大家自己去试试..总会找到最适合你的啦...^_^