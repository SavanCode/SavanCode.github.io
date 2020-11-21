---
title: box sizing
top: false
cover: false
toc: true
mathjax: true
date: 2020-11-21 19:59:36
password:
summary:
tags: css&html
categories:
---

# 使用box-sizing布局

## 基本

- `padding` + `border` + `width`= 盒子的宽度
- `padding`+ `border` + `height` = 盒子的高度

## 语法

语法：`box-sizing:` `content-box` | `border-box` | `inherit`;

```css
*{
     margin:0;
      padding:0;
     box-sizing:border-box;
}
```

- content-box：标准盒模型，CSS定义的宽高只包含content的宽高
- border-box：IE盒模型，CSS定义的宽高包括了content，padding和border

 




