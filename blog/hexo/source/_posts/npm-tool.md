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
- avue-form——表单设计生成器 （行内的问题有点小多 尽量弹窗式）
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
常用的就摘抄下来了

```js
//转为ms 
Date.parse(item.originTime)
//format
moment(startTime).format('YYYY-MM-DD')
```

### 当前日期后20天

```javascript
let now = moment('2018-12-14').add(20, 'day').format('YYYY-MM-DD');
console.log(now);
// 输出 2019-01-03
```

### diff计算两个日期差

```javascript
let diff = moment('2019-01-03').diff(moment('2018-12-14'));
console.log(diff);
// 1728000000 单位是毫秒
```

### diff时间差格式化

```javascript
let starttime = '2018-12-14 18:00';
let endtime = '2018-12-15 10:22';
var totalMinute = moment(endtime).diff(starttime) / (1000 * 60),
  hours = Math.floor(totalMinute / 60),
  minute = totalMinute % 60,
  result = '';

if(hours > 0){
  result = result + hours + '小时';
}

if(minute > 0){
  result = result + minute + '分钟';
}
console.log(result);
// 16小时22分钟
```

### 两个日期比较

```javascript
// 是否之前
moment('2018-10-20').isBefore('2018-12-31', 'year'); // false
moment('2018-10-20').isBefore('2019-01-01', 'year'); // true
moment('2018-10-20').isBefore('2019-01-01'); // true

// 是否之后
moment('2010-10-20').isAfter('2010-01-01', 'year'); // false
moment('2010-10-20').isAfter('2009-12-31', 'year'); // true

// 是否相同
moment('2010-10-20').isSame('2009-12-31', 'year');  // false
moment('2010-10-20').isSame('2010-01-01', 'year');  // true
moment('2018-01-01').isSame('2018-01-01');  // true

// 是否是闰年
moment([2000]).isLeapYear() // true
moment([2001]).isLeapYear() // false
```