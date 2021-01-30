---
title: 区别伪元素before after
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-15 23:28:40
password:
summary: 伪元素
tags:  css&html
categories: Front-end
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

## 注意点

1）**伪元素即伪类，它是一个元素的子元素**，*其意思就是说，我们无法用JS获取到这些伪元素，*我们*无法通过JS对其进行增、删、改，所以这也是它们的优点，因为它们不会增加JS查询DOM的负担，即对于JS来说伪元素是透明的。然后因为它们也不是实际的HTML标签，所以可以加快浏览器加载HTML文件，对SEO也有帮助*（SEO  搜索引擎优化）。

2）**如果我们把伪类的样式有absolute定位的话会把伪类强制变成块级元素**，*伪类本身是行内元素的。*

3）**img、input和其他的单标签是没有after和before伪元素的，因为单标签本身不能有子元素**。