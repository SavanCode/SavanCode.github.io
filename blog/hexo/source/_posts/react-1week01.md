---
title: react-1week Day 1
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-16 14:29:43
password:
summary:
tags: React
categories: React
---

# React 事件与方法

通过前面的练习，我们将用class写

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
 
class IndecisionApp extends React.Component{
  render(){
    const title ='Indecision';
    const subtitle = 'Put your life in the hand of Computer';
    const options = ["option 1","option 2","option 3"]
    return (
      <div>
         <Header title={title} subtitle={subtitle}/>
        <Actions />
        <Options optionArray={options}/>
        <AddOption />
      </div>
    )
  }
}


class Header extends React.Component{
  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

class Actions extends React.Component{
  handlePick(){
    alert("pick!!!");
  }
  render(){
    return (
      <div>
        {/* <p>This is Action</p> */}
        <button onClick={this.handlePick} >What should I do</button>
      </div>
    )
  }
}


class Options extends React.Component{
  removeAll(){
    alert("remove all ");
  }
  render(){
    return (
      <div>
        Here are option Components from optionArray
        {
         (this.props.optionArray).map((option) => {
            return <Option key={option} optionText={option}/>
          })
        } 
       <button onClick={this.removeAll}> Remove All</button>
      </div>
    )
  }
}


class Option extends React.Component{
  render(){
    return (
      <div>
        {/* <p>This is Option Components</p> */}
        <p>{this.props.optionText}</p>
      </div>
    )
  }
}


//AddOption
class AddOption extends React.Component{
  addOptionFunc(e){
    e.preventDefault();  //防止刷新
    const option = e.target.elements.option.value;//获得输入值
    if(option){
      console.log(option);
      e.target.elements.option.value="";//清空输入值的显示
    }
  } 
  render(){
    return (
      <div>
        <p>This is AddOption Components</p>
        <form onSubmit={this.addOptionFunc}>
          <input type="text" name="option"/>
          <button>+1</button>
        </form>
      </div>
    )
  }
}


/* 
const title ='Indecision';
const subtitle = 'Put your life in the hand of Computer';
const options = ["option 1","option 2"]

 const jxs = (
   <div> 
     <Header title={title} subtitle={subtitle}/>
     <Actions />
     <Options optionArray={options}/>
     <AddOption />
   </div>
 )
*/

//注意此处 const 与class 渲染的不同方式
//ReactDOM.render(jxs, document.getElementById('root'));

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

# 事件绑定

## 原理解释

**React事件绑定时需要注意this指向**

react事件绑定时。this并不会指向当前DOM元素。往往使用bind来改变this指向。有参数就得使用bind

```jsx
<button onClick={this.function.bind(this)}>Click Me</button>
```

> 参考这篇文章：[Choosing the Best Approach for React Event Handlers](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/)
>
> 1、function.bind()方式
>
> 2、inline arrow function方式
>
> 3、Class Property Arrow Functions - constructor
>
> 第一种方式比较常见，但因为每次父组件render时，会重新生成一个函数，相当于子组件的props发生了改变。子组件的PureComponent会失效。
>
> 第二种是一种性能好，书写简单，功能强大的方式。
>
> 第三种因为是类的属性，可能涉及到继承、方法调用问题，性能有影响。

接下来要加上动态事件，这时候跟前面的区别在于这里由于用的是class，属性之间没有办法很好的共享

### function.bind()方式

```jsx
const obj={
    name="tom";
    getName(){
        return this,name;
    }
}
//这里利用bind绑定对于后面的obj
const getName=obj,getName.bind({name:"joe"});
console.log(getName());
```

### inline arrow function方式

1. 为事件提供的处理函数，必须是如下格式

```
onClick= { function } 
```

2. 用的最多的事件绑定形式为：

```jsx
<button onClick={ () => this.show('传参') }>按钮</button>

// 事件的处理函数，需要定义为 一个箭头函数，然后赋值给 函数名称
show = (arg1) => {
   console.log('show方法' + arg1)
}
```

## 回归例子

### 方式一 -  bind

实际上我们尝试用处理removeAll, 先拿到所有的props，两种办法

```jsx
//方法1：加上removeAll动态的事件，拿到如数的数据，方式一：绑定bind（）
class Options extends React.Component{
  removeAll(){
    console.log(this.props.optionArray);
     
  }
  render(){
    return (
      <div>
        Here are option Components from optionArray
        {
         (this.props.optionArray).map((option) => {
            return <Option key={option} optionText={option}/>
          })
        } 
        {/* 绑定“参数对象”，所以这里绑定的实际上是传进来的props，所以函数操作对应就是参数对象 */}
       <button onClick={this.removeAll.bind(this)}> Remove All</button>
      </div>
    )
  }
}

```

缺点：

1. 数量多时极其浪费内存
2. 如果是子组件的props，则会导致子组件重新渲染

### 方式二 ：通过constructor绑定

```jsx
//方式二 通过constructor绑定
class Options extends React.Component{
  constructor(props){//构造函数继承
    super(props);
    this.removeAll = this.removeAll.bind(this);
  }
  removeAll(){
    console.log(this.props.optionArray);
  }
  render(){
    return (
      <div>
        Here are option Components from optionArray
        {
         (this.props.optionArray).map((option) => {
            return <Option key={option} optionText={option}/>
          })
        } 
        {/* 绑定“参数的this” */}
       <button onClick={this.removeAll}> Remove All</button>
      </div>
    )
  }
}
```

# State

组件自身的state，**注意！！注意！！ 这是对象**

做一个计数器中利用state进行改变数量

```jsx
//利用算数函数 确保立即执行 保障同步性；因为setState本身是异步函数
incrementCount(){
   this.setState((prevState, props) => ({
      count: prevState.count + 1 //count 是state中属性
    }));
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }
```

![](react-1week01/image-20201216190542366.png)

实际上不会，由于是异步，所以第一个设为0并没有完成，但是可能先+1；

## setState函数 

改变class内state变量

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.addone=this.addone.bind(this);
    this.minuseone=this.minuseone.bind(this);
    this.reset=this.reset.bind(this);
    this.state={ count:100 }
  }

  addone(){
    this.setState((prevState)=>{
       return {
         count: prevState.count+1}
    });
  }
  minuseone(){
    this.setState((prevState)=>{
      return {
        count: prevState.count-1}
   });
  }
  reset(){
    this.setState((prevState)=>{
      return {
        count: 0}
   });
  }

  render() {
    return (
    <div>
    <h1>Count: {this.state.count} </h1>
    <button onClick={this.addone }> +1</button>
    <button onClick={this.minuseone}> -1</button>
    <button onClick={this.reset}> reset</button>
    </div>
    )
  }
}

ReactDOM.render( <Counter />, document.getElementById('root'));
```

# Props vs State

![](react-1week01/image-20201216190719032.png)

props是单向联动的

# 函数组件

## 无状态组件

**无状态组件不支持this！！**

```jsx
/* 基本语法
const User=()=>{
    return <div></div>
}*/
//这里不需要用this.props
const User=(props)=>{
    return (<div>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
        </div>)
}
ReactDOM.render( <User name="tom" age={28}/>, document.getElementById('root')); 
```

```jsx
//注意区别 仔细看对比
class Header extends React.Component{
  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    )
  }
}

const Header=(props)=>{
  return(
    <div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
  );
}
```

## 默认input

```jsx
const Header=(props)=>{
  return(
    <div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
  );
}
//此处为默认input
//className.defaultProps={ 属性：''}
Header.defaultProps={
  title:'Default Title'
}

class IndecisionApp extends React.Component{
      constructor(props){
      super(props);
      this.state={
        options : props.options
      }
      this.handlePick=this.handlePick.bind(this);
      this.removeAll=this.removeAll.bind(this);
  }

  render(){
    const title ='Indecision App';
    const subtitle = 'Put your life in the hand of Computer';
    return (
      <div>
         {/* 此时title就是默认的title
         <Header title={title} subtitle={subtitle}/>
         */}
         <Header subtitle={subtitle}/>
      </div>
    )
  }
}
IndecisionApp.defaultProps={ option:[]}

//有无输入区别
ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
//ReactDOM.render(<IndecisionApp options={["option 1","option 2"]} />, document.getElementById('root'));
```

## onclick函数

```jsx
const Option = (props)=>{
  return(
    <div> 
      <p>{props.optionText}</p>
      <button onClick={()=>{props.deleteFunc(props.inputText)}}>remove this</button>
    </div>
  )
}
```

