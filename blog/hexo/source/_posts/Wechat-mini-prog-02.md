---
title: Wechat-mini-prog-02 微信小程序基础2
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-13 11:25:55
password:
summary:
tags: WechatMini Program
categories: WechatMini Program
---

## JavaScript脚本

小程序的中 JavaScript同浏览器中的 JavaScript 以及 NodeJS 中的 JavaScript 是不相同的

### js模块化

**每一个JS文件对应一个模块，这样子的话，每个模块之间的参数或方法互相独立，但也支持特定方式的的调用**

#### 例子：在index.js中访问nav_top.js中的文件

![](Wechat-mini-prog-02/image-20210113113544081.png)

但是我们还是无法直接访问nav_top中的方法，**因为nav_top并没有对外暴露任何接口**，所以我们还需要在nav_top中使用experts命令把我们想暴露的接口说明一下：

　　![](Wechat-mini-prog-02/image-20210113113658809.png)

## 脚本执行顺序

小程序中的脚本执行顺序与HTML有所不同。小程序的执行的入口文件是 app.js 。并且会根据其中 require 的模块顺序决定文件的运行顺序

![](Wechat-mini-prog-02/image-20210113114910064.png)

当 app.js 执行结束后，小程序会按照开发者在 app.json 中定义的 pages 的顺序，逐一执行

## 全局变量

spp.js中全局变量设置，别的文件先 `const app = getApp()` 再取值

## 小程序事件

| 事件类型           | 触发条件                                                     |
| ------------------ | ------------------------------------------------------------ |
| touchstart         | 手指触摸动作开始触发                                         |
| touchmove          | 手指触摸后移动触发                                           |
| touchcancel        | 手指触摸动作被打断，如来电提醒，弹窗                         |
| touchend           | 手指触摸动作结束                                             |
| tap                | 手指触摸后马上离开                                           |
| longpress          | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发（与tap同时定义，优先级更高） |
| longtap            | 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）     |
| transitionend      | 会在 WXSS transition 或 wx.createAnimation 动画结束后触发    |
| animationstart     | 会在一个 WXSS animation 动画开始时触发                       |
| animationiteration | 会在一个 WXSS animation 一次迭代结束时触发                   |
| animationend       | 会在一个 WXSS animation 动画完成时触发                       |

>  事件绑定 用bind或者bind：都可以
>

例子

```html
<button bindtouchstart="alert">bindtap</button>
```

## 事件对象

在事件处理函数中，我们能接受到一个event对象参数，该参数包含了当前事件类型，以及当前组件相关信息，具体属性如下：

| 属性           | 类型    | 说明                                         |
| :------------- | :------ | -------------------------------------------- |
| type           | String  | 当前绑定的事件类型                           |
| timeStamp      | Integer | 页面打开到触发事件所经过的毫秒数             |
| target         | Object  | 触发事件的组件的一些属性值集合               |
| currentTarget  | Object  | 当前组件的一些属性值集合                     |
| detail         | Object  | 额外的信息                                   |
| touches        | Array   | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array   | 触摸事件，当前变化的触摸点信息的数组         |



```
<button bindtap="alert" id="btn" data-name="dataNames" data-age="27">bindtap</button>
///js
Page({
  data: {},
  alert: function (event) {
    console.log(event);
  }
})
```

## 捕获与冒泡阶段

`bind`前缀就表示事件在冒泡阶段执行，而如果我们想事件在捕获阶段执行，可以在`bind`前面加上`capture`，即`capture-bind`表示捕获阶段执行

![](Wechat-mini-prog-02/image-20210113142641993.png)

**bind不会阻止冒泡，添加capture前缀可以响应捕获阶段。**

### 例子

```html
<view id="parent"
  bind:tap="tap1"
  capture-bind:tap="tap2">
  outer view
  <view id="child"
    bind:tap="tap3"
    capture-bind:tap="tap4">
    inner view
  </view>
</view>
```

```js
///js
Page({
  data: {},
  tap1: function (event) {
    console.log('tap1');
  },
  tap2: function (event) {
    console.log('tap2');
  },
  tap3: function (event) {
    console.log('tap3');
  },
  tap4: function (event) {
    console.log('tap4');
  },
})
```

**结果是 2-4-3-1**

## 阻止冒泡 

将`bind`替换为`catch`事件了，`catch`也支持两种写法`catch与catch:`

### 例子 - 只显示子区域

```html
<view
  id="parent"
  catch:tap="tap1"
>
  outer view
  <view
    id="child"
    catch:tap="tap3"
  >
    inner view
  </view>
</view>
```

结果 - 3



```
<view
  id="parent"
  bind:tap="tap1"
  capture-catch:tap="tap2"
>
  outer view
  <view
    id="child"
    bind:tap="tap3"
    capture-catch:tap="tap4"
  >
    inner view
  </view>
</view>
```

结果： 2

我们将`capture-bind`都改为`capture-catch`，可以发现不管点击父区域还是子区域，都只会输出一个`tap2`，这是因为`capture-catch`会中断捕获阶段和取消冒泡阶段。所以不管点击哪，都是从捕获阶段开始，先捕获到父，然后中断捕获，也不会存在冒泡了

> `bind`不会阻止冒泡，但如果想抓捕获阶段，可以添加前缀`capture`，也就是`capture-bind`。
>
> `catch`会阻止冒泡，如果添加`capture`前缀，捕获阶段会中断的同时，也会阻止冒泡。

tabBar

```json
//app.json sample
"tabBar": {
    "list": [
      { "text": "Tab1", "pagePath": "pageA" },
      { "text": "Tab1", "pagePath": "pageF" },
      { "text": "Tab1", "pagePath": "pageG" }
    ]
  }

//例子
 "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/icon_speed.png",
       "selectedIconPath":"images/icon_speed_HL.png"
    }, {
      "pagePath": "pages/logs/logs",
      "text": "日志",
       "iconPath": "images/icon_seo.png",
       "selectedIconPath":"images/icon_seo_HL.png"
    }]
  }
```

![](Wechat-mini-prog-02/image-20210113220306094.png)

# Reference

[小程序学习笔记](https://www.cnblogs.com/MrSaver/p/9005641.html)

[小程序冒泡事件讲解](https://www.cnblogs.com/echolun/p/12817733.html)

