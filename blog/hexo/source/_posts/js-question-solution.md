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

## 3给基本类型数据添加属性，不报错，但取值时是undefined

```js
var a = 10;
a.pro = 10;
console.log(a.pro + a);

var s = 'hello';
s.pro = 'world';
console.log(s.pro + s);
```

- NaN undefinedhello
- 给基本类型数据加属性不报错，但是引用的话返回undefined,10+undefined返回NaN,而undefined和string相加时转变成了字符

## promise - 下面代码的执行结果是

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
```

输出结果如下：

```javascript
'promise1'
'1' Promise{<resolved>: 'resolve1'}
'2' Promise{<pending>}
'resolve1'
```

需要注意的是，直接打印promise1，会打印出它的状态值和参数。

这里说一下这道题的具体思路：

- script是一个宏任务，按照顺序执行这些代码
- 首先进入Promise，执行该构造函数中的代码，打印`promise1`
- 碰到`resolve`函数, 将`promise1`的状态改变为`resolved`, 并将结果保存下来
- 碰到`promise1.then`这个微任务，将它放入微任务队列
- `promise2`是一个新的状态为`pending`的`Promise`
- 执行同步代码1， 同时打印出`promise1`的状态是`resolved`
- 执行同步代码2，同时打印出`promise2`的状态是`pending`
- 宏任务执行完毕，查找微任务队列，发现`promise1.then`这个微任务且状态为`resolved`，执行它。

这样，就执行完了所有的的代码。

## promise 执行

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
//1
//2
//4
//timerStart
//timerEnd
//success
```



## promise 执行

```js
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
//'start'
//'promise1'
//'timer1'
//'promise2'
//'timer2'
```

- 首先，`Promise.resolve().then`是一个微任务，加入微任务队列
- 执行timer1，它是一个宏任务，加入宏任务队列
- 继续执行下面的同步代码，打印出start
- 这样第一轮的宏任务就执行完了，开始执行微任务，打印出`promise1`
- 遇到timer2，它是一个宏任务，将其加入宏任务队列
- 这样第一轮的微任务就执行完了，开始执行第二轮宏任务，指执行定时器timer1,打印timer1
- 遇到Promise，它是一个微任务，加入微任务队列
- 开始执行微任务队列中的任务，打印promise2
- 最后执行宏任务timer2定时器，打印出timer2

## promise执行结果

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

执行结果为：

```javascript
1
Promise {<fulfilled>: undefined}
```

Promise.resolve方法的参数如果是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为resolved，Promise.resolve方法的参数，会同时传给回调函数。

then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会传递下面。

**`.then` 或`.catch` 的参数期望是函数，传入非函数则会发生值透传**

## promise执行结果

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000) 
```

输出的结果如下：

```javascript
promise1 Promise {<pending>}
promise2 Promise {<pending>}

Uncaught (in promise) Error: error!!!
promise1 Promise {<fulfilled>: "success"}
promise2 Promise {<rejected>: Error: error!!}
```

## promise的执行结果

```javascript
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
```

返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的`return new Error('error!!!')`也被包裹成了`return Promise.resolve(new Error('error!!!'))`。

因此它被then捕获而不是catch，输出结果为：

```javascript
"then: " "Error: error!!!"
```

换个新题

```js
Promise.resolve()
  .then(function success (res) {
    throw new Error('error!!!')
  }, function fail1 (err) {
    console.log('fail1', err)
  }).catch(function fail2 (err) {
    console.log('fail2', err)
  })
```



## promise的执行结果

```javascript
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
复制代码
```

`.then`函数中的两个参数：

- 第一个参数是用来处理Promise成功的函数
- 第二个则是处理失败的函数

也就是说`Promise.resolve('1')`的值会进入成功的函数，`Promise.reject('2')`的值会进入失败的函数。

在这道题中，错误直接被`then`的第二个参数捕获了，所以就不会被`catch`捕获了，输出结果为：`'error' 'error!!!'`

## promise

```javascript
function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));

Promise.all([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));
```

**`all`和`race`传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。**

## async下面代码的执行结果

```javascript
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
//script start
//async1 start
//promise1
//script end
```

这里需要注意的是在`async1`中`await`后面的Promise是没有返回值的，也就是它的状态始终是`pending`状态，所以在`await`之后的内容是不会执行的，也包括`async1`后面的 `.then`。

## async下面代码的执行结果

```js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
```



## async下面代码的执行结果

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log('script end')
```

## async下面代码的执行结果

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log('script end')
```

## 综合promise

```js
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
```

