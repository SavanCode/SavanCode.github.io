---
title: js error
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 15:14:24
password:
summary:
tags: JS
categories: JS
---

# error 参数

- try语句可以测试代码块是否存在错误
- catch语句使您可以处理错误
- throw语句使您可以创建自定义错误 
- finally语句使您可以在尝试捕获后执行代码，而不管结果如何



```js
function myFunction() {
  var message, x;
  message = document.getElementById("p01");
  message.innerHTML = "";
  x = document.getElementById("demo").value;
  try {
    if(x == "") throw "is empty";
    if(isNaN(x)) throw "is not a number";
    x = Number(x);
    if(x > 10) throw "is too high";
    if(x < 5) throw "is too low";
  }
  catch(err) {
    message.innerHTML = "Error: " + err + ".";
  }
  finally {
    document.getElementById("demo").value = "";
  }
}
```



# error对象属性

| Property | Description       |
| :------- | :---------------- |
| name     | 设置返回error名字 |
| message  | 设置返回error信息 |

# Error类型

- EvalError(eval函数错误)
- RangeError(超出范围错误)
- ReferenceError(引用不存在值错误)
- SyntaxError(语法错误)
- TypeError(类型错误)
- URIError(URI错误)

# error事件

```js
//DOM0级
window.onerror = function(message,url,line){
    alert(message);
}
//DOM2级
window.addEventListener("error",function(message,url,line){
    alert(message);
});
```

```js
//控制台显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return false;
}
a;

//控制台不显示错误消息
window.onerror = function(message,url,line){
    alert(message);
    return true;
}
```

```js
var image = new Image();
image.src = 'smilex.gif';
image.onerror = function(e){
    console.log(e);
}
```