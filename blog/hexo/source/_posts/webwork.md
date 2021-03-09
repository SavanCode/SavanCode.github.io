---
title: webwork的基本介绍
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-09 17:56:18
password:
summary: webwork 的基本介绍，重点讲线程
tags: [WebWork]
categories: WebWork 
---

## 前言

为了避免DOM渲染冲突，JS使用单线程运行代码，最让人头疼的莫过于在网络正常的情况下经常出现页面的假死。以及在进行大量的for循环计算时会导致线程阻塞,由于要进行大量的计算JS后面的运行会被阻隔在此处，使得性能较差，代码维护性差等一系列的问题发生。

>  JS的运行机制
>
> （1）所有同步任务都在主线程上执行，形成一个执行栈。
> （2）主线程之外，还存在一个”任务队列”。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
> （3）一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
> （4）主线程不断重复上面的第三步。
>
> 执行栈中的代码（同步任务），总是在读取”任务队列”（异步任务）之前执行。 

**所以提供WebWork API**

## 基础概念

Web Worker 线程是为JavaScript创造多线程环境，作用就是**允许主线程创建Worker线程，将一些任务分配给后者执行**，（尤其是一些比较耗时的任务,eg:计算任务）而主线程主要负者用户UI界面的交互。

Worker线程一旦创建成功，就会始终运行，不会被主线程上的活动打断（比如用户点击按钮，提交表单等）。

## WebWork 特点

1. 分配给Worker线程运行的脚本文件，必须与主线程的脚本同源。
2. Worker线程**无法使用DOM操作**，无法使用**document、window、parent**这些对象，但是可以使用**navigator、location**对象
3. Worker线程和主线程不在同一个上下文环境，它们不同直接通信，**必须通过消息完成（postMessage、onmessage）**
4. Worker线程**不能执行alert()方法和confirm()方法**，但是可以使用XMLHttpRequest对象发出AJAX请求
5. 主线程向工作线程发送的消息对象，不会成两者间的共享对象。工作线程会得到对象的副本，工作线程中对副本的修改不会影响到主线程中该对象，工作线程发出的对象也是如此，主线程只能得到该对象的副本

## 基本语法

### 主线程

```js
var worker = new Worker(‘worker.js’); //创建Worker线程
//主线程使用worker.postMessage('...');方法，主线程传给 Worker 的数据
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});

//主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息 onmessage 或者下面的listener
worker.onmessage = function (event) {
    //event.data表示主线程传递给Worker线程的数据
  console.log('Received message ' + **event.data**);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
//Worker 完成任务以后，主线程就可以把它关掉。
worker.terminate();
```

### worker线程

```js
//worker 线程内部监听函数
//self代表子线程自身，即子线程的全局对象
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);

//注意 下面两种写法其实一样
// 写法一
this.addEventListener('message', function (e) {
  this.postMessage('You said: ' + e.data);
}, false);

// 写法二
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);
```



### Worker加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`

```js
importScripts('script1.js');
```

该方法可以同时加载多个脚本

```js
importScripts('script1.js', 'script2.js');
```

### 监听错误

**主线程可以监听 Worker 是否发生错误**。如果发生错误，Worker 会触发主线程的`error`事件

```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

Worker 内部也可以监听`error`事件

### 关闭Worker

使用完毕，为了节省系统资源，必须关闭 Worker。

```js
// 主线程
worker.terminate();

// Worker 线程
self.close();
```

## 完整例子

```html

<body οnlοad="init();">
    <div id="result"></div>
    <script type="text/javascript">
        function init(){
            var worker=new Worker('compute.js');//实例化一个WebWorker,参数为另一个线程的js文件名称
            worker.onmessage=function(event){
            //回调函数的参数Event对象：我们只对data和target属性感兴趣，data属性包含工作线程返回data，target属性是发出这个消息的工作线程的引用，方便我们知道来自哪个工作线程
            //把子线程返回的结果添加到div中
            document.getElementById("result").innerHTML+=event.data+"<br>";
            }
        }
    </script>
</body>
```

子线程通过postMessage方法就可以在两个线程间传递数据了。子线程compute.js代码如下：
```js
var i=0;
function timedCount(){
	for(var j=0,sum=0;j<100;j++){
		for(var i=1;i<10000000;i++){
			sum+=i;
		}
	}
	postMessage(sum);//调用postMessage向主线程发送消息
}
postMessage("开始计算 "+new Date());
timedCount();
postMessage("结束计算 "+new Date()) 
//这里结果就算计算的部分很长 但是由于分线程
//所以结果就是 
//开始时间
//sum
//结束时间
//如果这里不用分线程 由于计算过长，时间会大部分退后
```
## 关于异步的js API

### Ajax

ajax确实是异步的，XMLHttpRequest请求是由浏览器开启一个线程来完成异步操作。当请求的状态变更时，如果先前已设置回调，那么异步线程就产生状态变更事件放到javascript引擎的事件处理队列中等待处理。当浏览器空闲的时候队列中任务被处理，javascript引擎始终是单线程运行回调函数。 

### callball 函数

```js
function f1(callback){
	//f1的内容需要耗费很多时间
	for(i=0;i<1000;i++){
		console.log(i);
	}
	callback();
}
function f2(){
	alert(2);
}
f1(f2);
//这里就是 在执行打印的期间，alert会被执行
```

**回调函数的优点就是简单，容易理解和实现，缺点就是不利于代码的阅读和维护，有可能回调地狱**

### setTimeout

利用setTimeout来模拟开启一个线程，其实并没有开启线程。
可以理解为，setTimeout会将事件放入主程序的事件队列，如果主程序空闲了，就会第一时间调用setTimeout中的事件。



记得之前写过关于js线程的文章 ~ 看一下