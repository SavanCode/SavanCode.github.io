---
title: js closure
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 09:49:29
password:
summary:
tags: JS
categories:
---

# 基本作用域

Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。

![基本作用域例子](js-closure/1606362501029.png)

```js
var n=999;
function f1(){
　　alert(n); 
　　}
f1(); // 999
```



另一方面，在函数外部自然无法读取函数内的局部变量。

```js
　function f1(){
　　　　var n=999;
　　}
　　alert(n); // error
```

这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

```js
function f1(){
　　　　n=999;
　　}
　　f1();
　　alert(n); // 999
```

# 外部读取局部变量

1. 在函数的内部，再定义一个函数
2. 将内部函数值返回

```js
　function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n); // 999
　　　　}
　　}
```

Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

```js
function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
```

# 闭包实际概念

一个函数和对其周围状态（**lexical environment，词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**（**closure**）。

> 闭包就是能够读取其他函数内部变量的函数。
>
> 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
>
> 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以**读取函数内部的变量**，另一个就是**让这些变量的值始终保持在内存中**。

例子：

```js
function f1(){
　　　　var n=999;
　　　　nAdd=function(){n+=1}
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
　　nAdd();
　　result(); // 1000
```



自测

```js
　　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
```

```js
　var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
```





Reference：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html