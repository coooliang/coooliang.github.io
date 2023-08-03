# js如何优雅处理TypeError: Cannot read properties of undefined

`原创` `2022-05-09 09:10:32`

## 方式一：

```java
function lodash_get(path){
    let result = window;
    const paths = path.split(".");
    for(const p of paths){
        result = Object(result)[p];
        if(result == undefined){
            return result;
        }
    }
    return result;
}

var getItem = lodash_get("plugins.stringMapPlugin.getItem");
if(getItem){
    getItem("key");
}

var setItem = lodash_get("plugins.stringMapPlugin.setItem");
if(setItem){
    setItem("name","123");
}
```

## 方式二：

```java
try{
    plugins.stringMapPlugin.getItem("key");
}catch(err){
    console.log("error = " + err);
}
```
