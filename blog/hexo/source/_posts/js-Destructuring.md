---
title: js Destructuring 解构
top: false 
cover: false
toc: true
mathjax: true
date: 2021-03-06 17:11:35
password:
summary: ES6 解构技巧
tags: [JS,es6]
categories: JS
---

之前都很零零散散的写在各种数据类型下面，这里统一的es6写一下

## array 解构
```js
let [a, b, c] = ["1", 2, 3]; // a = "1" // b = 2 // c = 3
```
### 可嵌套
```js
let [a, [[b], c]] = [1, [[2], 3]]; // a = 1 // b = 2 // c = 3
```
### 可忽略
```js
let [a, , b] = [1, 2, 3]; // a = 1 // b = 3
let [y , z] = [1,2,3,4,5]; //y=1 z=2
```
### 不完全解构
```js
let [a = 1, b] = []; // a = 1, b = undefined
```
### 剩余运算符
```js
let [a, ...b] = [1, 2, 3]; //a = 1 //b = [2, 3]
```
### 字符串等

在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 Iterator 接口的数据。
```js
let [a, b, c, d, e] = 'hello'; // a = 'h' // b = 'e' // c = 'l' // d = 'l' // e = 'o'
```

### 解构,带有默认值
```js
let [a = 2] = [undefined]; // a = 2
```
当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。
```js
let [a = 3, b = a] = []; // a = 3, b = 3 
let [a = 3, b = a] = [1]; // a = 1, b = 1 
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```
- a 与 b 匹配结果为 undefined ，触发默认值：**a = 3; b = a =3**
- a 正常解构赋值，匹配结果：a = 1，b 匹配结果 undefined ，触发默认值：**b = a =1**
- a 与 b 正常解构赋值，匹配结果：**a = 1，b = 2**

## Object解构

### 基本
```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }; // foo = 'aaa' // bar = 'bbb' 
let { baz : foo } = { baz : 'ddd' }; // foo = 'ddd'
```
### 可嵌套可忽略
```js
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj; // x = 'hello' // y = 'world' 
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj; // x = 'hello'
```
### 不完全解构
```js
let obj = {p: [{y: 'world'}] }; 
let {p: [{ y }, x ] } = obj; // x = undefined // y = 'world'
```
### 剩余运算符
```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}; 
// a = 10 // b = 20 // rest = {c: 30, d: 40}
```
### 解构默认值
```js
let {a = 10, b = 5} = {a: 3}; // a = 3; b = 5; 
let {a: aa = 10, b: bb = 5} = {a: 3}; // aa = 3; bb = 5;
```

### 计算对象属性解构

```js
let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"
```

### 结构查找原型

```js
// 声明对象 和 自身 self 属性
var obj = {self: '123'};
// 在原型链中定义一个属性 prot
obj.__proto__.prot = '456';
// test
const {self, prot} = obj;
// self "123"
// prot "456"（访问到了原型链）
```



## function解构

```js
function f() { return [1, 2, 3]; }

var a, b;
[a, ,b] = f();
console.log(a); // 1
console.log(b); // 3
```

## Reference

[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)