---
title: js animation 动画
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-30 19:24:01
password:
summary:
tags: JS
categories:
---

# js实现动画

## 运动的三要素

1. 起始点

> 一个运动的起始点其实就是当前元素的位置，我们通过API获取当前元素的位置，让这个位置作为运动的起始。

1. 目标
2. 速度

## 基本的元素移动

```html
      <script> 
         var imgObj = null;
         function init() {
            imgObj = document.getElementById('myImage');
            imgObj.style.position= 'relative';
            imgObj.style.left = '0px';
         }
         function moveRight() {
            imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
         }
         window.onload =init; 
      </script>
   </head>
   <body>
      <form>
         <img id="myImage" src="/images/html.gif" />
         <p>Click button below to move the image to right</p>
         <input type="button" value="Click Me" onclick="moveRight();" />
      </form>
   </body>
```

## 时间块

`setTimeout("function", interval)`，让指定的函数经过某段时间（interval）之后才开始执行，单位为毫秒。 `variable = setTimeout("function", interval);` 

取消等待执行的某个函数：`clearTimeout(variable)` 设置5秒后，移动，期间随时可以使用`clearTimeout(movement)`来取消移动。

```html
<body>
<p id="message">where</p>
<p id="message2">whoa!</p>
<script>   
    function positionMessage(){
        var elem = document.getElementById("message");
        elem.style.position = "absolute";
        elem.style.left = "50px";
        elem.style.top = "100px";
        moveElement("message",125,25,20);

        var elem = document.getElementById("message2");
        elem.style.position = "absolute";
        elem.style.left = "50px";
        elem.style.top = "50px";
        moveElement("message2",125,125,10);
        //movement = setTimeout("moveMessage()", 5000);
    }

    function moveElement(elementID,final_x,final_y,interval){
       var elem = document.getElementById(elementID);
       var xpos = parseInt(elem.style.left);
       var ypos = parseInt(elem.style.top);
       if(xpos == final_x && ypos == final_y){
           return true;
       }
       if(xpos < final_x){
           xpos++;
       }
       if(xpos > final_x){
        xpos--;
       }
       if(ypos < final_y){
           ypos++;
       }
       if(ypos > final_y){
        ypos--;
       }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement = setTimeout(repeat,interval);
   }
    // function moveMessage(){
    //     var elem = document.getElementById("message");
    //     elem.style.left = "200px";
    // }
    positionMessage();
    // moveMessage();
</script>
</body>
```

## css属性 动画注意点

`overflow`属性处理元素尺寸超过容器的情况。 `overflow`可取属性有四种：visible，hidden，scroll，auto

- visible：不裁减溢出内容
- hidden：隐藏溢出内容
- scroll：隐藏溢出内容，但有一个滚动条
- auto：发生溢出时才有滚动条，无溢出不滚动

## js动画例子

### 跟着鼠标走的动画

```html
    <style>
        #img{
            position: absolute;
        }
        body{
            height: 1000px;
            width: 1000px; 
        }
    </style>
</head>
<body>
<img id="img" src="这里插入图片地址" alt=""> 
<script>

var img=document.getElementById("img");
document.onmousemove = function(event){
  //解决兼容问题
    event = event||window.event;
    //获取鼠标的坐标
    //client可见窗口坐标
    // var X=event.clientX;
    // var Y=event.clientY;
    //div的偏移量是相对于整个页面的
    // var X=event.pageX;//IE8不适用
    // var Y=event.pageY;

    var X=event.clientX;
    var Y=event.clientY;
    //设置图片坐标
    img.style.left=X+sl+"px";
    img.style.top=Y+st+"px";
}
</script>
</body>
```

### 匀速移动代码

```html
 <style>
    * {
      margin: 0;
      padding: 0;
    }
 
    div {
      margin-top: 20px;
      width: 200px;
      height: 100px;
      background-color: green;
      position: absolute;
      left: 0;
      top: 0;
    }
  </style> 
<body>
<input type="button" value="移动到400px" id="btn1"/>
<input type="button" value="移动到800px" id="btn2"/>
<div id="dv">
  <script src="common.js"></script>
  <script>
    //点击按钮移动div
 
    my$("btn1").onclick = function () {
      animate(my$("dv"), 400);
    };
    my$("btn2").onclick = function () {
      animate(my$("dv"), 800);
    };
 
    //匀速动画
    function animate(element, target) {
      //清理定时器
      clearInterval(element.timeId);
      element.timeId = setInterval(function () {
        //获取元素的当前位置
        var current = element.offsetLeft;
        //移动的步数
        var step = 10;
        step = target > current ? step : -step;
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
          element.style.left = current + "px";
        } else {
          clearInterval(element.timeId);
          element.style.left = target + "px";
        }
      }, 20);
    }
      
    function my$(id) {
        return document.getElementById(id);
    }
  </script>
</div>
</body>

```

### 变速移动代码

```html
<script>
    //点击按钮移动div
 
    my$("btn1").onclick = function () {
      animate(my$("dv"), 400);
    };
    my$("btn2").onclick = function () {
      animate(my$("dv"), 800);
    };
 
    //变速动画
    function animate(element, target) {
      //清理定时器
      clearInterval(element.timeId);
      element.timeId = setInterval(function () {
        //获取元素的当前位置
        var current = element.offsetLeft;
        //移动的步数
        var step = (target-current)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        current += step;
        element.style.left = current + "px";
        if(current==target) {
          //清理定时器
          clearInterval(element.timeId);
        }
       
      }, 20);
    }
    
    function my$(id) {
        return document.getElementById(id);
    }
  </script>
```





## @keyframes制作动画

以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。

0% 是动画的开始时间，100% 动画的结束时间。

为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

**不同浏览器需要查一下**

语法：

```css
@keyframes animationname {keyframes-selector {css-styles;}}
```

### 向下移动

```html
<style> 
@keyframes mymove
{
from {top:0px;}
to {top:200px;}
}

.element{
	animation-name: mymove;
    animation-duration: 0.4s}
</style>
```

### 在一个动画中改变多个 CSS 样式

```css
@keyframes mymove
{
0%   {top:0px; background:red; width:100px;}
100% {top:200px; background:yellow; width:300px;}
}
```

### 带有多个 CSS 样式的多个 keyframe 选择器

```css
@keyframes mymove
{
0%   {top:0px; left:0px; background:red;}
25%  {top:0px; left:100px; background:blue;}
50%  {top:100px; left:100px; background:yellow;}
75%  {top:100px; left:0px; background:green;}
100% {top:0px; left:0px; background:red;}
}
```