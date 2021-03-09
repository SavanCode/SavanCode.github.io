---
title: webwork的基本介绍
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-09 17:56:18
password:
summary: webwork 的基本介绍，重点讲线程
tags: WebWork
categories: WebWork 
---

## 前言

S为了避免DOM渲染冲突，使用单线程运行代码，最让人头疼的莫过于在网络正常的情况下经常出现页面的假死。以及在进行大量的for循环计算时会导致线程阻塞,由于要进行大量的计算JS后面的运行会被阻隔在此处，使得性能较差，代码维护性差等一系列的问题发生。

**所以提供的新的WebWork API，让前端的异步工作变得异常简单**

## 基础概念

Web Worker 线程是为JavaScript创造多线程环境，允许主线程创建Worker线程，将一些任务分配给后者执行，（尤其是一些比较耗时的任务,eg:计算任务）而主线程主要负者用户UI界面的交互。

Worker线程一旦创建成功，就会始终运行，不会被主线程上的活动打断（比如用户点击按钮，提交表单等）。

## WebWork 特点

1. 分配给Worker线程运行的脚本文件，必须与主线程的脚本同源。
2. Worker线程**无法使用DOM操作**，无法使用**document、window、parent**这些对象，但是可以使用**navigator、location**对象
3. Worker线程和主线程不在同一个上下文环境，它们不同直接通信，**必须通过消息完成（postMessage、onmessage）**
4. Worker线程**不能执行alert()方法和confirm()方法**，但是可以使用XMLHttpRequest对象发出AJAX请求
5. **Worker线程无法读取本地文件，既不能打开本机的文件系统（file://）,它所加载的脚本，必须来自网络**。

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