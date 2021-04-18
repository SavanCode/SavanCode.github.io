---
title: 你不知道的JS 中卷 重点摘抄以及解读4
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-18 09:45:21
password:
summary: 你不知道的JS 中卷 中 异步和性能
tags: [JS,book,JS object]
categories: JS
---

> 这里是阅读完 你不知道的JS 中卷 中的异步 做出的总结
>
> （其实之前的总结 也是有结合“你不知道的JS” 只是会把主要的书名放在名字）

## 重点部分摘抄

### 1. 都有哪些异步

用户交互，IO，定时器

### 2. 事件循环的理解



### 3. Promise 的原理



### 4. Generator 怎么用

### 5. Async 的用法和原理

## 重点概念的概括

> 这里主要是当别人问你概念的时候，可以简单回答

###  事件循环

线程提供一种机制来处理程序中多个块的执行，并且执行每个块时调用JS引擎，这种机制就是事件循环机制

一旦有事件需要运行，事件循环就会运行，直到队列清空。事件循环的每一轮称为一个tick。用户交互、Ajax 和定时器会向事件队列中加入事件。

### 进程和线程的概念以及关系

- **进程（Process）**：进程是系统资源分配和调度的单元。一个运行着的程序就对应了一个进程。一个进程包括了运行中的程序和程序所使用到的内存和系统资源。
- **线程（Thread）**：线程是进程下的执行者，一个进程至少开启一个线程（主线程），也可以开启多个线程。

### 并行和并发的概念

- **并行（Parallelism）**：指程序的运行状态，在同一时间内有几件事情并行在处理。由于一个线程在同一时间只能处理一件事情，所以并行需要多个线程在同一时间执行多件事情。
- **并发（Concurrency）**：指程序的设计结构，在同一时间内多件事情能被交替地处理。重点是，在某个时间内只有一件事情在执行。比如单核 CPU 能实现多任务运行的过程就是并发。

### 阻塞和非阻塞的概念

- **阻塞（Blocking）**：阻塞是指调用在等待的过程中线程被挂起（CPU 资源被分配到其他地方去）
- **非阻塞（Non-blocking）**：非阻塞是指等待的过程 CPU 资源还在该线程中，线程还能做其他的事情

### 单线程和多线程的区别

- **单线程**：从头执行到尾，逐行执行，如果其中一行代码报错，那么剩下代码将不再执行。同时容易代码阻塞。
- **多线程**：代码运行的环境不同，各线程独立，互不影响，避免阻塞。

### 同步与异步的概念

- **同步（Synchronous）**：程序发出调用的时候，一直等待直到返回结果，没有结果之前不会返回。
- **异步（Asynchronous）**：程序发出调用之后，无法立即得到结果，需要额外的操作才能得到预期的结果是为异步。

### 回调函数

回调函数包裹或者说封装了程序的延续（continuation），回调函数是JavaScript 异步的基本单元

### promise

Promise 是一种封装和组合未来值的易于复用的机制。解决了只用回调的代码而备受困扰的控制反转问题

## 知识细节摘抄和理解

### 整体知识结构图



### 异步

#### 事件循环理解

先看图~

![](js-professional-book4/image-20210418205103627.png)

> 文字版本:
>
> 所有同步任务及异步任务按照 [编译原理](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/compilation/compilation#编译原理) 在主线程上执行，形成一个 [执行上下文栈](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/execution/execution-context-stack)（Execution Context Stack）
>
> 同步任务执行完成并返回结果后退出执行上下文栈；异步任务执行一部分后，退出主线程的执行上下文栈，推进至运行环境的专用线程中继续执行
>
> 当运行环境的专用线程中的异步任务准备就绪后，将被推至任务队列（Task Queue）中等待执行
>
> 主线程的执行上下文栈中的所有任务执行完毕后，JavaScript 解释器就会通过事件循环机制检查任务队列中是否存在等待执行的事件。如果存在，则队首的异步任务将结束等待状态，进入执行上下文执行
>
> JavaScript 主线程运行期间将不断重复上面第四步

#### 异步任务分两种

- **宏任务**（MacroTask）：main script、setTimeout、setInterval、setImmediate（Node.js）、I/O（Mouse Events、Keyboard Events、Network Events）、UI Rendering（HTML Parsing）、MessageChannel、
- **微任务**（MicroTask）：Promise.then（非 new Promise）、process.nextTick（Node.js）、MutationObserver回调函数

运行机制理解 如下

![](js-professional-book4/image-20210418210702769.png)

这里的检查 实际上就是利用事件循环机制,检测微任务

### 回调

#### 回调信任问题

- 调用回调过早（在追踪之前）；
- 调用回调过晚（或没有调用）；
- 调用回调的次数太少或太多（就像你遇到过的问题！）；
- 没有把所需的环境/ 参数成功传给你的回调函数；
- 吞掉可能出现的错误或异常；
- ……

### Promise

#### 链式流程控制可行的Promise 固有特性

- 调用Promise 的then(..) 会自动创建一个新的Promise 从调用返回。
- 在完成或拒绝处理函数内部，如果返回一个值或抛出一个异常，新返回的（可链接的）Promise 就相应地决议。
- 如果完成或拒绝处理函数返回一个Promise，它将会被展开，这样一来，不管它的决议值是什么，都会成为当前then(..) 返回的链接Promise 的决议值。

#### Promise的局限性

- 顺序错误处理
一个promise链只是连接到一起的成员，并不是一个整体；即会有外部方法能够观察可能发生的错误。

- 单一值
promise只能有一个完成值或者一个拒绝理由

- 单决议
promise只能决议一次

- 惯性
在一个充满回调函数的代码块中，现存的代码不识别promise，那么还是保存原来的样子要好

- 无法取消的promise
一旦创建一个promise并注册完成或拒绝处理函数，这时如果某种情况发生导致这个任务得不到处理，实际上是没有办法从外部停止这个进程的

## 参考

你不知道的js

[JS guidebook](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/concurrency-model/timers-mechanism)

