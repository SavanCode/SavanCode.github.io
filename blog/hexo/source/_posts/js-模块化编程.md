---
title: js 模块化编程
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-26 10:20:17
password:
summary: JS 模块写法
tags: JS
categories: JS
---

![](js-模块化编程/167b650e8d1fcc23.png)

## 模块化的基本了解

- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

简单的说就是当你越写越多文件，或者说越来越团队化工作会出现的互相引用变量的问题

## 一般写法-全局function

```js
　function m1(){
　　　　//...
　　}

　　function m2(){
　　　　//...
　　}
```

> 缺点："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

## 对象封装写法

```js
var module1 = new Object({
	_count : 0,
    flag:false,
	m1 : function (){
 		 //...
	},
	m2 : function (){
 	 //...
	}
});
//引用变量
if(module1.flag){
   //...
}
```

> 缺点：写法会暴露所有模块成员，内部状态可以被外部改写（对象私有属性会被改）

## 立即执行函数写法-Immediately-Invoked Function Expression，IIFE（不算做严谨闭包）

达到不暴露私有成员的目的, 这样保证了数据是私有的, 外部只能通过暴露的方法操作 

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

### IIFE模式：匿名函数自调用(闭包)

```html
// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>
```
```js
// module.js文件
(function(window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar } //ES6写法
})(window)
```

![](js-模块化编程/image-20210214110153534.png)


> 问题: 如果当前这个模块依赖另一个模块怎么办?

### IIFE模式增强 : 引入依赖 - 现代模块实现的基石

```js
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
```
```html
<!--  index.html文件 引入的js必须有一定顺序 -->
  <script type="text/javascript" src="jquery-1.10.1.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
    myModule.foo()
  </script>
```

上例子通过jquery方法将页面的背景颜色改成红色，所以必须先引入jQuery库，就把这个库当作参数传入。

> **这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显**。

### 放大模式

```js
var module1 = (function (mod){
　　mod.m3 = function () {
　　　　//...
　　};
　　return mod;
})(module1);
```

### 宽放大模式（Loose augmentation）

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

##  模块化的好处

- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性

## 引入多个`<script>`后出现出现问题

- 请求过多

首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多

- 依赖模糊

我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错。

- 难以维护

## 实际应用 (跳过)

在定时器、事件监听器、 Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步(或者同步)任务中，只要使用了回调函数，实际上就是在使用闭包!

### 定时器闭包案例：

```js
function wait(message) {
setTimeout( function timer() {
console.log( message );
}, 1000 );
}
wait( "Hello, closure!" );
```

### 事件监听闭包案例：

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

### Currying

```js
//Un-curried function
function unCurried(x, y) {
  return x + y;
}

//Curried function
function curried(x) {
  return function(y) {
    return x + y;
  }
}
//Alternative using ES6
const curried = x => y => x + y

curried(1)(2) // Returns 3
```

```js
function add(x) {
  // Only change code below this line
return function(y) {
    return function(z) {
      return x + y + z;
    };
  };
  // Only change code above this line
}
add(10)(20)(30);
```

## 最流行的commonjs, AMD, CMD , ES6 规范

###  CommonJS的模块化 - 最早期的

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。**加载某个模块，其实是加载该模块的module.exports属性**

#### 基本语法

- 暴露模块：`module.exports = value`或`exports.xxx = value`
- 引入模块：`require(xxx)`,如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

#### 引入整个模块

```js
// example.js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

```js
var example = require('./example.js'); 
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

#### 引入变量

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

```js
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```

### ES6模块化 - 最香的

**ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案**

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

```js
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };
```
```js
/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
} 
```

如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}
```
```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```



### ES6 模块与 CommonJS 模块的差异

**① CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**。

**② CommonJS 模块是运行时加载，ES6 模块是编译时输出接口**。



> CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。 最后出现的是最香的ES6的。
>
> 剩下部分关于AMD CMD 请到博客原文看哦~ 毕竟我没有看这两块



##  自测

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

## Reference

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768#heading-7)