---
title: interview js 知识点总结1
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-24 19:22:51
password:
summary: interview js
tags: interview
categories: interview
---

[TOC]

## for in 和 for of 的区别？

1. 推荐在循环对象属性的时候，使用`for...in`,for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。
2. `for...in`循环出的是key，`for...of`循环出的是value
3. 注意，`for...of`是ES6新引入的特性。修复了ES5引入的`for...in`的不足

## 如何防止重复发送ajax请求？

参考，不用都答出来，一般答出防抖节流即可：

https://blog.csdn.net/xgangzai/article/details/108413909

## axios拦截器是什么？有什么用？

在vue项目中，我们通常使用axios与后台进行数据交互，axios是一款基于promise封装的库，可以运行在浏览器端和node环境中。它有很多优秀的特性，例如拦截请求和响应、取消请求、转换json、客户端防御XSRF等。所以vue官方开发组放弃了对其官方库vue-resource的维护，直接推荐我们使用axios库。

页面发送http请求，很多情况我们要对请求和其响应进行特定的处理；例如每个请求都附带后端返回的token，拿到response之前loading动画的展示等。如果请求数非常多，这样处理起来会非常的麻烦，程序的优雅性也会大打折扣。在这种情况下，axios为开发者提供了这样一个API：拦截器。拦截器分为 请求（request）拦截器和 响应（response）拦截器。

## localStorage和sessionStorage的区别？

HTML5的WebStorage提供了两种API：localStorage（本地存储）和sessionStorage（会话存储）。

1、生命周期：localStorage:localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。

​		sessionStorage的生命周期是在仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。

2、存储大小：localStorage和sessionStorage的存储数据大小一般都是：5MB

3、存储位置：localStorage和sessionStorage都保存在客户端，不与服务器进行交互通信。

4、存储内容类型：localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

5、获取方式：localStorage：window.localStorage;；sessionStorage：window.sessionStorage;。

6、应用场景：localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据。sessionStorage：敏感账号一次性登录；

## 写一个方法把分钟转化为时分，例如：150->02:30？

```
let minuteConversion= (minutes)=>{
   let hours = parseInt(minutes/60)
    let minute = minutes%60
   console.log(minutes+'分钟转换成时分是'+hours+'：'+minute)
}
```

## 什么是 CDN，为什么它能提高速度？

DN的全称是Content Delivery Network，即[内容分发网络](https://baike.baidu.com/item/内容分发网络/4034265)。CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。

##  requestAnimationFrame

`requestAnimationFrame`，**「request - 请求」**，**「Animation - 动画」**， **「Frame - 帧率;框架」**

> window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

request 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成（这点很像虚拟DOM不是~），并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率,这样就不会出现过度渲染的问题，保证了流畅的需求以及浏览器的完美渲染。

### [例子](https://css-tricks.com/using-requestanimationframe/)

###  为什么不使用settimeout，setinterval？

setTimeout通过设定一个时间间隔来不断的更新屏幕图像，从而完成动图。 它的优点是可控性高，可以进行编码式的动画效果实现。

setTimeout缺点：

1. **「造成无用的函数运行开销：」**

也就是过度绘制，同时因为更新图像的频率和屏幕的刷新重绘制步调不一致，会产生丢帧，在低性能的显示器动画看起来就会卡顿。

1. **「当网页标签或浏览器置于后台不可见时，仍然会执行，造成资源浪费」**
2. **「API本身达不到毫秒级的精确：」**

如果使用 setTimeout或者setInterval 那么需要我们制定时间 假设给予 （1000/60）理论上就可以完成60帧速率的动画。所以事实是浏览器可以“强制规定时间间隔的下限（clamping th timeout interval）”,一般浏览器所允许的时间再5-10毫秒，也就是说即使你给了某个小于10的数，可能也要等待10毫秒。

1. **「浏览器不能完美执行：」**

当动画使用10ms的settimeout绘制动画时，您将看到一个时序不匹配，如下所示。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c186eeb339b240dd96053c2ccaf2a49e~tplv-k3u1fbpfcp-zoom-1.image)

我们的显示屏一般是**「16.7ms（即60FPS）的显示频率」**，上图的第一行代表大多数监视器上显示的**「16.7ms显示频率」**，上图的第二行代表**「10ms的典型setTimeout」**。由于在显示刷新间隔之前发生了另一个绘制请求，因此无法绘制每次的第三个绘制（红色箭头指示）。这种透支会导致动画断断续续，**「因为每三帧都会丢失」**。计时器分辨率的降低也会对电池寿命产生负面影响，并降低其他应用程序的性能。

> 如果使用requestAnimationFrame可以解决setTimeout的丢帧问题，因为它使应用程序时通知（且仅当）的浏览器需要更新页面显示，渲染时间由系统处理。因此，应用程序与浏览器绘画间隔完全一致，并且仅使用适当数量的资源。

### requestAnimationFrame的好处

相比于`setTimeout`的在固定时间后执行对应的动画函数，`requestAnimationFrame`用于指示浏览器在下一次重新绘制屏幕图像时, 执行其提供的回调函数。

- **「使浏览器画面的重绘和回流与显示器的刷新频率同步」**它能够保证我们的动画函数的每一次调用都对应着一次屏幕重绘，从而避免`setTimeout`通过时间定义动画频率，与屏幕刷新频率不一致导致的丢帧。
- **「节省系统资源，提高性能和视觉效果」**在页面被置于后台或隐藏时，会自动的停止，不进行函数的执行，当页面激活时，会重新从上次停止的状态开始执行，因此在性能开销上也会相比`setTimeout`小很多。

## 箭头函数能访问原型嘛?

不能 箭头函数 不能使用new 也没有super 没有原型

## promise 原理解释



**继续**

https://gitee.com/cpeng1314/laochenqianduan/tree/master/99-%E7%AC%94%E8%AF%95%E5%92%8C%E9%9D%A2%E8%AF%95%E9%A2%98/02-JavaScript