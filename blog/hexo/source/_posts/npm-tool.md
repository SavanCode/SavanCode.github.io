---
title: npm tool 小总结
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-02 01:31:47
password:
summary: npm tool 小总结
tags: Npm Tool
categories: Npm Tool
---

记录一下遇到的Npm tool, 主要是很容易忘记名字 ( _╯□╰ )_

## [Avue](https://avuejs.com/)

Avue.js是基于现有的element-ui库进行的二次封装，简化一些繁琐的操作，核心理念为数据驱动视图,主要的组件库针对table表格和form表单场景，同时衍生出更多企业常用的组件，达到高复用，容易维护和扩展的框架，同时内置了丰富了数据展示组件，让开发变得更加容易。

- avue-data——数据大屏源码
- avue-doc——官网文档源码
- avue-form——表单设计生成器
- avue-crud——表格设计生成器

Avue采用[Element框架](https://element.eleme.cn/#/zh-CN/), 主要提供了入场动画，时间格式化，大数据的图表展示，还有图表组件

[官方文档](https://avuejs.com/doc/installation)

## gemini-scrollbar

[官方文档](https://noeldelgado.github.io/gemini-scrollbar/)

## MomentJS

[官方文档](https://momentjs.com/)

```js
import moment from 'moment'
```
```js
//转为ms 
Date.parse(item.originTime)
//format
moment(startTime).format('YYYY-MM-DD')
```