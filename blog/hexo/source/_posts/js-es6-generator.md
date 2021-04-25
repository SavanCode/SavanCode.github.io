---
title: js ES6 Generator 函数
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-07 19:34:07
password:
summary: ES6 Generator 函数
tags: [JS,es6]
categories: JS
---

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行)

## 基础语法

enerator 函数组成
Generator 有两个区分于普通函数的部分：

一是在 function 后面，函数名之前有个 * ；

函数内部有 yield 表达式。

其中 * 用来表示函数为 Generator 函数，yield 用来定义函数内部的状态。

```js
function* func(){
     console.log("one");
     yield '1';
     console.log("two");
     yield '2'; 
     console.log("three");
     return '3';
}
```

### 函数返回的遍历器对象的方法

#### next 方法

一般情况下，next 方法不传入参数的时候，yield 表达式的返回值是 undefined 。当 next 传入参数的时候，该参数会作为上一步yield的返回值。

```js
var sendp1 = sendParameter();
sendp1.next();
// start
// {value: "2", done: false}
sendp1.next();
// one:undefined
// {value: "3", done: false}
sendp1.next();
// two:undefined
// total:NaN
// {value: undefined, done: true}

var sendp2 = sendParameter();
sendp2.next(10);
// start
// {value: "2", done: false}
sendp2.next(20);
// one:20
// {value: "3", done: false}
sendp2.next(30);
// two:30
// total:50
// {value: undefined, done: true}
```

#### return 方法

return 方法返回给定值，并结束遍历 Generator 函数。

return 方法提供参数时，返回该参数；不提供参数时，返回 undefined 

```js
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
var f = foo();
f.next();
// {value: 1, done: false}
f.return("foo");
// {value: "foo", done: true}
f.next();
// {value: undefined, done: true}
throw 方法
throw 方法可以再 Generator 函数体外面抛出异常，再函数体内部捕获。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('catch inner', e);
  }
};
 
var i = g();
i.next();
 
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('catch outside', e);
}
// catch inner a
// catch outside b
```

遍历器对象抛出了两个错误，第一个被 Generator 函数内部捕获，第二个因为函数体内部的catch 函数已经执行过了，不会再捕获这个错误，所以这个错误就抛出 Generator 函数体，被函数体外的 catch 捕获。

#### yield\* 表达式

yield* 表达式表示 yield 返回一个遍历器对象，用于在 Generator 函数内部，调用另一个 Generator 函数。

```js
function* callee() {
    console.log('callee: ' + (yield));
}
function* caller() {
    while (true) {
        yield* callee();
    }
}
const callerObj = caller();
callerObj.next();
// {value: undefined, done: false}
callerObj.next("a");
// callee: a
// {value: undefined, done: false}
callerObj.next("b");
// callee: b
// {value: undefined, done: false}
 
// 等同于
function* caller() {
    while (true) {
        for (var value of callee) {
          yield value;
        }
    }
}
```

## 使用场景

**实现 Iterator**

为不具备 Iterator 接口的对象提供遍历方法。

 ```js
function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for (const propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
 
const jane = { first: 'Jane', last: 'Doe' };
for (const [key,value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
 ```

### 执行异步任务

## 额外知识点

### generator的this 

**Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的`prototype`对象上的方法。**

```javascript
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

> 上面代码表明，**Generator 函数`g`返回的遍历器`obj`，是`g`的实例**，而且继承了`g.prototype`。但是，如果把`g`当作普通的构造函数，并不会生效，因为**`g`返回的总是遍历器对象，而不是`this`对象。**

### generator 与上下文

> 这里先估计大家理解context 上下文 以及 执行栈 call stack的运行机制

Generator 函数与普通的call stack函数运行是不一样的，它执行产生的上下文环境，一旦遇到`yield`命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行`next`命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

## Reference 

[Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)

