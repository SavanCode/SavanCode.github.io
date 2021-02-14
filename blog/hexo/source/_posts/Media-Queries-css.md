---
title: Media Queries-css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-14 12:42:27
password:
summary: Media Query-css
tags: css&html
categories: css&html
---

目的：因为不同的设备，萤幕宽度不同，显示的要求不一样

需要灵活设置

```css
@media (min-width: 320px) and (max-width: 525px){  .Gool{    
    /*background-color: orange;*/    
    margin-right: 3%;    
    margin-left: 3%;    
    margin-bottom: 50px;  }  
    #copyright{    padding: 0 3%;  }
}
@media  (min-width: 526px) and (max-width: 991px){  .Gool{    
    margin-right: 20%;    
    margin-left: 20%;    
    margin-bottom: 50px;  }
}
```

@media (min-width:320px) and (max-width:525px)
表示在萤幕宽度320px~525px之间执行

@media (min-width:526px) and (max-width:991px)
表示在萤幕宽度526px~991px之间执行

and：代表与的意思,一般用and来连接媒体类型个媒体属性
only：和浏览器兼容性有关。

老版本的浏览器只支持媒体类型，不支持带媒体属性的查

@media screen{}
@media only{}

（,）：代表或的意思
not:取反