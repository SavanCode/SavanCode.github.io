---
title: Vue监视元素大小
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-22 11:16:09
password:
summary: Vue 监视element,window方法
tags: Vue
categories: Vue
---

## 页面窗口大小

思路是: 为了获取当前页面变化的大小,监视每一次页面长宽的变化

### 方式1. 加listener

```js
created() {
  window.addEventListener("resize", this.handleResize);
  this.handleResize();
},
destroyed() {
  window.removeEventListener("resize", this.handleResize);
},
methods: {
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  },
```

### 方式2. 直接通过`$`获取元素

```
let height= this.$refs.element.offsetHeight; 
```

## 页面内部组件大小

### 方式1.reseizeObsever

ResizeObserver 允许我们观察DOM元素的内容矩形大小（宽度、高度）的变化，并做出相应的响应。它就像给元素添加 document.onresize() 或 window.resize() 事件（但在JavaScript中，只有 window 才有 resize 事件）。当元素改变大小而不调整视窗大小时，它是有用的。 下面描述一些调整观察者的行为：

- 当观察到的元素被插入或从DOM中删除时，观察将会触发
- 当观察到的元素 display 值为 none 时，观察都会触发
- 观察不会对未替换的内联元素（non-replaced inline element）触发
- 观察不会由CSS的 transform 触发
- 如果元素有显示，而且元素大小不是 0,0 ，观察将会触发

#### 基本用法
使用Resize Observer非常简单，只需实例化一个新的ResizeObserver对象并传入一个回调函数，该函数接收观察到的条目

```js
const myObserver = new ResizeObserver(entries => {
  // 遍历条目，做一些事情
});
```

#### 例子

##### 1. vue

```js
mounted () {
    this.observeSize()
        },
methods: {
    observeSize () {
    const ro = new ResizeObserver(entries => {
        entries.forEach(entry => {
        const { width, height } = entry.contentRect
        this.width = width
        this.height = height
        })
    }) 
    ro.observe(this.$refs.targetElement)// 目标对象ref="targetElement"
    }
}
```

#####  2. js

```js
let windowWidth = document.querySelector('#windowWidth');
let windowHeight = document.querySelector('#windowHeight');

window.addEventListener('resize', function () {
   windowWidth.innerText = window.innerWidth;
   windowHeight.innerText = window.innerHeight;
})
```

   

### 方式2.利用插件

#### npm 包装

```sh
element-resize-detector 【推荐】
resize-detector
size-sensor
```