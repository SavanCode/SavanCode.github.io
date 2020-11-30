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

## 动画例子

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

