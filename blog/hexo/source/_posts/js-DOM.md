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

# DOM

（文档对象模型）Document Object Model

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

## 查找 HTML 元素/DOM

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

# DOM 集合

getElementsByTagName() 方法返回 *HTMLCollection* 对象。

```js
var x = document.getElementsByTagName("p");
y = x[1];//获取集合中的第二个p元素
```

length 属性定义了 HTMLCollection 中元素的数量

```js
var myCollection = document.getElementsByTagName("p");
document.getElementById("demo").innerHTML = myCollection.length;
//另一个实际利用
var myCollection = document.getElementsByTagName("p");
var i;
for (i = 0; i < myCollection.length; i++) {
    myCollection[i].style.backgroundColor = "red";
}

```

> HTMLCollection 并非数组！

# NodeList 对象

querySelectorAll() 方法返回 NodeList 对象。

```js
var myNodeList = document.querySelectorAll("p");
y = myNodeList[1];
//索引从 0 开始。
```

length 属性定义节点列表中的节点数

```js
var myNodelist = document.querySelectorAll("p");
document.getElementById("demo").innerHTML = myNodelist.length;
```

# HTMLCollection 与 NodeList 的区别

- HTMLCollection（前一章）是 HTML 元素的集合。
- NodeList 是文档节点的集合。
- NodeList 和 HTML 集合几乎完全相同。
- HTMLCollection 和 NodeList 对象都是类数组的对象列表（集合）。
- 它们都有定义列表（集合）中项目数的 length 属性。
- 它们都可以通过索引 (0, 1, 2, 3, 4, ...) 像数组那样访问每个项目。
- 访问 HTMLCollection 项目，可以通过它们的名称、id 或索引号。
- 访问 NodeList 项目，只能通过它们的索引号。
- 只有 NodeList 对象能包含属性节点和文本节点。
- 节点列表不是数组！
- 节点数组看起来像数组，但并不是。
- 您能够遍历节点列表并像数组那样引用其节点。
- 不过，您无法对节点列表使用数组方法，比如 valueOf()、push()、pop() 或 join()。

[HTMLCollection vs. NodeList](https://www.jianshu.com/p/f6ff5ebe45fd)

# DOM实例

[例子集合](https://www.runoob.com/js/js-ex-dom.html)

