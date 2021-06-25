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

## [vue-echarts](https://ecomfe.github.io/vue-echarts/)

暂时还没有成功完成自己的练习 fixing~~

```
$ npm install echarts vue-echarts
```
```js
用 npm 与 Vue Loader 基于 ES Module 引入（推荐用法）
import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)
```
⚠️ 注意事项
引入源码版本
Vue-ECharts 默认在 webpack 环境下会引入未编译的源码版本，如果你正在使用官方的 Vue CLI 来创建项目，可能会遇到默认配置把 node_modules 中的文件排除在 Babel 转译范围以外的问题。请按如下方法修改配置：

当使用 Vue CLI 3+ 时，需要在 vue.config.js 中的 transpileDependencies 增加 vue-echarts 及 resize-detector，如下：
```js
// vue.config.js
module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
```
当使用 Vue CLI 2 的 webpack 模板时，需要按下述的方式修改 build/webpack.base.conf.js：
```js
{
test: /\.js$/,
loader: 'babel-loader',
-       include: [resolve('src'), resolve('test')]
+       include: [
+         resolve('src'),
+         resolve('test'),
+         resolve('node_modules/vue-echarts'),
+         resolve('node_modules/resize-detector')
+       ]
}
```
如果你正直接配置使用 webpack，那么也请做类似的修改使其能够正常工作。
## echart 多用这个！

[教程1](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/chart.html#demo) [官方快速上手 ](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)  [ECharts 基础概念概览](https://echarts.apache.org/zh/tutorial.html#ECharts%20%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5%E6%A6%82%E8%A7%88)    [总体可视化样式](https://echarts.apache.org/examples/zh/index.html)

```sh
yarn add echarts
npm install echarts
```

1. 引入 echarts:

- 全部引入:

```
import echarts from 'echarts'; // 方便, 但是也同时引入了很多不需要的组件
```

- 按需引入:

```
import echarts from 'echarts/lib/echarts'; // 引入基本模板
import bar from 'echarts/lib/chart/bar';   // 引入柱状图组件
```

2. 基于准备好的 DOM，初始化 Echarts 实例

3. 设置 Echarts 图表数据

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

## 网页编码转换
中文的网站乱码
有些老版网页，会用到 charset="gb2312" 或者"gdk"， 可以使用npm中的 iconv-lite
```sh
npm install iconv-lite --save
```

## Json server

json server 是能快速启动server，提供restful API 支持

这里我们命名前面给两条横线，原因是为了表明这个文件是暂时的

![](npm-tool\image-20210625154440848.png)