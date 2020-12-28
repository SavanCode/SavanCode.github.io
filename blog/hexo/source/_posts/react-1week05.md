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

#  单个redux例子

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
store.dispatch({ type: "INCREMENT" })
store.dispatch({ type: "INCREMENT" })
store.dispatch({ type: "INCREMENT" })
//3
console.log(store.getState());
store.dispatch({ type: "DECREMENT" })
//2
console.log(store.getState());s

store.dispatch({ type: "RESET" })
//0
console.log(store.getState()); 
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
store.dispatch({ type: "INCREMENT", incrementBy:5})
store.dispatch({ type: "INCREMENT" }) 
store.dispatch({ type: "DECREMENT", decrementBy:3 }) 
store.dispatch({ type: "SET", count : 100 }) 

//直接取消掉subscribe
unsub();
//后面执行但是不会跟踪
store.dispatch({ type: "DECREMENT", decrementBy:3}) 
console.log(store.getState())
```

利用解构 以及整理Action

```jsx
 const initState = {
  count :0 ,
  list:['任务一',"任务二"]
};
 //仓库放所有action选择 以及state 以及返回新的对象
const store = createStore((state=initState,action)=>{
  switch(action.type){
  case "INCREMENT":  return { count:state.count+action.incrementBy };
  
  case "DECREMENT":  return { count:state.count-action.decrementBy };
  
  case "RESET": return { count:0 };

  case "SET": return { count:action.count };
  
  default: return state
  }
}) 
//实时监控
const unsub=store.subscribe(()=>{ console.log(store.getState()); })

//返回操作函数（对象包装函数）
const increment =(payload={})=>{
  return {
  type: "INCREMENT",
  incrementBy:typeof payload.incrementBy ==='number'? payload.incrementBy :1}
}
//这里利用解构 简化写法
const decrement =({decrementBy=1}={})=>{
 return{ type: "DECREMENT", decrementBy}}
//执行
store.dispatch(increment({incrementBy:6}))
store.dispatch(increment({ type: "INCREMENT" }))
store.dispatch(decrement({decrementBy:5})) 
store.dispatch({ type: "SET", count : 100}) 
//直接取消掉subscribe
unsub();

//后面执行但是不会跟踪
store.dispatch({ type: "DECREMENT", decrementBy:3}) 
console.log(store.getState())
```

## 最终完整单个redux例子

最终得到基础的单个redux， 这里注意的重点是，我们用reducer 是为了通过得到一个state以及action 从而返回新的state，并没有改变原本的state，只是给了新的state

```jsx
const initState = {
  count :0 ,
  list:['任务一',"任务二"]
};

const countReducer=(state=initState,action)=>{
  switch(action.type){
  case "INCREMENT":  return { count:state.count+action.incrementBy };
  
  case "DECREMENT":  return { count:state.count-action.decrementBy };
  
  case "RESET": return { count:0 };

  case "SET": return { count:action.setCount };
  
  default: return state
  }
}


 //仓库放所有action选择 以及state 以及返回新的对象
const store = createStore(countReducer) 
//实时监控
const unsub=store.subscribe(()=>{ console.log(store.getState()); })

//返回操作函数（对象包装函数） action generator
const increment =(payload={})=>{
  return {
  type: "INCREMENT",
  incrementBy:typeof payload.incrementBy ==='number'? payload.incrementBy :1}
}

//这里利用解构 简化写法
const decrement =({decrementBy=1}={})=>{
 return{ type: "DECREMENT", decrementBy} 
}

const reset =()=>{
  return { type: "RESET" }
}

const set =({setCount}={})=>{
  return { type: "SET", setCount}
}

//执行
store.dispatch(increment({incrementBy:6}))
store.dispatch(increment({type: "INCREMENT"}))
store.dispatch(decrement({decrementBy:5})) 
store.dispatch(reset())
store.dispatch(decrement({decrementBy:5})) 
store.dispatch(set({setCount:-99})) 
//直接取消掉subscribe
unsub();

//后面执行但是不会跟踪
store.dispatch({ type: "DECREMENT", decrementBy:3 }) 
console.log(store.getState())
```

# 多个reducer例子

那么接下来看看多个reducer的时候 处理数据怎么做

```js
//两个数据例子
const demoState={
  expenses:[{
    id:'poijasdfhwer',
    description:'January Rent',
    note:'This was the final payment',
    amount:54500,
    createdAt:0
  }],
  filters:{
    text:'rent',
    sortBy:'amount',//date or amount
    startDate:undefined,
    endDate:undefined,
  }
}

//default state & reducer
const expensesReducerDefaultState=[];
const expensesReducer=(state=expensesReducerDefaultState,action)=> {
  switch(action.type){
    case "ADD_EXPENSE": 
    //return  state.concat(action.expense);//此处不影响原先数组 只是返回新数组 
    return [...state,action.expense];
    case "REMOVE_EXPENSE": 
    return state.filter(function (elem) {
      return (elem.id !== action.id);
    });
    case "EDIT_EXPENSE": 
    //return  state.concat(action.expense);//此处不影响原先数组 只是返回新数组 
    return state.map((expense)=>{
      if(expense.id===action.id){
        return {
          ...expense,
          ...action.updates,
        }
      }else{
        return expense
      }
    });
    default: return state
  }
}


//返回操作函数（对象包装函数） action generator
const addExpense=({
  description="",
  note="",
  amount=0,
  createdAt=0
}={})=>({
    type:"ADD_EXPENSE",
    expense:{
    id:uuidv4(),
    description,
    note,
    amount,
    createdAt}
  })

const removeExpense=({id}={})=>({ type:"REMOVE_EXPENSE", id })

const editExpense=(id,updates)=>({
    type:"EDIT_EXPENSE",
    id,
    updates
})

//default state & reducer
const filtersReducerDefaultState={
    text:'',
    sortBy:'amount',//date or amount
    startDate:undefined,
    endDate:undefined,
};
const filtersReducer=(state=filtersReducerDefaultState,action)=> {
  switch(action.type){
    case "SET_TEXT_FILTER": 
    return {
      ...state,
      text:action.name
    }
    default: return state
  }
}

//action
const setTextFilter = (name)=>({
  type:"SET_TEXT_FILTER",
  name
})


//仓库放所有action选择 以及state 以及返回新的对象
const store = createStore(combineReducers({expenses:expensesReducer,filters:filtersReducer})) 
//实时监控
const unsub=store.subscribe(()=>{ console.log(store.getState()); })

const expenseOne = store.dispatch(addExpense({description:"Rent",amount:1000})) 
const expenseTwo = store.dispatch(addExpense({description:"Coffee",amount:666}))  

store.dispatch(removeExpense({id:expenseOne.expense.id}))  
store.dispatch(editExpense(expenseTwo.expense.id,{description:"RentNew",amount:19999}))  
store.dispatch(setTextFilter("Rent")); 
```

这里注意 对于箭头函数中，返回时对象，可以直接使用 ( )=>( {对象})

# reference

https://blog.csdn.net/qq_26347769/article/details/109634399

https://juejin.cn/post/6844903894082928654