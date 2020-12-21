---
title: react-1week Day 5
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-21 16:10:45
password:
summary:
tags: React
categories: React
---

# Redux 必要条件

The Redux core library is available as a package on NPM for use with a module bundler or in a Node application:

```
# NPM
npm install redux

# Yarn
yarn add redux
```

# redux理解

什么: redux是专门做状态管理的独立第3方库, 不是react插件
作用: 对应用中状态进行集中式的管理(写/读)
开发: 与react-redux, redux-thunk等插件配合使用

**类比图书馆借书流程：**

- 首先，我们要借一本书，
- 借书的人（React Components），他说‘我要借一本书’（actionCreaters）
- 这句话被图书馆管理员（store）听见后，管理员去找这本书，但是他自己记不住
- 于是管理员去查阅图书记录本（reducers），记录本会显示这本书放在哪（一来一回）
- 管理员（store）知道这本书放在哪，找到这本书，把这本书给借书的人（React Components）
- ![](react-1week05/image-20201221164042337.png)

**store、components、actionCreaters、reducers的关系即为：**

- 首先有一个组件，组件要去获取store中的一些数据
- actionCreaters通过dispatch(action)方法  让store知道 组件要获取数据
- store在reducer查组件需要什么数据，reducer返回组件应该拿到的数据
- store获得数据后把数据 返给 组件 

# Redux核心概念(3个)


## action
默认是对象(同步action), {type: 'xxx', data: value}, 需要通过对应的actionCreator产生, 
它的值也可以是函数(异步action), 需要引入redux-thunk才可以

## reducer
根据老的state和指定的action, 返回一个新的state
不能修改老的state

## store
redux最核心的管理对象
内部管理着: state和reducer
提供方法: getState(), dispatch(action), subscribe(listener)

- `createStore` 创建store
- `store.dispatch` 派发action，action传递给store
- `store.getState()` 获取store里面所有的数据内容
- `store.subscribe()` 订阅store的改变，只要store发生改变，`store.subscribe()`中的回调函数就会执行

#  例子

## 基础 reducer store action

```jsx
import { createStore } from 'redux' 
/**
 这是 reducer - a function describing "what happened"
 - reducer =  a current state value + an action object  
 - returns a new state value.
 - 格式： (state, action) => newState
 *
 * The Redux state ： plain JS objects, arrays, and primitives.
 * The root state value is usually an object.   
 */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT':
      return { value: state.value - 1 }
    case 'RESET':
      return { value: 0}
    default:
      return state
  }
}

const store =createStore(counterReducer)
//查状态 0
console.log(store.getState());

//执行
store.dispatch({
  type: "INCREMENT"
})
store.dispatch({
  type: "INCREMENT"
})
store.dispatch({
  type: "INCREMENT"
})
//3
console.log(store.getState());
store.dispatch({
  type: "DECREMENT"
})
//2
console.log(store.getState());

store.dispatch({
  type: "RESET"
})
//0
console.log(store.getState());
ReactDOM.render(routes ,
  document.getElementById('root')
);
```

## subscribe以及设置特殊值

```jsx
 //仓库放所有action 以及state
const initState = {
  count :0 ,
  list:['任务一',"任务二"]
};
 //仓库放所有action 以及state
const store = createStore((state=initState,action)=>{
  switch(action.type){
  case "INCREMENT":
    const incrementBy = typeof action.incrementBy ==='number'? action.incrementBy :1;
    return { count:state.count+incrementBy }
  
  case "DECREMENT": 
  const decrementBy = typeof action.decrementBy ==='number'? action.decrementBy :1;
    return { count:state.count-decrementBy }
  
  case "RESET": return { count:0 }

  case "SET": return { count:action.count }
  
  default: return state
  }
}) 
//实时监控
const unsub=store.subscribe(()=>{ console.log(store.getState()); })

//执行
store.dispatch({
  type: "INCREMENT",
  incrementBy:5
})
store.dispatch({
  type: "INCREMENT"
}) 
store.dispatch({
  type: "DECREMENT",
  decrementBy:3
}) 

store.dispatch({
  type: "SET",
  count : 100
}) 
//直接取消掉subscribe
unsub();

//后面执行但是不会跟踪
store.dispatch({
  type: "DECREMENT",
  decrementBy:3
}) 
console.log(store.getState())

```





# reference

https://blog.csdn.net/qq_26347769/article/details/109634399

https://juejin.cn/post/6844903894082928654