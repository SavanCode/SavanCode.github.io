---
title: improve js code
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-23 21:18:59
password:
summary: javascript的代码优化 
tags: JS
categories: JS
---

## js从css抽离出来

## css 从js中抽离出来

## 减少全局变量

## 事件处理

### 隔离应用逻辑

将应用逻辑从所有事件处理程序中抽离出来是一种最佳实践

```js
//不好的做法
function handleClick(event){
  var popup = document.getElementById('popup');
  popup.style.left = event.clientX + 'px';
  popup.style.top = event.clientY + 'px';
  popup.className = 'reveal';
}
addListener(element,'click',handleClick);

//好的做法
var MyApplication = {
  handleClick: function(event){
    this.showPopup(event);
  },
  showPopup: function(event){
    var popup = document.getElementById('popup');
    popup.style.left = event.clientX + 'px';
    popup.style.top = event.clientY + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```

### 不要分发事件对象

让事件处理程序使用event对象来处理事件，然后拿到所有需要的数据传给应用逻辑

```js
//改进的做法
var MyApplication = {
  handleClick: function(event){
    this.showPopup(event.clientX,event.clientY);
  },
  showPopup: function(x,y){
    var popup = document.getElementById('popup');
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```

当处理事件时，最好让事件程序成为接触到event对象的唯一的函数。

```js
//改进的做法
var MyApplication = {
  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.showPopup(event.clientX,event.clientY);
  },
  showPopup: function(x,y){
    var popup = document.getElementById('popup');
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.className = 'reveal';
  }
};
addListener(element,'click',function(event){
  MyApplication.handleClick(event);
});
```

## 配置数据

关键数据从代码抽离

1. URL
2. 需要展现给用户的字符串
3. 重复的值
4. 配置项
5. 任何可能发生变更的值

将配置数据保存在了config对象中，config对象的每个属性都保存了一个数据片段，每个属性名都有前缀，用以表明数据的类型(MSG表示展现给用户的信息，URL表示网络地址，CSS表示这是一个className)。当然，也可以将整个config对象放到单独的文件中，这样对配置数据的修改可以完全和使用这个数据的代码隔离开来

```js
//好的做法
var config = {
  MSG_INVALID_VALUE: 'Invalid value',
  URL_INVALID:'/errors/invalid.php',
  CSS_SELECTED:'selected'
}
function validate(value){
  if(!value){
    alert(config.MSG_INVALID_VALUE);
    location.href=config.URL_INVALID;
  }
}
function toggleSelected(element){
  if(hasClass(element,config.CSS_SELECTED)){
    removeClass(element,config.CSS_SELECTED);
  }else{
    addClass(element,config.CSS_SELECTED);
  }
}
```

## 选择器优化

```js
//好的做法app.Eles = {
    widgetDiv: ".left-widget div",
    inputResize: '.input-resize',
    hr: '.hr',
    txt: '.input-group-btn button',
    cus: '#paper-type-cus',
    hid: '#hidden',
    mainCon: '#mainCon',
    rulerX: '.ruler-x',
    rulerY: '.ruler-y',
};
```

## 函数优化

　1、避免出现超大函数

　2、独立出来的函数有助于代码复用

　3、独立出来的函数更容易被覆写

　4、独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用

```js
var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        console.log( 'userId: ' + data.userId );
        console.log( 'userName: ' + data.userName );
        console.log( 'nickName: ' + data.nickName );
    });
};
//改成：
var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        printDetails( data );
    });
};
var printDetails = function( data ){
    console.log( 'userId: ' + data.userId );
    console.log( 'userName: ' + data.userName );
    console.log( 'nickName: ' + data.nickName );
};
```

另外注意

- 减少参数量（同一对象信息，就用对象传送）

## 条件优化

- 合并条件，避免重复代码
- 条件语句过长，写成函数，名字容易懂
- 避免条件分支嵌套

## 循环优化

- 合理使用循环 ， 避免多重循环

## 函数防抖与节流 （input 优化）

函数防抖和节流区别在于

- 函数防抖的情况下，函数将一直推迟执行，造成不会被执行的效果；
- 函数节流的情况下，函数将每隔 n 秒执行一次

> 节流防抖就好比乘电梯，比如delay(等待)是10秒，那么防抖就是电梯每进来一个人就要等10秒再运行，而节流就是电梯保证每10秒可以运行一次
> 它和防抖动最大的区别就是，节流函数不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。


https://juejin.cn/post/6844904176359587854#heading-18