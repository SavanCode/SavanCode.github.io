---
title: 区别伪元素before after
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-15 23:28:40
password:
summary:
tags:  css&html
categories:
---

# 伪元素

## 基本语法

```css
element:after  { style properties }  /* CSS2 语法 */
element::after { style properties }  /* CSS3 语法 */
```

## 同异

> 同：
> 				::before和::after都是某标签的兄弟节点
>
> 异：
> 				::before 是某标签前的兄弟元素
> 				::after 是某标签后的兄弟元素

## demo

```html
<style> 
p::before {
  content: '我是在p标签前的兄弟元素'
}
p::after {
  content: '我是在p标签前的兄弟元素'
}
</style>
<body>
<p>--我是p标签--</p>
</body>
```

![](before-after/1605604037887.png)

