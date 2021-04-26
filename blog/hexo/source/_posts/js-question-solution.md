---
title: js 零散测试题
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-01 19:42:39
password:
summary: js 小问题收集
tags: JS
categories: [JS,interview]
---

## 1.this 与 event.target的区别

使用listener的时候， this可以跟踪对应的listener持有者。 event.target是当前的时间互动触发点

## 2.作用域

```js
function loo(){
	vargoo=1;moo();}
function moo(){
	console.log(goo);}
loo();
//UncaughtReferrenceError:goo is not defined
```

## 3给基本类型数据添加属性，不报错，但取值时是undefined

```js
var a = 10;
a.pro = 10;
console.log(a.pro + a);

var s = 'hello';
s.pro = 'world';
console.log(s.pro + s);
```

- NaN undefined hello
- 给基本类型数据加属性不报错，但是引用的话返回undefined,10+undefined返回NaN,而undefined和string相加时转变成了字符

