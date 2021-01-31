---
title: react-JSX & React元素
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-14 15:22:29
password:
summary:
tags: React
categories: React
---

## [React官方](https://react.docschina.org/)

## React 特点

1、声明式的设计

2、高效，采用虚拟DOM来实现DOM的渲染，最大限度的减少DOM的操作。

3、灵活，跟其他库灵活搭配使用。

4、JSX，俗称JS里面写HTML，JavaScript语法的扩展。

5、组件化，模块化。代码容易复用，2016年之前大型项目非常喜欢react

6、单向数据流。没有实现数据的双向绑定。数据-》视图-》事件-》数据

## 创建项目

1、通过script引入使用，仅用于学习调试使用

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

2.通过react的脚手架，创建项目进行开发，部署。（推荐）

全局安装create-react-app

```sh
$ npm install -g create-react-app
```

创建一个项目

```sh
$ create-react-app your-app 注意命名方式
```

如果**不想全局安装**，可以直接使用npx

```sh
$ npx create-react-app your-app	也可以实现相同的效果
```

这需要等待一段时间，这个过程实际上会安装三个东西

- react: react的顶级库
- react-dom: 因为react有很多的运行环境，比如app端的react-native, 我们要在web上运行就使用react-dom
- react-scripts: 包含运行和打包react应用程序的所有脚本及配置

出现下面的界面，表示创建项目成功:

```sh
Success! Created your-app at /dir/your-app
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd your-app
  npm start
```

根据上面的提示，通过`cd your-app`命令进入目录并运行`npm start`即可运行项目。

生成项目的目录结构如下：

```sh
├── README.md						使用方法的文档
├── node_modules					所有的依赖安装的目录
├── package-lock.json				锁定安装时的包的版本号,保证团队的依赖能保证一致。
├── package.json					
├── public							静态公共目录
└── src								开发用的源代码目录
```

常见问题：

- npm安装失败
  - 切换为npm镜像为淘宝镜像
  - 使用yarn，如果本来使用yarn还要失败，还得把yarn的源切换到国内
  - 如果还没有办法解决，请删除node_modules及package-lock.json然后重新执行`npm install命令`
  - 再不能解决就删除node_modules及package-lock.json的同时清除npm缓存`npm cache clean --force`之后再执行`npm install`命令
- yarn
  - 安装 npm install -g yarn
  - 查看版本 yarn --version
  - 设置淘宝源 yarn config set registry https://registry.npm.taobao.org -g

## react 元素渲染方式

### JSX基本方式

```jsx
//实现页面时刻的显示
function clock(){
    let time = new Date().toLocaleTimeString()
    let element = (
        <div>
            <h1>现在的时间是{time} </h1>
            <h2>这是副标题</h2>
        </div>
    )
    let root = document.querySelector('#root');
    ReactDOM.render(element,root)
}
clock()
setInterval(clock,1000)
```

## React Jsx 优点

优点：

1、JSX执行更快，编译为JavaScript代码时进行优化

2、类型更安全，编译过程如果出错就不能编译，及时发现错误

3、JSX编写模板更加简单快速。（不要跟VUE比）

注意：

1、JSX必须要有根节点。

2、正常的普通HTML元素要小写。如果是大写，默认认为是组件。


### JSX表达式

1、由HTML元素构成, 一个var 只能由一层div组成

2、中间如果需要插入变量用{}

3、{}中间可以使用表达式

4、{}中间表达式中可以使用JSX对象

5、属性和html内容一样都是用{}来插入内容

6、class名 只能用className 换行符可以用`<hr />`&`<br />`

#### 例子

```jsx
//定义基本
var temple1 = (
    <div>
    <h1>Header</h1>
    </div>
);

//定义变量
var name ="header";
var age = "10000";
var app={
    title:"this is the main title",
    subtitle:"this is 2nd title",
    options:["option1","option2"]
};

function consoleName(name){ 
  if(name){
      return name;
  }
}

var temple2 = (
    <div>
    	<h1>{name}</h1>
        {/* 三元运算符 */}
     	<p>{age == "1000"? 100 : 0}</p>
        {/* function运用 */}
       <p>{consoleName(app.title)}</p> 
        {/* 本身的题目显示 */}
      <h2>{app.title}</h2>
        {/* 属性存在简单条件判断 显示或者不显示 利用&& */}
       {app.title && app.subtitle && <h2>app.title</h2>} 
        {/* 显示option */}
       {app.options.length>0 ? <p>Here you have options</p> : <p>No option</p>}{/*此除了可以将p标签放在外面*/}
      <h3>{app.subtitle}</h3>
    </div>
);

ReactDOM.render( temple2, document.getElementById('root')) 


```



```jsx
//let man = '发热';
let element4 = (
    <div>
        <span>横着躺</span>
        <span>竖着躺</span>
    </div>
)
man = '正常'
let element3 = (
    <div>
        <h1>今天是否隔离</h1>
        <h2>{man=="发热"?<button>隔离</button>:element4}</h2>
    </div>
)
ReactDOM.render(
    element3,
    document.getElementById('root')
)

let color = 'bgRed'
let logo = 'https://www.baidu.com/img/pc_1c6e30772d5e4103103bd460913332f9.png'
//HTML的样式类名要写className,因为class在js当中是关键词
let element5 = (
    <div className={color}>
        <img src={logo} />
        红色的背景颜色
    </div>
)

ReactDOM.render(element5,document.getElementById('root'))
```

## 编写第一个react应用程序

eact开发需要引入多个依赖文件：react.js、react-dom.js，分别又有开发版本和生产版本，create-react-app里已经帮我们把这些东西都安装好了。把通过CRA创建的工程目录下的src目录清空，然后在里面重新创建一个index.js. 写入以下代码:
```jsx
// 从 react 的包当中引入了 React。只要你要写 React.js 组件就必须引入React, 因为react里有一种语法叫JSX，稍后会讲到JSX，要写JSX，就必须引入React
import React from 'react'
// ReactDOM 可以帮助我们把 React 组件渲染到页面上去，没有其它的作用了。它是从 react-dom 中引入的，而不是从 react 引入。
import ReactDOM from 'react-dom'

// ReactDOM里有一个render方法，功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上
ReactDOM.render(
// 这里就比较奇怪了，它并不是一个字符串，看起来像是纯 HTML 代码写在 JavaScript 代码里面。语法错误吗？这并不是合法的 JavaScript 代码, “在 JavaScript 写的标签的”语法叫 JSX- JavaScript XML。
  <h1>欢迎进入React的世界</h1>,
// 渲染到哪里
  document.getElementById('root')
)
```

### 元素与组件

#### 变量元素

如果代码多了之后，不可能一直在render方法里写，所以就需要把里面的代码提出来，定义一个变量，像这样：
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
// 这是在用JSX定义一下react元素
const app = <h1>欢迎进入React的世界</h1>
ReactDOM.render( app, document.getElementById('root'))
```

#### 函数式组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => <h1>欢迎进入{props.name}的世界</h1>
//const App(props){
//return (<h1>欢迎进入{props.name}的世界</h1>)
//}

 // React组件的调用方式
ReactDOM.render(<App name="react" />, document.getElementById('root'))
```

**注意！注意！注意！\**组件名必须\**大写**，否则报错

### class组件

ES6的加入让JavaScript直接支持使用class来定义一个类，react的第二种创建组件的方式就是使用的类的继承，`ES6 class`是目前官方推荐的使用方式.(class 可以实现的，函数组件不一定能实现)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      // 注意这里得用this.props.name, 必须用this.props
      <h1>欢迎进入{this.props.name}的世界</h1>
  	)
  }
}
ReactDOM.render( <App name="react" />, document.getElementById('root')) 
```

运行结果和之前完全一样，因为JS里没有真正的class，这个class只是一个语法糖, 但二者的运行机制底层运行机制不一样。
- 函数式组件是直接调用, 在前面的代码里已经有看到
- `es6 class`组件其实就是一个构造器,每次使用组件都相当于在实例化组件，像这样：

```jsx
  import React from 'react'
  import ReactDOM from 'react-dom'
  
  class App extends React.Component {
    render () {
      return ( <h1>欢迎进入{this.props.name}的世界</h1>)
    }
  }
  
  const app = new App({ name: 'react' }).render()
  
  ReactDOM.render( app, document.getElementById('root')) 
```

##### super关键字

Es6中的super可以用在类的继承中，super关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。

```jsx
class Person {
    constructor (name) {
    	this.name = name;
    }
}

class Student extends Person {
    constructor (name, age) {
        super(); // 用在构造函数中，必须在使用this之前调用
        this.age = age;
    }
}
```



#### 组件的组合、嵌套

将一个组件渲染到某一个节点里的时候，会将这个节点里原有内容覆盖.

组件嵌套的方式就是将子组件写入到父组件的模板中去，且react没有Vue中的内容分发机制（slot），所以我们在一个组件的模板中只能看到父子关系

``` jsx
// 从 react 的包当中引入了 React 和 React.js 的组件父类 Component
// 还引入了一个React.js里的一种特殊的组件 Fragment
import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

class Title extends Component {
  render () {return (<h1>欢迎进入React的世界</h1>)}
}
class Content extends Component {
  render () {return (<p>React.js是一个构建UI的库</p>)}
}
/** 由于每个React组件只能有一个根节点，所以要渲染多个组件的时候，需要在最外层包一个容器，如果使用div, 会生成多余的一层dom
class App extends Component {
  render () {
    return (
    	<div>
    		<Title />
        <Content />
      </div>
  	)
  }
}
**/
// 如果不想生成多余的一层dom可以使用React提供的Fragment组件在最外层进行包裹
class App extends Component {
  render () {
    return (
      <Fragment>
      	<Title />
        <Content />
      </Fragment>
  	)
  }
}
ReactDOM.render( <App/>, document.getElementById('root'))
```

## JSX 原理

要明白JSX的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构?

看下面的DOM结构

```html
<div class='app' id='appRoot'>
  <h1 class='title'>欢迎进入React的世界</h1>
  <p>
    React.js 是一个帮助你构建页面 UI 的库
  </p>
</div> 
```

上面这个 HTML 所有的信息我们都可以用 JavaScript 对象来表示：

```js
{
  tag: 'div',
  attrs: { className: 'app', id: 'appRoot'},
  children: [
    {
      tag: 'h1',
      attrs: { className: 'title' },
      children: ['欢迎进入React的世界']
    },
    {
      tag: 'p',
      attrs: null,
      children: ['React.js 是一个构建页面 UI 的库']
    }
  ]
} 
```

但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。

下面代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      <div className='app' id='appRoot'>
        <h1 className='title'>欢迎进入React的世界</h1>
        <p>
          React.js 是一个构建页面 UI 的库
        </p>
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('root')) 
```

编译之后将得到这样的代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render () {
    return (
      React.createElement(
        "div",
        {
          className: 'app',
          id: 'appRoot'
        },
        React.createElement(
          "h1",
          { className: 'title' },
          "欢迎进入React的世界"
        ),
        React.createElement(
          "p",
          null,
          "React.js 是一个构建页面 UI 的库"
        )
      )
    )
  }
}

ReactDOM.render(
	React.createElement(App),
  document.getElementById('root')
) 
```

`React.createElement` 会构建一个 JavaScript 对象来描述你 HTML 结构的信息，包括标签名、属性、还有子元素等, 语法为

```jsx
React.createElement(
  type,
  [props],
  [...children]
) 
```

所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:

> JSX —使用react构造组件，bable进行编译—> JavaScript对象 — `ReactDOM.render()`—>DOM元素 —>插入页面

## JSX_style 样式

### 行内style

react组件jsx，行内style**固定**写法就是**双花括号**：

```jsx
<Input placeholder="xxx"  style={{width:'233px', marginRight:'10px'}} />
```

注意style中有多组属性要用逗号','隔开，而不是html行内样式的分号';' 要注意区分

**有两对花括号的原因：**

①外层花括号：因为React使用的是JSX语法，JSX语法中嵌入任何js变量、表达式、对象都要用花括号{}扩起来，

②内层花括号：JSX如果用到行内CSS style样式时，这个行内样式必须是一个js对象，即{width:'233px', marginRight:'10px'}是一个对象所以用花括号扩起来。

使用React的行内样式设置样式过程

(1)在JSX文件中定义样式变量,和定义普通的对象变量一样

```jsx
let backAndTextColor = {backgroundColor:'blue', color:'#ff671b', fontSize:40 };
```

(2)JSX的调用
```jsx
let element3 = (
<div style={backAndTextColor}>行内样式测试</div>
 )
```
也可以直接写到JSX中,如下:

```jsx
<div style={{backgroundColor:'blue',color:'#ff671b',fontSize:40}}>行内样式测试</div>
```

#### 多个类共存的操作

```jsx
let element2 = (
    <div>
        <h1 className={"abc "+classStr}>helloworld</h1>
    </div>
)

let classStr2 = ['abc2','redBg2'].join(" ")
let element3 = (
    <div>
        {/* 这里写注释 */}
        <h1 className={classStr2} style={exampleStyle}>helloworld</h1>
    </div>
)
```
