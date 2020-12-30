---
title: react-1week Day 4
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

# [react router](https://reactrouter.com/)

客户端路由 ，不通过刷新页面不走服务器

## react-router VS react-router-dom

React-router 提供了一些router 的核心，包括Router、Route、Switch等，但是它没有提供dom操作进行跳转的API；而React-router-dom 则是基于react-router 加上浏览器运行环境下的一些功能，例如：Link、BrowserRouter、HashRouter等API。

因此，安装只要装react-router-dom 即可(包含react-router功能）。

```jsx
npm install react-router-dom
```



### HashRouter

hashHistory不需要设置服务器，使用URL的hash （即window.location.hash）来保持UI和URL的同步，适合静态网站。HashRouter的URL形式为`http://example.com/#/some/path`。#后的所有字串都不会发GET请求到server端，像是上方的`example.com/#/some/path`只会送出`example.com`到server端，然后只要server端回传JavaScript载入到客户端，剩下的/some/path就由Router去判断处理。

```jsx
import { HashRouter } from  'react-router-dom' ;
ReactDOM.render( 
  <HashRouter> 
    <App /> 
  < /HashRouter>, 
);
```

### BrowserRouter(推荐使用)

browserHistory需要设置伺服器，路径是真实的URL，较为推荐。URL的形式为`example.com/some/path`，背后使用的是浏览器的History API((pushState, replaceState和popstate事件))来保持UI和URL的同步。

```jsx
import { BrowserRouter } from  'react-router-dom' ;
ReactDOM.render( 
  <BrowserRouter> 
    <App /> 
  < /BrowserRouter>, 
);
```

## Route Matchers:`<Route>`和`<Switch>`

### Route

Route 必须放在Router 内，用来控制路由对应显示的元件，常见的属性包括： exact、path、strict、sensitive 以及component。Route 利用path 属性去匹配路径，若符合则渲染component，若不符合则回传null，若没设定path 则永远会渲染。exact path 会进行严格比对path，路径要完全符合才会渲染元件。

```jsx
//exact=>完全匹配，路径为/时才渲染Home
 <Route exact path= "/" component={Home}> </ Route >

//路径为/second或/second/hello都会渲染
<Route path= "/second" component={Second}> </ Route >

//没设定路径，永远会渲染
<Route component={Always}/>

//sensitive =>大小写敏感，若path为/Second，则不会渲染
<Route sensitive path= "/second" component={Second}> </ Route >

//strict =>若path为/second/(多了尾部的/)，则不会渲染
<Route sensitive path= "/second" component={Second}> </ Route >
```

Route可以接受三种props来决定路由符合时渲染的元件，通常会择一使用。
`<Route component>`：路由符合时，回传component(透过React.createElement渲染)
`<Route render>`：路由符合时，渲染functional component
`<Route children>`：无论路由是否符合都会渲染

＊注意：同时用component和render，component 会优先于render; 而children 则优先于component 和render。

> [Route component](https://reacttraining.com/react-router/web/api/Route/component) @React-router
  > [Route render](https://reacttraining.com/react-router/web/api/Route/render-func) @React-router
  > [Route children](https://reacttraining.com/react-router/web/api/Route/children-func) @React-router

`<Route>`渲染的元件会带有props，而props 中会有match、location 和history物件。

(1)match:含有path和URL如何比对的资讯
(2)location:应用程式过去、现在和未来的位置
(3)history:可以拿来控制路由的跳转

### Route 嵌套

Route组件还可以嵌套。

```jsx
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```

上面代码中，用户访问/repos时，会先加载App组件，然后在它的内部再加载Repos组件。

```jsx
<App>
  <Repos/>
</App>
```

App组件要写成下面的样子。

```jsx
export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})
```

上面代码中，App组件的this.props.children属性就是子组件。 子路由也可以不写在Router组件里面，单独传入Router组件的routes属性。

```jsx
let routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>
```

### Switch

用来渲染与路径匹配的第一个`<Route>`或`<Redirect>`

```jsx
import { Switch, Route } from  'react-router' ;

<Switch> 
  <Route exact path= "/" component={Home} /> 
  <Route path= "/about" component={About} /> 
  <Route path= "/:user" component={User} /> 
  < Route component={NoMatch} /> 
< /Switch>
```

此时若路径为/about ，`<Switch>`开始寻找匹配的`<Route>`。找到了`<Route path="/about" />`便会停止查找并立即呈现`<About>`。

## Path 属性

Route组件的path属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。 请看下面的例子。

```jsx
<Route path="inbox" component={Inbox}>
   <Route path="messages/:id" component={Message} />
</Route>
```

上面代码中，当用户访问/inbox/messages/:id时，会加载下面的组件。

```jsx
<Inbox>
  <Message/>
</Inbox>
```

如果省略外层Route的path参数，写成下面的样子。

```jsx
<Route component={Inbox}>
  <Route path="inbox/messages/:id" component={Message} />
</Route>
```

现在用户访问/inbox/messages/:id时，组件加载还是原来的样子。

```jsx
<Inbox>
  <Message/>
</Inbox>
```

## 通配符

path属性可以使用通配符

```jsx
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

通配符的规则如下。

> paramName 
> :paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
>
> () 
> ()表示URL的这个部分是可选的。

*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。

> ** 
> ** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

------

path属性也可以使用相对路径（不以/开头），匹配时就会相对于父组件的路径，可以参考上一节的例子。嵌套路由如果想摆脱这个规则，可以使用绝对路由。 路由匹配规则是从上到下执行，一旦发现匹配，就不再其余的规则了。

```jsx
<Route path="/comments" ... />
<Route path="/comments" ... />
```

上面代码中，路径/comments同时匹配两个规则，第二个规则不会生效。 设置路径参数时，需要特别小心这一点

```jsx
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```

上面代码中，用户访问/about/me时，不会触发第二个路由规则，因为它会匹配/:userName/:id这个规则。因此，带参数的路径一般要写在路由规则的底部。 此外，URL的查询字符串/foo?bar=baz，可以用this.props.location.query.bar获取。

### 例子

```jsx
const NotFoundPage= ()=>(
  <div>
    404 - <Link to="/">Go Home</Link>
  </div>
)

const Item =()=>(
      <div> 
         <Link to= "/Portfolio/1" >item 1</Link> 
         <Link to= "/Portfolio/2" >item 2</Link>   
      </div>
)
      
const ItemDetail =(props)=>{
return (
    <div>  
      <h1>A Thing I've Done</h1>
      <p>This page is for item with the id of {props.match.params.id}</p>
    </div>
)}

const Content = () => (
    <Switch>
      <Route exact path="/Portfolio" component={Portfolio} />
      <Route exact path="/Portfolio/:id"  component={ItemDetail} />
      <Route component={NotFoundPage} />
    </Switch>
);

const routes = (
  <BrowserRouter>
      <Content /> 
  </BrowserRouter>
 )

ReactDOM.render(routes , document.getElementById('root'));    
```



## Navigation : `<Link>`、`<NavLink>`、`<Redirect>`

### Link

相当于html的a标签，to可以接受string 或者object

```jsx
<Link to= "/" >Home< /Link> 
    {/*等于<a href="/ ">Home</a>*/} 
<link to={{ 
     pathname:'/course', 
     search:'?sort=name' , 
     hash:'#the-hash', 
     state:{fromDashboard:true} 
}}/>
```

### NavLink

相当于active的a标签。

```jsx
<NavLink to= "/react" activeClassName= "hurray" > 
  React 
</NavLink>

{/*当路径为/ react时，则渲染
<a href= "/react" className= "hurray" >React< /a> 
路径不匹配时，则渲染
<a href="/ react ">React< /a>*/}
```

> NavLink相比Link多了一些样式调节，作用其实相差不大

### Redirect

`<Redirect>`重定向到同等级的其他路由，直接跳转

```jsx
<Redirect to= "/login" />
```

`<IndexRedirect>`从父路由的目录开始重定向

```jsx
<Route path="/" component={App}>
  <IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```

## 渲染props

有三种方式：component， render（）， children，但是我们最常用的还是component，render

如果你有一个存在的组件，，而且你不想传递一个特定的组件内部变量信息的话，可以直接使用component，

如果你想渲染一个组件需要传递局部变量，可以使用render

```jsx
const Home = () => <div>Home</div>;
const App = () => {
  const someVariable = true;
  return (  
    <Switch> 
    <Route exact path="/" component={Home} />
    <Route path="/about" render={props => <About {...props} extra={someVariable} />} /> 
    <Route path="/contact" component={props => <Contact {...props} extra={someVariable} />} />
    </Switch>
 ); };
```

因为如果你不这样做，会引起期望之外的组件的卸载和重载。

# 完整练习

```jsx
import React from 'react';
import ReactDOM from 'react-dom'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Switch,Link} from "react-router-dom";
import { NavLink} from "react-router-dom";

const Header =()=>(
    <div>
      <h1>Portfolio</h1>
      <NavLink exact to="/">  Home </NavLink>
      <NavLink exact to="/Portfolio">  Portfolio </NavLink>
      <NavLink exact to="/Contact">  Contact </NavLink> 
    </div>);
 

const Home =()=>{ 
  return (
    <div>
        <h1>Welcome</h1>
        <p>This is my site. Take a look around!</p>
  </div>
  )}
  
const Item =()=>{
  return (
      <div> 
         <Link to= "/Portfolio/1" >item 1</Link> 
         <Link to= "/Portfolio/2" >item 2</Link>   
      </div>
  )}
      
const ItemDetail =(props)=>{
return (
    <div>  
      <h1>A Thing I've Done</h1>
      <p>This page is for item with the id of {props.match.params.id}</p>
    </div>
)}

const Portfolio =()=>(
   <div>
    <h1>My Work</h1>
      <p>Checkout the stuff I have done</p>
      {/* <Link to= "/Portfolio/1" >item 1</Link> 
      <Link to= "/Portfolio/2" >item 2</Link> */}
      <Item />
   </div>
);

const Contact =()=>(
<div>
  <h1>Contact</h1>
  <p>You can reach me at test@gmail.com</p>
</div>
);

const NotFoundPage= ()=>(
  <div>
    404 - <Link to="/">Go Home</Link>
  </div>
)
const Content = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Portfolio" component={Portfolio} />
      <Route exact path="/Portfolio/:id"  component={ItemDetail} />
      <Route path="/Contact" component={Contact} />
      <Route component={NotFoundPage} />
    </Switch>
  );

const routes = (
  <BrowserRouter>
    <Route path="/"  component={Header} />
      <Content /> 
  </BrowserRouter>
 )

 ReactDOM.render(routes ,document.getElementById('root'));
```



# reference

https://ithelp.ithome.com.tw/articles/10204137

https://blog.csdn.net/qq_39055963/article/details/100848845

 

# 额外阅读

https://imcy2018.appspot.com/projects.php