---
title: button-css
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-19 20:28:21
password:
summary: button的样式实践总结
tags: [css&html,botton]
categories: css&html
---

## 按钮左边是圆角,右边是方角

### 左边是圆角,右边是方角
```css
.left_radius{
border-top-left-radius: 6px;
border-top-right-radius: 0px;
border-bottom-left-radius: 6px;
border-bottom-right-radius: 0px;

}
```
###  右边是圆角,左边是方角
```css
.right_radius{
border-top-left-radius: 0px;
border-top-right-radius: 6px;
border-bottom-left-radius: 0px;
border-bottom-right-radius: 6px;
}
```
### 全是方角
```css
.no_radius{
border-radius:0px;
}
```

## button 多个对齐

```css
.btnDiv{
   display: flex;
   align-items: center;  
}  
```

