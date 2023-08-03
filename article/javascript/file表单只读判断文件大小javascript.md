# File表单 只读 判断文件大小(javascript)

`原创` `2011-03-25 10:51:00`

首先要说明的是这个会有警告。。。可以使用swfupload

```html
<html>  
<head>  
<script>
function getFileSize(){
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    if(isIE){
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");//会有警告，只能用swfupload
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    }else{
        fileSize = target.files[0].size;
    }
    alert(fileSize);
}
</script>
<script type="text/javascript">
    //判断文件大小    
    function getFileSize(filePath) {    
        if (filePath.value == null || filePath.value.length == 1) {    
            return true;    
        }    
        var image = new Image();    
        image.dynsrc = filePath.value;    
        if (image.fileSize > 5242880) {    
            alert(filePath.value + " /r/n 大于5M!请选择其它文件");    
            filePath.outerHTML += '';    
            return false;    
        }    
        return true;    
    }   
    // 对应起删除与输入框 的联系  
var idForFile = 0;  
function addFileInput(){  
        var rowCount = fileInput.rows.length;  
        if(rowCount > 3){  
            alert("最大附件数为3个！");  
        }else{  
            var vtr = fileInput.insertRow();  
            var vtd1 = vtr.insertCell();  
            var vtd2 = vtr.insertCell();  
            vtd1.innerHTML = "<input type='file' name='upload' οnkeypress='return   false;' οnpaste='return false;' ContentEditable='false' οnchange='getFileSize(this)'/>";  
            vtd2.innerHTML = "<input type='button' value='删除' οnclick='fileInput.deleteRow(this.parentNode.parentNode.rowIndex)'>"  
        }  
}  
</script>  
</head>  
<body>  
<!--  
这个table和ID不能少 因为方法里有用到  
结构应为:  
<table>  
<tr>  
<td>   
<input type="file" />  
</td>  
<td>  
<input type="button"/>  
</td>  
</tr>  
</table>  
-->  
<table id="fileInput">  
<tr>  
    <td>  
            <input type='file' name='upload' οnkeypress='return   false;' οnpaste='return false;' ContentEditable='false' οnchange='getFileSize(this)'/>       
    </td>  
    <td>    
        <input type='button' value='删除' οnclick='fileInput.deleteRow(this.parentNode.parentNode.rowIndex)'>  
    </td>  
<tr>                                     
    </table>  
    <input type="button" value="添加附件" οnclick="addFileInput()" />   
    <br />  
</body>  
</html>
```
