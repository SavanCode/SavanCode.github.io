---
title: interview react 基础面试题
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-30 16:09:48
password:
summary: interview react 基础面试题
tags: interview 
categories: interview 
---

[TOC]

###  React 中 keys 的作用是什么？

- Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。react根据key来决定是销毁重新创建组件还是更新组件

```jsx
render () {
  return (
    <ul>
      {this.state.todoItems.map(({item, key}) => {
        return <li key={key}>{item}</li>
      })}
    </ul>
  )
}
```

> - key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
> - key值不同，则react先销毁该组件(有状态组件的componentWillUnmount会执行)，然后重新创建该组件（有状态组件的constructor和componentWillUnmount都会执行）

### 调用 setState 之后发生了什么？

- 在代码中调用 setState 函数之后，React **会将传入的参数对象与组件当前的状态合并**，然后触发所谓的调和过程。
- React会构建React元素树并且整个UI都会以virtual dom的形式重新渲染
- 在 React 得到元素树之后，React **会自动计算出新的树与老树的节点差异**，然后根据差异对界面**进行最小化重渲染**。
- 在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了**按需更新**，而不是全部重新渲染。

### 触发多次setstate，那么render会执行几次？

多次setState会**合并**为一次render，因为setState并不会立即改变state的值，而是将其放到一个**任务队列**里，最终将多个setState合并，一次性更新页面。

### 为什么setState是一个异步的？

- 当批量执行state的时候可以让DOM渲染的更快,也就是说多个setstate在执行的过程中还需要被合并
- this.setState(参数1,参数2) :: 参数1 : 是需要修改的数据是一个对象; 参数2 : 是一个回调函数，可以用来验证数据是否修改成功，同时可以获取到数据更新后的DOM结构等同于componentDidMount

### this.setState之后react做了哪些操作？

- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

