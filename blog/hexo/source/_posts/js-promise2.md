---
title: js promise2 拓展 针对细节面试题
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-21 08:40:55
password:
summary: promise2 拓展 针对细节面试题
tags: JS
categories: [JS,JS Async]
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
            Promise.resolve(promise).then(data => {
            	// 注意点1: index用来保证按序存储
                res[index]  = data
                count++
                // 注意点2: count用来保证获取到了想要的所有数据
                if(count === promises.length) {
                    resolve(res)
                }
            }, err => {
            }).catch(err => {
                return reject(err)
            })
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
var result= iterator.next();
if(result.done){//true
    generator(iterator,gen)
}else{//false
    result.value.then(function(){
            generator(iterator,gen)
        })
	}
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

