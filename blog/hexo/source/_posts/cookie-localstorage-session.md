---
title: cookie localStorage和sessionStorage 三者之间的区别以及存储、获取、删除等使用方式
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-17 15:21:52
password:
summary:
tags: css&html
categories: Front-end
---

前端本地存储的方式有三种，分别是cookie，localstorage和sessionStorage 

## 使用方式

### cookie

```js
//保存cookie的值 
var dataCookie='110';
    document.cookie = 'token' + "=" +dataCookie; 

//获取指定名称的cookie值
function getCookie(name) { 
// (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
if(arr != null) {
  console.log(arr);
  return unescape(arr[2]);
}
return null;
}
 var cookieData=getCookie('token'); //cookie赋值给变量。
```

### localStorage和sessionStorage:

```js
var name='sessionData';
var num=120;
sessionStorage.setItem(name,num);//存储数据
sessionStorage.setItem('value2',119);
let dataAll=sessionStorage.valueOf();//获取全部数据
console.log(dataAll,'获取全部数据');
var dataSession=sessionStorage.getItem(name);//获取指定键名数据
var dataSession2=sessionStorage.sessionData;//sessionStorage是js对象，也可以使用key的方式来获取值
 console.log(dataSession,dataSession2,'获取指定键名数据');
sessionStorage.removeItem(name); //删除指定键名数据
  console.log(dataAll,'获取全部数据1');
 sessionStorage.clear();//清空缓存数据：localStorage.clear();
  console.log(dataAll,'获取全部数据2');  
```

## 三者的异同

### 生命周期：

cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

localStorage：除非被手动清除，否则将会永久保存。

sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

### 存放数据大小：

cookie：4KB左右

localStorage和sessionStorage：可以保存5MB的信息。

### http请求：

cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

### 易用性：

cookie：需要程序员自己封装，源生的Cookie接口不友好

localStorage和sessionStorage：源生接口可以接受，亦可再次封装来对Object和Array有更好的支持

## 应用场景：

### cookies

- 浪费宽带（每次http请求都会携带cookie信息）
- 限制多（还需要指定作用域，不可以跨域调用）

但是：识别用户登录来说，cookie还是比stprage更好用的。其他情况下，可以使用storage，就用storage。

### localStorage和sessionStorage

localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息。localStorage可以用来夸页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。

 

Reference：

https://juejin.im/post/6844903516826255373#heading-13