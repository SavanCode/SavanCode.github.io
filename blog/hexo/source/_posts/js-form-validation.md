---
title: js form validation 表单验证
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 18:46:00
password:
summary:
tags: JS
categories:
---

# 基本使用JS

## 添加交互事件

```html
<h1 onclick="this.innerHTML='Ooops!'">点击文本!</h1>
```

<h1 onclick="this.innerHTML='Ooops!'">点击文本!</h1>

## 操作DOM元素

```js
//例：向button元素分配onclick事件：
document.getElementById("myBtn").onclick=function(){displayDate()};
```

## 操作css

```js
//语法
dom.style.属性名 = 属性值;
//例如：
document.getElementsByClassName('box')[0].style.background = 'red';
```

# 验证表单

## 必填（或必选）

```
<script>
function validateForm(){
var x=document.forms["myForm"]["fname"].value;
if (x==null || x==""){
  alert("姓必须填写");
  return false;
  }
}
</script> 

<form name="myForm" action="demo-form.php" onsubmit="return validateForm()" method="post">
姓: <input type="text" name="fname">
<input type="submit" value="提交">
</form>
```

## Email验证

检查输入的数据是否符合电子邮件地址的基本语法，只能做些基本检查：

输入的数据必须包含 @ 符号和点号(.)。同时，@ 不可以是邮件地址的首字符，并且 @ 之后需有至少一个点号

```html
<form name="myForm" action="demo-form.php" onsubmit="return validateForm();" method="post">
    Email: <input type="text" name="email">
    <input type="submit" value="提交">
</form>

function validateForm(){
  var x=document.forms["myForm"]["email"].value;
  var atpos=x.indexOf("@");
  var dotpos=x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
    alert("不是一个有效的 e-mail 地址");
    return false;
  }
}
```

