---
title: react_1week Day 4
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-17 16:23:19
password:
summary:
tags: React
categories: React
---

# React 中 style

```jsx
const styles={
  color: "purple", 
  fontSize: 40, 
  border: "2px solid purple" 
} 
class Colorful extends React.Component {
  render() { 
    return (
      <div style={styles}>Style Me!</div>//写成inline的也可以 但是简单的写inline比较好
    ); 
  }
};
```

# React 中 condition

三元运算

```jsx
<h1>{ this.props.option ? "You Win!" : "You Lose!"}</h1> //option: Math.random() >= .5 返回的true false
```

# 使用PropTypes验证数据

```jsx
MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }//function
Items.propTypes={quantity:PropTypes.number.isRequired};//确保是number 
```

# Array.map（）动态渲染元素

```jsx
//toDoList is array
render() {
    const items = this.state.toDoList.map(i => <li>{i}</li>);
    return(<div></div>)
    }
//创建元素数组时，每个元素都需要将一个key属性设置为唯一值。React使用这些键来跟踪添加，更改或删除的项目
const renderFrameworks = frontEndFrameworks.map(i => <li key={i}>{i}</li>)
```

# 使用Array.filter（）动态过滤一个数组

```jsx
render() {
    const usersOnline = this.state.users.filter(user => user.online); // Change this line
    const renderOnline = usersOnline.map((i) => <li key={i.username}>{i.username}</li>); // Change this line
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
}
```

