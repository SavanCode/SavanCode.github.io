---
title: css question&solution
top: false
cover: false
toc: true
mathjax: true
date: 2020-12-01 16:10:20
password:
summary:
tags:  css&html
categories:
---

## 为什么height:100%不生效

对于`height`属性，如果父元素`height`为`auto`，只要子元素在文档流中（即`position`不等于`fixed`或者`absolute`），其百分比值完全就被忽略了。

```HTML
<head>
  <title>黑色主题</title>
  <style>
    .box {
      width: 100%; // 这是多余的
      height: 100%; // 这是无效的
      background: #000;
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
```

### solution

1.设定显式的高度值。

```CSS
html, body {
 height: 100%;
}
```

2，使用绝对定位

```html
  <style>
    body {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .box {
      width: 100%;
      height: 100%;
      background: #000;
    }
  </style>
</head>
<body>
  <div class="box">
  </div>
</body>
```



## ul高度显示为0（内容撑不开）

![](css-question-solution/1606914092190.png)

### 推荐方法一

```html
<div class="fuqin">
    <ul>
        <li>内容1</li>
        <li>内容1</li>
         <div class="clearfloat"></div>
    </ul>
</div> 
<style>
.clearfloat{
    clear:both;
    height:0;
    font-size: 1px;
    line-height: 0px;} 
</style>
```

### 推荐方法二

利用伪元素:after,给ul清除浮动

```css
#box>ul:after{
    content: "";
    display: block;
    clear: both;
}
```

在:after为元素里面用到了content属性，这样这条样式的意思是在ul元素后面生成指定的内容，这里生成的内容是一个空字符串，因为只是让它来消除ul标签的高度折叠，并不让它显示出来。还有，这条样式里有display属性，要将他设置成block，这样clear属性才会起作用，因为清除操作只作用于块级元素，它的原理是为要执行清除操作的元素添加上边距，以此让元素降到浮动元素的下面，而操作行内元素的上边距不起作用。

### 方法三

 利用overflow属性 
可以包含元素设置overflow属性，并设置属性值为auto或者hidden。

```css
ul { 
list-style-type: none; 
width: 800px; background: blue; 
overflow: hidden; /*添加overflow属性，可以设置为auto或者hidden*/ }
```