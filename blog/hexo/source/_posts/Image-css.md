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
categories:  css&html
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

### rainbow变色块 - 单纯的背景颜色或者图片变色

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

### 渐变色选色工具

https://mycolor.space/gradient3

https://cssgradient.io/gradient-backgrounds/



##  使CSS背景图片变暗

```css
.bg{
  background: url('http://res.cloudinary.com/wisdomabioye/image/upload/v1462961781/about_vbxvdi.jpg');
  height: 500px;
  -webkit-background-size: cover;
  -moz-background-size:  cover;
  -o-background-size: cover;
   background-size: cover;
}
.content{
  background: rgba(0,0,0,0.4);
  color: white;
  height: inherit;
  padding-left: 10px;
}
```

```html
<div class='bg'>
   <div class='content'>
     <p>
        Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some Some content Some content Some content Some content Some content Some 
    </p> 
  </div> 
 </div>
```



## 背景虚化

```html
<image class="bg" src="{{songContent.picUrl}}" />
```

```css
.bg{
  z-index: -100;
  position: absolute;
  filter: blur(35px);
  width: 100%;
  height: 100%;
  -webkit-filter:blur(15px);
  -moz-filter:blur(15px);
  -o-filter:blur(15px);
  -ms-filter:blur(15px);
}
```



## Reference

Image css: https://www.w3schools.com/howto/howto_js_slideshow.asp