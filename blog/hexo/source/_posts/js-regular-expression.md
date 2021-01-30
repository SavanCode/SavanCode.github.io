---
title: js question&solution
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-01 19:42:39
password:
summary:
tags: JS
categories: JS
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

