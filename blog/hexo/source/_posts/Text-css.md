---
title: Text css
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-12 20:49:36
password:
summary:
tags:  css&html
categories:  Front-end
---

# 文字变化 

###  文字阴影：text-shadow

### 文字模糊： transition: 1s ; + text-shadow

//transition的用法很多 只要是变更原先位置的基本都有关

### 文字方向： direction & unicode-bidi 

### word-spacing属性

- 设置元素内单词(以空格为判断是否为单词)之间的间距.
- 取值: px和em(正负值都可以).

### letter-spacing属性

- 设置元素内字母之间的间距.
- 取值: px和em(正负值都可以).

### text-transform属性

 设置元素内文本的大小写.

```
text-transform: capitalize(首字母大写)| uppercase(大写)| lowercase(小写) | none(默认效果);
```

### text-decoration属性

设置元素内文本的装饰

```
text-decoration: underline(下划线) overline(上划线) line-through(类似删除线)  none(默认效果).
```

### text-indent属性

text-indent 属性规定文本块中首行文本的缩进:

### 溢出的文字省略号显示

> 注意： display要是block

#### white-space强制一行显示

  设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容.

```
/*默认处理方式*/
white-space:normal ；

white-space:nowrap ；
/*强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。*/
```

#### text-overflow 文字溢出

- 设置或检索是否使用一个省略标记（…）**表示对象内文本的溢出.**
- 首先强制一行内显示，再次和overflow属性 搭配使用.

```
/*不显示省略标记（...），而是简单的裁切 */
text-overflow : clip ；

/* 当对象内文本溢出时显示省略标记（...）*/
text-overflow：ellipsis ；
```