---
title: 前端style框架
top: false
cover: false
toc: true
mathjax: true
date: 2021-01-10 16:48:07
password:
summary: 前端Style 收集
tags: [React,UI,Vue]
categories: UI
---

React Style : Bootstrap , Material-UI

## [Material-UI](https://material-ui.com/zh/getting-started/installation/)

```sh
// 用npm安装
npm install @material-ui/core
```

自己练习 - clock


## [Ant Design of React](https://ant.design/components/overview-cn/)

基于 React.js

## [Echart](https://echarts.apache.org/zh/index.html)

[推荐教程](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/chart.html#demo)

### 使用方式

1. 直接生成为component图表 js文件

2. init方式 直接引用component

   **文字描述不清楚，可以直接看admin library中例子**

[github](https://github.com/apache/incubator-echarts)

常见问题："export 'default' (imported as 'ECharts') was not found in 'echarts/lib/echarts.js'

解决办法：

1. 引入echarts的地方改为

```jsx
import * as echarts from 'echarts' // 如果不这样会爆出warning
```

1. webpack的DefinePlugin里加入如下字段

```sh
// 此处根据情况自行修改，结果为boolean就行，true的情况下会多一些日志信息
'__DEV__': process.env.node_env === 'dev' 
```

或者

```sh
npm un echarts && npm i -E echarts@3.7.2 zrender@3.6.3
```

### 例子

由于实在经常卡住 所以就把例子贴上来了

```vue
<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 600px;height: 400px;"></div>
</template>
<script>
  import * as echarts from 'echarts'
    export default { 
        data () {
            return {
                charts: '',
                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                opinionData:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ]
            }
        },
        methods:{
            drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                   orient: 'vertical',
                   x: 'left',
                   data:this.opinion
                 },
                 series: [
                   {
                     name:'访问来源',
                     type:'pie',
                     radius:['50%','70%'],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: false,
                         position: 'center'
                       },
                       emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '30',
                           fontWeight: 'blod'
                         }
                       }
                     },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.opinionData
                   }
                 ]
               })
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>
 
```

## Vue Echart

有人推荐，但是由于文档非常蛋疼 然后我用的时候经常有问题 um~~~

[使用文档](https://github.com/ecomfe/vue-echarts/blob/main/README.zh-Hans.md)

## [react echarts](https://github.com/hustcc/echarts-for-react)

```sh
npm install echarts-for-react echarts
```

## [Antv](https://antv.vision/zh)

也是很有用的数据可视化

## [Element for Vue](https://element.eleme.cn/#/zh-CN/component/installation)

基于 Vue.js

步骤: 先布局 -> 然后插入模板 -> 注意下面的值

[基础教程](https://wdd.js.org/vue-vue-router-elementui-stupid-simple-dashboard.html)



## [iview  for Vue](https://www.iviewui.com/)

基于 Vue.js··