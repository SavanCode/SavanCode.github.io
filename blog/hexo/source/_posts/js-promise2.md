---
title: js promise2 拓展 针对细节面试题
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-21 08:40:55
password:
summary: promise2 拓展 针对细节面试题
tags: [JS,JS Async]
categories: JS
---

## Promise 异步请求串行&并行执行实现

给定一个数组urls，里面保存着一组请求的url。通过调用一个getResponse(url)方法 发送异步请求。该方法返回值为一个promise。 

```js
var urls = ['url1','url2','url3','url4'];
const getResponse = (url)=>{
	return new Promise((resolve,reject)=>{
		console.log('参数为：',url)
		setTimeout(()=>{
			console.log('异步请求后结果为','afeter'+url);
			resolve("success")
		},1000)
	})
}
```

实现两个方法，分别实现这些并行和串行的请求。

### 并行

```js
//模拟实现promise.all
const parallel = function (promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new Error('传入的参数必须得是数组格式'))
        }
        let res = []
        let count;
        promises.forEach((promise, index) => {
        	// 这里其实需要判断一下, 当前遍历的promise是否是Promise类型, 但是, 这里没有判断, 想想是因为什么原因. 
            //依照 promises 规范，一旦一个 promise 被创建，它就被执行了
            Promise.resolve(promise).then(
                data => {
                    // 注意点1: index用来保证按序存储
                    res[index]  = data
                    count++
                    // 注意点2: count用来保证获取到了想要的所有数据
                if(count === promises.length) {
                    resolve(res)}
            }, err => reject(err)
            )
        })
    })
}
```

### 串行

执行过程大致是下面的样子：

```text
Task A | ------>|
Task B |         ------>|
Task C |                 ------>|
Task D |                         ------>|
```

#### 写法一 for loop +await

```js
async function execute(tasks) {
  let result = [];
  for (const task of tasks) {
    try {
      result.push(await task());
    } catch (err) {
      result.push(null);
    }
  }

  return result;
}
```

#### 写法二 reduce

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

```js
function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(() => nextPromise()),Promise.resolve()
  );
}
```

#### 写法三 递归 +promise

```js
function runPromisesSerially([curTask, ...restTasks]) {
  const p = Promise.resolve()
  if (!curTask) return p
  return p.then(curTask).then(() => runPromisesSerially(restTasks))
}
```

#### 写法四 `Generator`

Generator本身只是一个状态机，需要通过调用`promise.then()`来改变它的状态，实现`promises`的串行执行。

```js
function runPromisesSerially(tasks) {
  function *gen() {
    for (const task of tasks) {
      yield task()
    }
  }
  const g = gen()
  function next(val) {
    const result = g.next(val)
    if (result.done) return result.value
    result.value.then(val => next(val))
  }
  next()
}
```

#### `for await of`

需要自己实现可异步迭代的对象供`for await of`调用。

```js
async function runPromisesSerially([...tasks]) {
  const asyncIterable = {
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        next() {
          const task = tasks[this.i++]
          return task
            ? task().then(value => ({ done: false, value }))
            : Promise.resolve({ done: true })
        }
      }
    }
  }

  for await (val of asyncIterable) {
    // do something
  }
}
```

#### `for await of` + `Async Generator`

本质上是异步生成器函数（）执行会自动生成异步迭代器，然后异步迭代器可配合`for await of`实现串行运行`promises`。

```js
async function runPromisesSerially(tasks) {
  async function* asyncGenerator() {
    let i = 0
    while (i < tasks.length) {
      const val = await tasks[i]()
      i++
      yield val
    }
  }

  for await (val of asyncGenerator()) {
    // do something
  }
}
```

## 增加理解的异步进化练习

```js
//红绿黄每隔一秒亮一次；如何让三个灯不断交替重复亮灯？
function red(){
  console.log('red- ', new Date());
}
function green(){
  console.log('green- ', new Date());
}
function yellow(){
  console.log('yellow- ', new Date());
}
```

```js
//promise
function tic(callback) {
return new Promise((resolve, reject) => {
  setTimeout(() => {
    callback()
    resolve()
  }, 500)
})
}

function run(){
//tic(red).then(()=>{tic(green)}).then(()=>tic(yellow)).then(()=>{run()})
}

run()

//generator
function* light(){
yield tic(red)
yield tic(green)
yield tic(yellow)
}
function generator(iterator,gen){
//var result= iterator.next();
//这种判断可以 但是没必要的哦    
//if(result.done){//true
//    generator(iterator,gen)
//}else{//false
//    
//	}
    iterator.next()
    generator(iterator)
}

generator(light(),light)

//async await
 ( async function play(){
    while(true){
        await tic(red)
        await tic(green)
        await tic(yellow)
    }
  })()
```

## [promise 错误抓取](https://zh.javascript.info/promise-error-handling)

简单总结就是

如果是 return new Error() 这个会被then抓取

如果是 throw error 或者是 reject 就一定会通过catch

[Promise面试题](https://juejin.cn/post/6844903591518404622#heading-9)

[Promise组合面试题](https://www.cnblogs.com/everlose/p/12950564.html)

[Promise面试题](https://my.oschina.net/u/3991187/blog/4779209)

## 重点理解promise的源码

> 先说 这个题,如果不看源码 真的是一头雾水, 因为这个涉及到了源码里面then的实现问题. 所以如果你并没有打算看源码,可以虎烈这个题 ,这个考题有点偏

我们先看这个题

```js
Promise.resolve().then(()=>{console.log(1)}).then(()=>{console.log(2)}).then(()=>{console.log(3)})
Promise.resolve().then(()=>{console.log('a')}).then(()=>{console.log('b')}).then(()=>{console.log('c')})
```

这里的答案是什么呢?

```js
1 a 2 b 3 c
```

这里一定要注意顺序,当1在执行,a才进去,... 这里的循环要弄清楚哈

然后这个没问题,那我们就看下面这个难题

[题目来源字节面试题](https://juejin.cn/post/6937076967283884040#heading-17)

```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
```

这个题曾让我怀疑自己 (→_→)

好的 这个答案是 1 2 3 4 5 6 

对的 你没看错 那么我们来看看哈  then部分的具体源码 看这个

具体讲源码 写在这个文章

```js

/* 
用来指定成功/失败回调函数的方法
    1). 如果当前promise是resolved, 异步执行成功的回调函数onResolved
    2). 如果当前promise是rejected, 异步执行成功的回调函数onRejected
    3). 如果当前promise是pending, 保存回调函数
返回一个新的promise对象
    它的结果状态由onResolved或者onRejected执行的结果决定
    2.1). 抛出error ==> 变为rejected, 结果值为error
    2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
    2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
*/
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this

  onResolved = typeof onResolved === 'function' ? onResolved : value => value // 将value向下传递
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  } // 将reason向下传递

  return new Promise((resolve, reject) => { // 什么时候改变它的状态
    /* 
    1. 调用指定的回调函数
    2. 根据回调执行结果来更新返回promise的状态
    */
    function handle(callback) {
      try {
        const result = callback(self.data)
        if (!(result instanceof Promise)) { //  2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
          resolve(result)
        } else { // 2.3). 返回值是promise  ===> 由这个promise的决定新的promise的结果(成功/失败)
          result.then(
            value => resolve(value),
            reason => reject(reason)
          )
          // result.then(resolve, reject)
        }
      } catch (error) { // 2.1). 抛出error ==> 变为rejected, 结果值为error
        reject(error)
      }
    }

    if (self.status === RESOLVED) {
      setTimeout(() => {
        handle(onResolved)
      })
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        handle(onRejected)
      })
    } else { // PENDING
      self.callbacks.push({
        onResolved(value) {
          handle(onResolved)
        },
        onRejected(reason) {
          handle(onRejected)
        }
      })
    }   
  })
}
```

这里的重点是要理解到 这里有两次的判断的 

也就是对于Promise.resolve(4) 这里会走两个循环

不理解没关系 我们先这样看~~~ 如果我们直接return 4 是我们想要的结果

![](js-promise2/image-20210424232051259.png)

所以这样的运行结果,也就是告诉我们这里多了两个微任务,那么我们试一下?

![](js-promise2/image-20210424232437671.png)

哎 找到了 这里就是多了两个then的微任务,为啥呢?

这里就可以看看源码的2.3部分 

```js
// 2.3). 返回值是promise  ===> 由这个promise的决定新的promise的结果(成功/失败)
  result.then(
    value => resolve(value),
    reason => reject(reason)
  )
```

所以他会一直看你是不是promise,是的会给你增加微任务,为什么呢? 为的就是拿到你的最内层的值~~

比如这里就是,我拿到了promise.resolve(4) 好的,我创建一个then(), 这时候我就拿到了一个4, 然后我还要判断这个4是不是一个promise,这时候我再次创建一个promise, 然后哎 他已经不是了 欧克 ~~~ 我就不用再判断了

所以这里是两层哦~~~

> 对于现在很多面试会说面试官会要直接手撕promise. 但是实际上,都只是要了解整个大概~ 就是它的运行原理和基本的框架,你是要心中有数的. 所以想进大厂对于底层原理还是要保证理解上要足够好,光光挂题和肯定不够的哦~~~

## 手写promise API

#### promise.all 

就是前面并行

#### promise.race

```js
/* 
返回一个promise, 由第一个完成promise决定
*/
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 遍历所有promise, 取其对应的结果
    promises.forEach(p => {
      // 返回的promise由第一个完成p来决定其结果
      p.then(resolve, reject)
    })
  })
}
```

