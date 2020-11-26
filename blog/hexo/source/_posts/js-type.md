---
title: js type identification 数据类型查找
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-25 16:56:41
password:
summary:
tags: JS
categories:
---

# typeof

```js
console.log(typeof 'a');//'string'
console.log(typeof ('a'));//'string'
```

# instanceof

操作数是一个对象，右操作数是一个构造函数。如果左侧的对象是右侧构造函数的实例对象，则表达式返回true；否则返回false。

- 可以识别内置对象类型、自定义类型及其父类型
- 不能识别标准类型，会返回false
- 不能识别undefined、null，会报错

```js
console.log(123 instanceof function(){});//false
//Uncaught TypeError: Right-hand side of 'instanceof' is not an object
console.log({} instanceof 123);

console.log("jerry" instanceof String);//false
console.log(12 instanceof Number);//false
console.log(true instanceof Boolean);//false
console.log(undefined instanceof Undefined);//报错
console.log(null instanceof Null);//报错
console.log({name: "jerry"} instanceof Object);//true
```

# constructor

- 可以识别标准类型、内置对象类型及自定义类型

- 不能识别undefined、null，会报错，因为它俩没有构造函数


```js
console.log(("jerry").constructor);//function String(){[native code]}
console.log((12).constructor);//function Number(){[native code]}
console.log((true).constructor);//function Boolean(){[native code]}
console.log((undefined).constructor);//报错
console.log((null).constructor);//报错
console.log(({name: "jerry"}).constructor);//function Object(){[native code]}
```

# Object.prototype.toString()

```js
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
```