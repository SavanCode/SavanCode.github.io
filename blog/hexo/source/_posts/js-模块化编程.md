---
title: js 模块化编程
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 10:20:17
password:
summary:
tags: JS
categories:
---

# JS模块写法

## 一般写法

```js
　function m1(){
　　　　//...
　　}

　　function m2(){
　　　　//...
　　}
```

缺点："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

## 对象写法

```js
　　var module1 = new Object({
　　　　_count : 0,
　　　　m1 : function (){
　　　　　　//...
　　　　},
　　　　m2 : function (){
　　　　　　//...
　　　　}
　　});
```

缺点：写法会暴露所有模块成员，内部状态可以被外部改写（对象私有属性会被改）

## 立即执行函数写法-Immediately-Invoked Function Expression，IIFE（不算做严谨闭包）

达到不暴露私有成员的目的

是为了形成块级作用域，不污染全局。常用的写法有：

- (function(形参){函数体})(实参)
- (function(形参){函数体}(实参))
- !function(形参){函数体}(实参)

```js
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
```

甚至像下面这样写，也是可以的。

```js
!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
```



```js
　　var module1 = (function(){
　　　　var _count = 0;
　　　　var m1 = function(){
　　　　　　//...
　　　　};
　　　　var m2 = function(){
　　　　　　//...
　　　　};
　　　　return {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();

console.info(module1._count); //undefined
```

 

## 放大模式

```js
　　var module1 = (function (mod){
　　　　mod.m3 = function () {
　　　　　　//...
　　　　};
　　　　return mod;
　　})(module1);
```

## 宽放大模式（Loose augmentation）

```js
　var module1 = ( function (mod){
　　　　//...
　　　　return mod;
　　})(window.module1 || {});
```

与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

## 输入全局变量

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

```js
　　var module1 = (function ($, YAHOO) {

　　　　//...

　　})(jQuery, YAHOO);
```



## 实际应用

在定时器、事件监听器、 Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步(或者同步)任务中，只要使用了回调函
数，实际上就是在使用闭包!
定时器闭包案例：

```js
function wait(message) {
setTimeout( function timer() {
console.log( message );
}, 1000 );
}
wait( "Hello, closure!" );
```

事件监听闭包案例：

```js
function setupBot(name, selector) {
$(selector).click( function activator() {
console.log( "Activating: " + name );
});
}
setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );
```

上面的案例中，有个相同的特点：先定义函数，后执行函数时能够调用到函数中的私有变量或者实参。这便是闭包的特点吧

#  自测

- 下面代码会输出什么？

```js
for (var i=1; i<=5; i++) {
 setTimeout( function timer() {
 console.log( i );
 }, i*1000 );
}
```

答案：5个6

- 如何处理能够输出1-5

```js
// 闭包方式
for (var i=1; i<=5; i++) {
 (function(index) {
 setTimeout( function timer() {
 console.log( index );
 }, index*1000 );
 })(i)
}
// ES6 方式
for (let i=1; i<=5; i++) {
 setTimeout( function timer() {
 console.log( i );
 }, i*1000 );
}
```

