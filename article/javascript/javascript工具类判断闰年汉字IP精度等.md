# JavaScript工具类 （判断闰年，汉字，IP，精度等。。）

`原创` `2011-09-04 20:00:29`

去除首尾空格，检查字符串是否包含汉字，打开新窗口，验证ip，将浮点数规整为指定的精度，判断提供的字符串是否为空，判断提供的字符串是否为整数，判断输入的字符是否为大写或字母，判断输入的字符是否为0-9数字字符，判断提供的字符串只含有数字字符，判断闰年）
 

```js
/************************************************************************************
名称：	existChinese(strValue)
功能：	该函数用于检查字符串是否包含汉字
参数：	strValue---入参；字符串；待处理的字符串
返回：	布尔值； true--包含汉字； false--不包含汉字
引用：	无
说明：
**************************************************************************************/
function existChinese(strValue)
{
	var chrCode
	for(var iChar = 0; iChar < strValue.length; iChar++)
	{
		chrCode = strValue.charCodeAt(iChar);
		if(parseInt(chrCode) > 255)
		{
			return true;
		}
	}
	return false;
}
```

```js
/********************************************************************************
 **
 * 打开新窗口
 */
function openWindow(i_URL, i_Width, i_Height) {
    openWindow(i_URL, i_Width, i_Height, null, null);
}

function openWindow(i_URL, i_Width, i_Height, i_Feature) {
    openWindow(i_URL, i_Width, i_Height, null, i_Feature);
}
function openWindow(i_URL, i_Width, i_Height, i_WindowName, i_Feature)
{
    var v_URL = i_URL;
    var v_Width = i_Width;
    var v_Height = i_Height;
    var v_WindowName = i_WindowName;
    var v_Top;
    var v_Left;
    var v_Feature = "";
    if (v_WindowName == null) {
        v_WindowName = "myWindow";
    }

    var objWindow
    if (!objWindow || objWindow.closed)
    {
        v_Top = screen.availHeight / 2 - v_Height / 2 - 30;
        v_Left = screen.availWidth / 2 - v_Width / 2;
        v_Feature += "top=" + v_Top + ",";
        v_Feature += "left=" + v_Left + ",";
        v_Feature += "width=" + v_Width + ",";
        v_Feature += "height=" + v_Height + ",";
        if (i_Feature == null) {
            v_Feature += "directories=no,fullscreen=no,resizable=no,scrollbars=yes,status=1";
        } else {
            v_Feature += i_Feature;
        }
        objWindow = window.open(v_URL, v_WindowName, v_Feature);

        //objWindow=window.open (v_URL,v_WindowName,"directories=no,fullscreen=no,resizable=no,scrollbars=no,status=1");
        //v_Top=screen.availHeight/2-v_Height/2;
        //v_Left=screen.availWidth/2-v_Width/2;
        //objWindow.moveTo(v_Left,v_Top);
        //objWindow.resizeTo(v_Width,v_Height);
        objWindow.outerWidth = screen.availWidth;
        objWindow.outerHeight = screen.availHeight - 25;
    } else {
        objWindow.focus();
    }
    objWindow.focus();
}
```

```js
/************************************************************************************
名称： trim(strValue)
功能： 该函数用于去除字符串前后的空格
参数： strValue---入参；字符串；待处理的字符串
返回： 字符串
引用： 无
说明： 若为全空格字符串则返回空
**************************************************************************************/
function trim(strValue)
{
var iLTR, jRTL;
var chr;

//去除字符串前后的空格
for( iLTR = 0; iLTR < strValue.length; iLTR++ )
{
chr = strValue.charAt(iLTR) ;
if( chr != " " ) break;
}

if( iLTR == strValue.length ) return "";

//去除字符串前后的空格
for( jRTL = strValue.length - 1; jRTL >= 0; jRTL-- )
{
chr = strValue.charAt(jRTL);
if( chr != " " ) break;
}
return strValue.substring(iLTR, jRTL + 1);
}
```

```js
/*
 * 验证ip
 */
function checkIp(strIP) {
    if (isEmpty(strIP)) return false;
    
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
    if (re.test(strIP))
    {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
    }
    return false;
}
```

```js
/**
 * 将浮点数规整为指定的精度
 * @pram original_number 原始浮点数
 * @pram decimals 结果的小数位精度值
 * @return 规整后的浮点数
 */
function round_decimals(original_number , decimals)
{
	var result1 = original_number * Math.pow(10 , decimals);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10 , decimals);

	return(result3);
}
```

```js
/**
 * 判断提供的字符串是否为空
 * @param field 输入字符串
 * @return true/false
 */
function isEmpty(field)
{
	return ((field == null) || (field.length == 0) || myTrim(field)=="");
}


/**
 * 判断提供的字符串是否为整数
 * @param field 输入字符串
 * @return true/false
 */
function isInteger(field)
{
	s = myTrim(field);

	var i;

	if (isEmpty(field))
	{
		return false;
	}

	for (i=0; i<field.length; i++)
	{
		var c = field.charAt(i);

		if (!isDigit(c))
		{
			return false;
		}

		if(c==0&&i==0&&field.length>1)
		{
			return false;
		}
	}

	return true;
}


/**
 * 判断输入的字符是否为大写或字母字符
 * @param c 输入字符
 * @return true/false
 */
function isLetter(c)
{
	return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) );
}


/**
 * 判断输入的字符是否为0-9数字字符
 * @param c 输入字符
 * @return true/false
 */
function isDigit(c)
{
	return ((c >= "0") && (c <= "9"));
}
```

```js
/**
 * 判断提供的字符串只含有数字字符
 * @param field 输入字符串
 * @return true/false
 */
function isNumbers(field)
{
	field = myTrim(field);

	var i;

	for (i = 0; i < field.length; i++)
	{
		var c = field.charAt(i);

		if (!isDigit(c) )
		{
			return false;
		}
	}

	return true;
}
```

```js
/**
*判断闰年
* @param s 年
 @return true/false
**/
function isRunNian(s){
	//alert(s%4);
	if(s%4!=0){
		return false;
	}else{
		if(s%100!=0){
			return true;
		}else{
			if(s%400==0){
				return true;
			}else{
				return false;
			}
		}
	}
}
```
