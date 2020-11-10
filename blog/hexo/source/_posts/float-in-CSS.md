---
title: float in CSS
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-10 18:42:31
password:
summary:
tags: css&html
categories:
---

## Float 

- float:  left, right, none, inherit
- 將原本上下排列的元素改成左右排列
- 要用margin保持間距，不然會黏再一起



![](float-in-CSS/1605005179649.png)



![](float-in-CSS/1605005159222.png)



## Clear

- clear:  left, right, none, inherit

- float會造成文繞圖，clear可以讓清掉不需要文繞圖的地方。

  ![](float-in-CSS/1605005686175.png)

## The clearfix Hack

```css
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
```

![](float-in-CSS/1605008030674.png)



Reference:   https://www.w3schools.com/css/css_float.asp