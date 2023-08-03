# JavaScript判断是否含有全角

`原创` `2011-08-22 14:56:59`

```js
function resolvUgcChar(str) {
  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c == '?' || c == '？' || c == '&' || c == '<'
      || c == '>' || c == '\'' || c == '‘' || c == '\"' || c == '“' || c == '”'
      || c == '@' || c == '#' || c == '\\'
      || c == '\/' || c == '$' || c == '\^'
      || c == ';' || c == '；' || c == ':' || c == '：' || c == '%'
      || c == '!' || c == '！' || c == '|') {
      return true;
    }
    //全角处理
    strCode = str.charCodeAt(i);
    if ((strCode > 65248) || (strCode == 12288)) {
      //alert("有全角");
      return true;
    }
  }
  return false;
}
```