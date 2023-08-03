# sort文本框的排序

`原创` `2012-03-22 22:50:19`

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
 
<SCRIPT type="text/javascript" src="../jquery-1.4.2.js"></SCRIPT>
<script type="text/javascript"> 
	function sorttable(){
		var sortDiv = $("#sortDiv");
		var lib = new Array();
		var tables = $("table",sortDiv);
		var resultArr = arrSort(tables);//排序好的数组，不会新增元素。
		$("#sortDiv").append(resultArr);
		$("#sortDiv").css("opacity",0).animate({"opacity":1,width:"-="+20},500,'linear');
		$("#sortDiv").css("opacity",0).animate({"opacity":1,width:"+="+20},500,'swing');
 
	}
	function arrSort(arr){
		for(var i=1;i<arr.length;i++){
			for(var j=0;j<i;j++){
				var iage = $(arr[i]).find("input[name$='.age']").val();
				var jage = $(arr[j]).find("input[name$='.age']").val();
				if(parseInt(iage) < parseInt(jage)){
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}			
		}
		return arr;
	}
 
	function appendtable(){
		var newtable = $('<table><tr><td>1</td><td><input name="user.age" type="text" value="5"/></td></tr></table>');
		$("#sortDiv").append(newtable);
	}
</script>
</head>
 
<body>
<br/><br/><br/><br/><br/><br/><br/>
	<div id="bodyDiv">
		<div id="sortDiv" style="background:red;width:300px;">
			<table><tr><td>1</td><td><input name="user.age" type="text" value="3"/></td></tr></table>
			<table><tr><td>1</td><td><input name="user.age" type="text" value="2"/></td></tr></table>
			<table><tr><td>1</td><td><input name="user.age" type="text" value="1"/></td></tr></table>
			<table><tr><td>1</td><td><input name="user.age" type="text" value="6"/></td></tr></table>
		</div>
		<input type="button" οnclick="sorttable()" value="sort"/>
		<input type="button" οnclick="appendtable()" value="append"/>
	</div>
</body>
 
</html>
```