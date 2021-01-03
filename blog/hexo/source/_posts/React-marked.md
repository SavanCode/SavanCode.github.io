---
title: React中使用marked
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-03 19:07:39
password:
summary:
tags: React
categories: React
---

## [marked](https://cdnjs.com/libraries/marked)



## 引入marked

```
yarn add marked | npm install marked --save
yarn add highlight.js  // 代码高亮插件(可用可不用，自由选择)
```

## dangerouslySetInnerHTML

React 提供 dangerouslySetInnerHTML 方法，用以取代瀏覽器 DOM 裡面的 innerHTML 方法。一般來說，直接把代碼看成 HTML 是一個危險的舉動，因為它很容易暴露跨網站指令碼 (XSS) 攻擊的風險。所以，React 會需要我們傳入一個對象，使用 __html 值來提醒我們這個是危險的舉動。

使用方法：

```javascript
function createMarkup() {
  return { __html: "First &middot; Second" };
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

## 简单例子

```jsx
	var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });//基本设置
    console.log(marked('I am using __markdown__.'));
    // Outputs: <p>I am using <strong>markdown</strong>.</p>
```

## 自定义解析

```jsx
const renderer = new marked.Renderer() 
const paragraphParse = text => `<p>${text}</p>` 
renderer.paragraph = paragraphParse 
return marked(content, { renderer }) 
```



## 练习例子

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  
import marked from 'marked' 

const defaultContent = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
}

const Window =(props)=>(
  <div id="windowTop">{props.title}</div>
)

const Previewer=(props)=>{
    return(
      <div id="previewDiv" >
        <Window title='Previewer'/>
        <div id="preview" dangerouslySetInnerHTML={{
          __html: marked(props.content, {
            breaks: true,
            renderer: renderer,
          })
          }
       } ></div>
      </div>
    )
}
const Editor=(props)=>{
  return(
    <div id="editorDiv">
      <Window title='Editor'/> 
      <textarea id="editor" value={props.content} onChange={props.changeContent}  ></textarea>
    </div>
  )
}
 
class MarkdownPreviewer extends React.Component{
  constructor(props){
    super(props);
    this.state={ content:defaultContent }
  } 

  changeContent=(e)=>{ 
    this.setState({
      content:e.target.value
    })
  }

  render() {
    return (
    <>
      <Editor content={this.state.content} changeContent={this.changeContent}/>
      <Previewer content={this.state.content} /> 
    </>
    )
  }
}


ReactDOM.render(  <MarkdownPreviewer /> ,document.getElementById('root') );
```

# Reference

codecamp练习

https://www.cnblogs.com/djtao/p/6224399.html

https://github.com/markedjs/marked

