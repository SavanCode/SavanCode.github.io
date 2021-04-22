---
title: debounce throttle 防抖与节流
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-29 21:16:27
password:
summary: 防抖与节流最佳实践
tags: JS
categories: JS
---

## 防抖与节流目的

为了规避频繁的触发回调导致大量的计算或者请求等等问题。防抖(Debouncing) 和 函数节流（Throttling）来提升页面速度和性能。这两兄弟的本质都是以闭包的形式存在。通过对事件对应的回调函数进行包裹、以自由变量的形式缓存时间信息，最后用 setTimeout 来控制事件的触发频率。

## 基本类型

**防抖(debounce)** - 立即执行防抖和非立即执行防抖

- 事件被触发n秒后再执行回调，如果在这n秒内又被调用，则重新计时。

**节流(throttle)** - 时间戳和定时版

- 在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。（相当于间隔n秒执行一次，间隔n秒执行一次......）

## 函数防抖和节流区别

- **函数防抖的情况下，函数将一直推迟执行，造成不会被执行的效果；**
- **函数节流的情况下，函数将每隔 n 秒执行一次**

> 节流防抖就好比乘电梯，比如delay(等待)是10秒，那么防抖就是电梯每进来一个人就要等10秒再运行，而节流就是电梯保证每10秒可以运行一次
> 它和防抖动最大的区别就是，节流函数不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。


https://juejin.cn/post/6844904176359587854#heading-18

## 面试简写

```js

function throttle(func,delay=500){
     let timer = null; 
     return function(){
        let that = this;
         if(!timer){
            clearTimeout(timer);
            setTimeout(function(){
                func.apply(that,arguments)
            },delay)
         }
     }
}
function debounce(func,wait=500){
    let timer = null;
    return function(){
        var that = this;
        if(timer){
            clearTimeout(timer)
            timer= null;
        }
        setTimeout(() => {
            func.apply(that,arguments)
        }, wait);
    }
}

function func(){
    console.log("1111")
}

setInterval(throttle(fn,1000),10)
setInterval(debounce(fn,500),10)
```

##  防抖(debounce)： 最后一个人说了算

**我会等你到底**。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

### 应用场景

[可视化](http://demo.nimius.net/debounce_throttle/)

- scroll 事件滚动触发

  每当用户触发了一次 scroll 事件，我们就为这个触发操作开启计时器。一段时间内，后续所有的 scroll 事件都会被当作“一辆车的乘客”——它们无法触发新的 scroll 回调。直到“一段时间”到了，第一次触发的 scroll 事件对应的回调才会执行，而“一段时间内”触发的后续的 scroll 回调都会被节流阀无视掉

- 搜索框输入查询

- 表单验证

- 按钮提交事件

- 浏览器窗口缩放

###  1. 非立即执行防抖

```html
<div>debounce:<input type="text" id="debounce-input" /></div>
<script>
const inputDom = document.getElementById('debounce-input')

function debounce(func, wait) {
  let timeout
  return function () {
    const that = this // 改变执行函数内部 this 的指向
    const args = arguments // 解决 doSomeThing event指向问题
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(that, args)
    }, wait)
  }
}

function doSomeThing(e) {
  console.log('我是防抖～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

inputDom.onkeyup = debounce(doSomeThing, 300)
</script>
```

### 2. 立即执行防抖

```html
<div>debounce:<input type="text" id="debounce-input" /></div>
<script>
const inputDom = document.getElementById('debounce-input')

function debounce(func, wait, immediate) {
  // immediate 是否立即执行
  let timeout
  return function () {
    const that = this // 改变执行函数内部 this 的指向
    const args = arguments // 解决 doSomeThing event指向问题
    clearTimeout(timeout) //  每次进来先清除上一次的 setTimeout
    if (immediate) {
      const callNow = !timeout //需要一个条件判断是否要去立即执行
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      // 立即执行
      if (callNow) func.apply(that, args)
    } else {
      // 不会立即执行
      timeout = setTimeout(function () {
        func.apply(that, args)
      }, wait)
    }
  }
}

function doSomeThing(e) {
  console.log('我是防抖～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

inputDom.onkeyup = debounce(doSomeThing, 300, true)	
</script>
```

### 3. 需要返回值

```html
<div>debounce:<input type="text" id="debounce-input" /></div>
<script>
const inputDom = document.getElementById('debounce-input')

function debounce(func, wait) {
  let timeout
  let result // 返回的结果
  return function () {
    const that = this // 改变执行函数内部 this 的指向
    const args = arguments // 解决 doSomeThing event指向问题
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      result = func.apply(that, args)
    }, wait)
    return result
  }
}

function doSomeThing(e) {
  console.log('我是防抖～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求

  return '想要的结果'
}

inputDom.onkeyup = debounce(doSomeThing, 300, true)
</script>
```

### 4. 取消防抖

```html
 <div>
   debounce:<input type="text" id="debounce-input" />
   <button id="cancel-btn">取消防抖</button>
</div>
<script>
const inputDom = document.getElementById('debounce-input')
const cancelBtnDom = document.getElementById('cancel-btn')

function debounce(func, wait) {
  let timeout
  let debounced = function () {
    const that = this // 改变执行函数内部 this 的指向
    const args = arguments // 解决 doSomeThing event指向问题
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(that, args)
    }, wait)
  }
  debounced.cancel = function () {
    // 新增取消方法
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

function doSomeThing(e) {
  console.log('我是防抖～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

const doDebounce = debounce(doSomeThing, 1000, true)

inputDom.onkeyup = doDebounce

cancelBtnDom.onclick = function () {
  doDebounce.cancel()
}
</script>
```

## 节流(throttle) ： 第一个人说了算

**初见最重要**。throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。

[可视化](http://demo.nimius.net/debounce_throttle/)

### 应用场景

- 监听 scroll 滚动事件；
- DOM 元素的拖拽功能的实现；
- 射击游戏；
- 计算鼠标移动的距离；

### 1. 使用时间戳

```html
<div style="height: 10000px"></div>
<script>
// 第一次立即执行，最后一次不会被调用触发执行
function throttle(func, wait) {
  let old = 0 // 之前的时间戳
  return function () {
    const that = this
    const args = arguments
    let now = new Date().valueOf() // 获取当前时间戳
    if (now - old > wait) {
      func.apply(that, args) // 立即执行
      old = now
    }
  }
}

function doSomeThing(e) {
  console.log('我是节流～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

document.onscroll = throttle(doSomeThing, 500)
</script>
```

### 2. 使用定时器

```html
<div style="height: 10000px"></div>
<script>
// 第一次不立即执行，最后一次会被调用触发执行
function throttle(func, wait) {
  let timeout
  return function () {
    const that = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(function () {
        func.apply(that, args)
        timeout = null
      }, wait)
    }
  }
}

function doSomeThing(e) {
  console.log('我是节流～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

document.onscroll = throttle(doSomeThing, 500)
</script>
```

### 3. 时间戳+定时器

这里有点像用 Throttle 来优化 Debounce（下面的思路是直接第一次实现，中间不实现，最后的再实现）

> debounce 的问题在于它“太有耐心了”。试想，如果用户的操作十分频繁——他每次都不等 debounce 设置的 delay 时间结束就进行下一次操作，于是每次 debounce 都为该用户重新生成定时器，回调函数被延迟了不计其数次。频繁的延迟会导致用户迟迟得不到响应，用户同样会产生“这个页面卡死了”的观感。
>
> 为了避免弄巧成拙，我们需要借力 throttle 的思想，打造一个“有底线”的 debounce——等你可以，但我有我的原则：delay 时间内，我可以为你重新生成定时器；但只要delay的时间到了，我必须要给用户一个响应。这个 throttle 与 debounce “合体”思路

```html

<div style="height: 10000px"></div>
<script>
// 第一次立即执行，最后一次会被调用触发执行
function throttle(func, wait) {
  let timeout
  let old = 0 // 之前的时间戳

  return function () {
    const that = this
    const args = arguments
    let now = +new Date() // 获取当前时间戳
    if (now - old > wait) {
      // 第一次会立即执行
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(that, args) // 立即执行
      old = now
    } else if (!timeout) {
      // 最后一次会执行
      timeout = setTimeout(function () {
        func.apply(that, args)
        old = +new Date()
        timeout = null
      }, wait)
    }
  }
}

function doSomeThing(e) {
  console.log('我是节流～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

document.onscroll = throttle(doSomeThing, 500)
</script>
```

> 节流函数没有 第一次不立即执行，最后一次不会被调用触发执行 。

### 4. 优化节流函

```html
<div style="height: 10000px"></div>
<script>
function throttle(func, wait, options) {
  let timeout
  let old = 0 // 之前的时间戳
  if (!options) options = {}
  return function () {
    const that = this
    const args = arguments
    let now = new Date().valueOf() // 获取当前时间戳
    if (options.leading === false && !old) { // 让第一次不执行
      old = now
    }
    if (now - old > wait) {
      // 第一次会立即执行
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(that, args) // 立即执行
      old = now
    } else if (!timeout && options.trailing !== false) {
      // 最后一次会执行
      timeout = setTimeout(function () {
        func.apply(that, args)
        old = new Date().valueOf()
        timeout = null
      }, wait)
    }
  }
}

function doSomeThing(e) {
  console.log('我是节流～～～')
  // console.log(e)
  // console.log(this);
  // 可能会做 回调 或者 ajax 请求
}

/*
 * 第一次会立即执行，最后一次不会被调用 {leading:true,trailing:false}
 * 第一次不会立即执行，最后一次会被调用 {leading:false,trailing:true}
 * 第一次会立即执行，最后一次会被调用 {leading:true,trailing:true}
 * options = { leading:xxx,trailing:xxx }; 默认 options 为 {leading:true,trailing:true}
 * throttle(doSomeThing,wait,options)
 */
document.onscroll = throttle(doSomeThing, 500)
</script>
```

### 5. 取消节流

同取消防抖一致。

### 6. 注意

- `now-old > wait` 有时候电脑本地时间出现问题，`new Date()` 不准。

##  总结

- 函数防抖和函数节流都是防止某一时间频繁触发，但是这两种原理却不一样。
- 函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。
- 实际生产还是使用 `lodash` 实现可靠的的防抖、节流实现🤣。



## 在 Vue 里使用 lodash 中的 Debouncing 和 Throttling

事件节流和防抖是提高性能或降低网络开销的好方法。虽然 Vue 1曾经支持对事件的节流和防抖，但是在Vue 2中为了保持核心的简单性，删除对事件的节流和防抖的支持。因此，在Vue 2对对事件进行防抖和节流我们可以使用 `lodash` 来做。

#### 安装

可以通过 yarn 或 npm 安装 lodash。

```
# Yarn
$ yarn add lodash
# NPM
$ npm install lodash --save
```

> 注意：如果我们不想导入`lodash`的所有内容，而只导入所需的部分，则可以通过一些Webpack构建自定义来解决问题。 还可以使用`lodash.throttle`和`lodash.debounce`等软件包分别安装和导入`lodash`的各个部分。

#### throttling 方法

要对事件进行节流处理方法非常简单，只需将要调用的函数包装在lodash的`_.throttle`函数中即可。

```html
<template>
  <button @click="throttledMethod()">Click me as fast as you can!</button>
</template>

<script>
import _ from 'lodash'

export default {
  methods: {
    throttledMethod: _.throttle(() => {
      console.log('I get fired every two seconds!')
    }, 2000)
  }
}
</script>
```

### debouncing 方法

尽管节流在某些情况下很有用，但一般情况我们经常使用的是防抖。 防抖实质上将我们的事件分组在一起，并防止它们被频繁触发。 要在Vue组件中使用节流，只需将要调用的函数包装在lodash的`_.debounce`函数中。

```html
<template>
  <button @click="throttledMethod()">Click me as fast as you can!</button>
</template>

<script>
import _ from 'lodash'

export default {
  methods: {
    throttledMethod: _.debounce(() => {
      console.log('I only get fired once every two seconds, max!')
    }, 2000)
  }
}
</script>
```