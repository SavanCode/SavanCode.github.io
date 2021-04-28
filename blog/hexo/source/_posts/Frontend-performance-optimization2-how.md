---
title: Frontend performance optimization2 之怎么做
top: false
cover: false
toc: true
mathjax: true
date: 2021-04-28 16:13:11
password:
summary: Frontend performance optimization的处理办法
tags: optimization
categories: optimization
---
[TOC]



**前端如何优化性能？**(面试的回答主要方面)

- **页面工程优化**
- **代码细节优化**

**页面工程优化** 从页面请求开始，涉及网络协议、资源配置、浏览器性能、缓存等； **代码细节优化** 上相对零散，比如 JavaScript 对 DOM 操作，宿主环境的单线程相关内容等。(减少请求数量、减小资源大小、优化网络连接、优化资源加载、减少重绘回流、使用性能更好的API和构建优化)

# 工程优化方向

## 资源优化

### WebP 图片优化

>WebP 是是一种支持有损压缩和无损压缩的图片文件格式，派生自图像编码格式 VP8,压缩下来体积会减少28%
>
>- PNG 转 WebP 的压缩率要高于 PNG 原图压缩率，同样支持有损与无损压缩
>- 转换后的 WebP 体积大幅减少，图片质量也得到保障（同时肉眼几乎无法看出差异）
>- 转换后的 WebP 支持 Alpha 透明和 24-bit 颜色数，不存在 PNG8 色彩不够丰富和在浏览器中可能会出现毛边的问题


### 雪碧图

小图片合成 **雪碧图**，低于 5K 的图片可以转换成 **base64** 内嵌;

合适场景下，使用 **iconfont** 或者 **svg**

### 开启gzip

　　HTTP协议上的GZIP编码是一种用来改进WEB应用程序性能的技术。大流量的WEB站点常常使用GZIP压缩技术来让用户感受更快的速度。这一般是指WWW服务器中安装的一个功能，当有人来访问这个服务器中的网站时，服务器中的这个功能就将网页内容压缩后传输到来访的电脑浏览器中显示出来。一般对纯文本内容可压缩到原大小的40%

## 合理设置缓存策略

**浏览器缓存**: 通过设置请求的过期时间，合理运用浏览器缓存；

**CDN缓存**: 静态文件合理使用 CDN 缓存技术；

- HTML 放于自己的服务器上；
- 打包后的图片 / js / css 等资源上传到 CDN 上，文件带上 hash 值；
- 由于浏览器对单个域名请求的限制，可以将资源放在多个不同域的 CDN 上，可以绕开该限制；

**服务器缓存**: 将不变的数据、页面缓存到 内存 或 远程存储(redis等) 上；

**数据缓存**: 通过各种存储将不常变的数据进行缓存，缩短数据的获取时间

## 加载优化

### 异步script标签

　　defer: 异步加载，在HTML解析完成后执行。defer的实际效果与将代码放在body底部类似

　　async: 异步加载，加载完成后立即执行

### 模块按需加载

### 使用 prefetch / preload 预加载等新特性

#### 1. prefetch  - 用DNS预解析

　　当浏览器访问一个域名的时候，需要解析一次DNS，获得对应域名的ip地址。在解析过程中，按照`浏览器缓存`、`系统缓存`、`路由器缓存`、`ISP(运营商)DNS缓存`、`根域名服务器`、`顶级域名服务器`、`主域名服务器`的顺序，逐步读取缓存，直到拿到IP地址

　　DNS Prefetch，即DNS预解析就是根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到`系统缓存`中，缩短DNS解析时间，来提高网站的访问速度

　　方法是在 head 标签里面写上几个 link 标签

```
<link rel="dns-prefecth" href="https://www.google.com">
<link rel="dns-prefecth" href="https://www.google-analytics.com">
```

　　对以上几个网站提前解析 DNS，由于它是并行的，不会堵塞页面渲染，这样可以缩短资源加载的时间

#### 2. preload js 提前加载

我们能不能提前把图表加载进来,避免图表渲染中加载时间过长的问题?这种提前加载的方法就是组件的预加载.

原理也很简单,就是在用户的鼠标还处于 hover 状态的时候就开始触发图表资源的加载,通常情况下当用户点击结束之后,加载也基本完成,这个时候图表会很顺利地渲染出来,不会出现延迟.

```js
/**
 * @param {*} factory 懒加载的组件
 * @param {*} next factory组件下面需要预加载的组件
 */
function lazyWithPreload(factory, next) {
  const Component = lazy(factory);
  Component.preload = next;
  return Component;
}
...
// 然后在组件的方法中触发预加载
  const preloadChart = () => {
    Modal.preload()
  }
```

[demo地址](https://github.com/xiaomuzhu/preload-lazy-component)

#### 5. preconnect

```js
<link rel="preconnect" href="https://my.com" crossorigin />
```

#### 4. html 表现预加载

```html
<img src="https://xxx.jpg" style="display: none" />
```

#### 5. image对象

```js
const image = new Image();
image.src = 'https://xxx.jpg';
```

### 图片懒加载 组件懒加载

##### 懒加载 IntersectionObserver data-lazy 

- 使用IntersectionObserver来实现图片可视区域的懒加载

  传统的做法中，需要使用scroll事件，并调用getBoundingClientRect方法，来实现可视区域的判断，即使使用了函数节流，也会造成页面回流。使用IntersectionObserver，则没有上述问题

-  data-lazy 

  把页面上“懒加载元素”src 属性设置为空字符，把真实的 src 属性写在 data-lazy 属性中，当页面滚动的时候监听 scroll 事件，如果“懒加载元素”在可视区域内，就把图片的 src 属性或者文件 URL 路径设置成 data-lazy 属性值。
  
### 按需加载

  - 常规按需加载（如 JS 原生、jQuery）
  - 不同 App 按需加载（如 JS-SDK 脚本文件）
  - 不同设备按需加载（如 PC 端和 HTML5 端样式文件）
  - 不同分辨率按需加载（CSS Media Query）

Vue 异步加载举例：

```js
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const componentA = resolve => require(['src/a.vue' ], resolve);
const componentB = resolve => require(['src/b.vue' ], resolve);
const router = new VueRouter({
    routes: [{path:"a”,name:"/a”,component:componentA},
     {path:"b”,name:"/b”,component:componentB}]
})
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
```

## 以 tree shaking 手段为主的代码瘦身

## 操作 DOM 方向

- **减少访问 dom 的次数**，如需多次，将 dom 缓存于变量中；

- 减少重绘与回流

  - 多次操作合并为一次；
  - 减少对计算属性的访问；
    - 例如 offsetTop， getComputedStyle 等
    - 因为浏览器需要获取最新准确的值，因此必须立即进行重排，这样会破坏了浏览器的队列整合，尽量将值进行缓存使用；
  - 大量操作时，可将 dom 脱离文档流或者隐藏，待操作完成后再重新恢复；
  - 使用`DocumentFragment / cloneNode / replaceChild`进行操作；

- 使用事件委托，避免大量的事件绑定；

## 浏览器加载、渲染性能方向

###  首屏渲染优化

- **css / js 分割**，使首屏依赖的文件体积最小，内联首屏关键 css / js；

- 非关键性的文件尽可能的 **异步加载和懒加载**，避免阻塞首页渲染；

- 使用`dns-prefetch / preconnect / prefetch / preload`等浏览器提供的资源提示，加快文件传输；

- 谨慎控制好 

  Web字体

  ，一个大字体包足够让你功亏一篑；

  - 控制字体包的加载时机；
  - 如果使用的字体有限，那尽可能只将使用的文字单独打包，能有效减少体积；

- 合理利用 Localstorage / server-worker 等存储方式进行 **数据与资源缓存**；

### 减少重定向

　　尽量避免使用重定向，当页面发生了重定向，就会延迟整个HTML文档的传输。在HTML文档到达之前，页面中不会呈现任何东西，也没有任何组件会被下载，降低了用户体验

　　如果一定要使用重定向，如http重定向到https，要使用301永久重定向，而不是302临时重定向。因为，如果使用302，则每一次访问http，都会被重定向到https的页面。而永久重定向，在第一次从http重定向到https之后 ，每次访问http，会直接返回https的页面

### 持久连接 keep-alive

　　使用keep-alive或presistent来建立持久连接，持久连接降低了时延和连接建立的开销，将连接保持在已调谐状态，而且减少了打开连接的潜在数量

## 性能测量、监控方向

## 服务端渲染(SSR)
- 减少首屏需要的数据量，剔除冗余数据和请求；
- 控制好缓存，对数据/页面进行合理的缓存；
- 页面的请求使用流的形式进行传递；

# **代码细节优化**

### **数据读取**

- 通过作用域链 / 原型链 读取变量或方法时，需要更多的耗时，且越长越慢；
- 对象嵌套越深，读取值也越慢；
- 最佳实践:
  - 尽量在局部作用域中进行 **变量缓存**；
  - 避免嵌套过深的数据结构，**数据扁平化** 有利于数据的读取和维护；

### **循环**

循环通常是编码性能的关键点；

- 代码的性能问题会再循环中被指数倍放大；
- 最佳实践:
  - 尽可能 减少循环次数；
    - 减少遍历的数据量；
    - 完成目的后马上结束循环；
  - 避免在循环中执行大量的运算，避免重复计算，相同的执行结果应该使用缓存；
  - js 中使用 **倒序循环** 会略微提升性能；
  - 尽量避免使用 for-in 循环，因为它会枚举原型对象，耗时大于普通循环；

### **条件流程性能**: Map / Object > switch > if-else

### **减少 cookie 体积**: 能有效减少每次请求的体积和响应时间；

- 去除不必要的 cookie；
- 压缩 cookie 大小；
- 设置 domain 与 过期时间；

### **css 优化**

- **层级扁平**，避免过于多层级的选择器嵌套；
- **特定的选择器** 好过一层一层查找:  .xxx-child-text{} 优于 .xxx .child .text{}
- **减少使用通配符与属性选择器**；
- **减少不必要的多余属性**；
- 使用 **动画属性** 实现动画，动画时脱离文档流，开启硬件加速，优先使用 css 动画；
- 使用 `<link>` 替代原生 @import；　CSS的@import会造成额外的请求

### **html 优化**:

- **减少 dom 数量**，避免不必要的节点或嵌套；
- 避免`<img src="" />`空标签
- 图片提前 **指定宽高** 或者 **脱离文档流**，能有效减少因图片加载导致的页面回流；
- **语义化标签** 有利于 SEO 与浏览器的解析时间；
- 减少使用 table 进行布局，避免使用`<br />`与`<hr />`；

### js优化

- 事件委托

  是利用事件的冒泡原理来实现的

  适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。(缺点:误判,层级多,不冒泡)