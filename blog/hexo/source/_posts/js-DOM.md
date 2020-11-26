---
title: js DOM
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 16:53:38
password:
summary:
tags: JS
categories:
---

# DOM（文档对象模型）Document Object Model

## getElementById 方法

```html
<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "Hello World!";
</script>
```

## innerHTML 属性

innerHTML 属性可用于获取或替换 HTML 元素的内容。

innerHTML 属性可用于获取或改变任何 HTML 元素，包括 <html> 和 <body>。

## 查找 HTML 元素

### 通过标签

| 方法                                    | 描述                   |
| :-------------------------------------- | :--------------------- |
| document.getElementById(*id*)           | 通过元素 id 来查找元素 |
| document.getElementsByTagName(*name*)   | 通过标签名来查找元素   |
| document.getElementsByClassName(*name*) | 通过类名来查找元素     |

### 通过 CSS 选择器查找 HTML 元素

```js
var x = document.querySelectorAll("p.intro");
```

### 查找html form元素

本例查找 id="frm1" 的 form 元素，在 forms 集合中，然后显示所有元素值

```html
<form id="frm1" action="/demo/action_page.php">
  First name: <input type="text" name="fname" value="Bill"><br>
  Last name: <input type="text" name="lname" value="Gates"><br><br>
  <input type="submit" value="提交">
</form> 

<script> //打印出框中内容
function myFunction() {
  var x = document.forms["frm1"];
  var text = "";
  var i;
  for (i = 0; i < x.length ;i++) {
    text += x.elements[i].value + "<br>";
  }
  document.getElementById("demo").innerHTML = text;
}
</script>
```



## 改变 HTML 元素

| 方法                                                         | 描述                   |
| :----------------------------------------------------------- | :--------------------- |
| element.innerHTML = *new html content*<br />*document.write()* | 改变元素的 inner HTML  |
| element.attribute = *new value*<br />document.getElementById("myImage").src = "landscape.jpg"; | 改变 HTML 元素的属性值 |
| element.setAttribute(*attribute*, *value*)                   | 改变 HTML 元素的属性值 |
| element.style.property = *new style*                         | 改变 HTML 元素的样式   |

## 添加和删除元素

| 方法                              | 描述             |
| :-------------------------------- | :--------------- |
| document.createElement(*element*) | 创建 HTML 元素   |
| document.removeChild(*element*)   | 删除 HTML 元素   |
| document.appendChild(*element*)   | 添加 HTML 元素   |
| document.replaceChild(*element*)  | 替换 HTML 元素   |
| document.write(*text*)            | 写入 HTML 输出流 |

## 添加事件处理程序

| 方法                                                     | 描述                            |
| :------------------------------------------------------- | :------------------------------ |
| document.getElementById(id).onclick = function(){*code*} | 向 onclick 事件添加事件处理程序 |

## 改变css

语法：document.getElementById(id).style.property = new style

```html
<script>
document.getElementById("p2").style.color = "blue";
</script>
<p id="p2">Hello World!</p>

<h1 id="id1">我的标题 1</h1>
<button type="button" onclick="document.getElementById('id1').style.color = 'red'">
点击我！
</button>
```

## DOM事件

[基本事件总结表](https://developer.mozilla.org/zh-CN/docs/Web/Events)

## DOM 事件监听程序

### 语法

```js
element.addEventListener(event, function, useCapture);
```

第一个参数是事件的类型（比如 "click" 或 "mousedown"）。

第二个参数是当事件发生时我们需要调用的函数。

第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。

**注意：**请勿对事件使用 "on" 前缀；请使用 "click" 代替 "onclick"。

### 添加单个或者多个监听

```js
//单个元素单个事件
element.addEventListener("click", function(){ alert("Hello World!"); });
```

```js
//单个元素
element.addEventListener("click", myFunction);
element.addEventListener("click", mySecondFunction);
```

```js
//单个元素多个不同事件
element.addEventListener("mouseover", myFunction);
element.addEventListener("click", mySecondFunction);
element.addEventListener("mouseout", myThirdFunction);
```

```js
//自定义
element.addEventListener("resize", function(){
    document.getElementById("demo").innerHTML = sometext;
});
```

```js
//有参数
element.addEventListener("click", function(){ myFunction(p1, p2); });
```

### 删除事件监听

```js
element.removeEventListener("mousemove", myFunction);
```