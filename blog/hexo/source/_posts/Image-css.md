---
title: Image css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-12 20:43:51
password:
summary:
tags:  css&html
categories:  Front-end
---

# **Image in CSS** 

## 基本函数

background: url(img/avatar.jpg) no-repeat;

background-size:100% 100% ;

 filter: blur(10px);

景深+移动（例子 蓝天白云，远近移动)

变形，移位： transform（2D，3D）， translate，animation

倒影：-webkit-box-reflect:

颜色渐变：linear-gradient

动态动画控制：@keyframes animation

​               

## animation

### rainbow变色块

```html
<style>
  div {
    height: 40px;
    width: 70%;
    background: black;
    margin: 50px auto;
    border-radius: 5px;
  }

#rect {
animation-name:rainbow;
animation-duration:4s;}

@keyframes rainbow {
0% {background-color: blue;}
50% {background-color: green;}
100% {background-color: yellow;}}

</style>
<div id="rect"></div>
```

## Reference:

Image css: https://www.w3schools.com/howto/howto_js_slideshow.asp