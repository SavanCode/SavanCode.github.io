---
title: Vue-day13 vuex
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-08 18:32:07
password:
summary: vuex
tags: Vue
categories: Vue
---

## vuex概念

vuex是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。chrome安装调试工具 devtools extension

### 为什么要vuex

> 如果已经学过React 可以跳过这里

　当访问数据对象时，一个 Vue 实例只是简单的代理访问。所以，如果有一处需要被多个实例间共享的状态，可以简单地通过维护一份数据来实现共享

```
const sourceOfTruth = {}
const vmA = new Vue({
  data: sourceOfTruth
})
const vmB = new Vue({
  data: sourceOfTruth
})
```

　　现在当 `sourceOfTruth` 发生变化，`vmA` 和 `vmB` 都将自动的更新引用它们的视图。子组件们的每个实例也会通过 `this.$root.$data` 去访问。现在有了唯一的实际来源，但是，调试将会变为噩梦。任何时间，应用中的任何部分，在任何数据改变后，都不会留下变更过的记录。

　　为了解决这个问题，采用一个简单的 **store 模式**：

```
var store = {
  debug: true,
  state: {
    message: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}
```

　　所有 store 中 state 的改变，都放置在 store 自身的 action 中去管理。这种集中式状态管理能够被更容易地理解哪种类型的 mutation 将会发生，以及它们是如何被触发。当错误出现时，现在也会有一个 log 记录 bug 之前发生了什么

　　此外，每个实例/组件仍然可以拥有和管理自己的私有状态：

```
var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state
  }
})
```

![](Vue-day13/image-20210214125750018.png)

> 组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，最终达成了 Flux 架构。这样约定的好处是，能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具

所以这里就可以基本理解为什么要store，为什么要Vuex了吧

## 单向数据流

![image-20210214142126665](Vue-day13/image-20210214142126665.png)

**示意图说明：**

- State：驱动应用的数据源（单向数据流）
- View：以声明方式将 state 映射到视图（静态显示出来的数据源）
- Actions：处理用户在view上面操作而导致的状态变化（数据源变化追踪）

例子： 直接new Vue管理状态的练习（todoApp, employeeForm）

## vuex与全局变量的区别

- 响应式：vuex的状态存储是响应式的，当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会得到高效更新
- 不能直接改变store：不能直接改变store的变化，改变store中状态的唯一途径是commit mutation，方便于跟踪每一个状态的变化

> 这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新

## vuex核心流程

![](Vue-day13/image-20210214155909563.png)

**示意图说明：**

1. Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应
2. Dispatch：操作行为触发方法，是唯一能执行action的方法
3. Actions：操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发
4. Commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法
5. Mutations：状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等
6. State：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新
7. Getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象

## 安装



## Reference

https://blog.csdn.net/weixin_43342105/article/details/105703491

http://doc.liangxinghua.com/vue-family/4.1.html