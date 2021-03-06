---
title: antv/l7-maps L7 地理空间数据可视分析引擎
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-01 14:18:19
password:
summary: L7 地理空间数据可视分析引擎
tags: [Npm Tool,Map]
categories: Npm Tool
---

## L7 空间数据可视分析

蚂蚁金服 AntV 数据可视化团队推出的基于 WebGL 的开源大规模地理空间数据可视分析开发框架

> 对于整体而言，antv不如echarts全面，但参照了部分echarts的api借口，在使用过程能看到和echarts类似的api和相似的功能,但是适合快速开发节奏，让前端程序员在除了echarts以外还可以多一种选择。

## 正确认识antv

antv其实提供了很多图表和地图框架

- G2（就是图表渲染，条形图，饼图，折线图等，里面有一些比较好看的图表设计，可以直接拿来用。）
  G2地址 https://g2.antv.vision/zh/examples/gallery

  这里不想折腾了 但是可以看看 https://chartcube.alipay.com/guide 下次做笔记把

- G6 (思维导图，流程展示，树状图，)
  G6地址 https://g6.antv.vision/zh/examples/tree/compactBox

- F2 （针对移动端图表进行适配）
  F2地址 https://f2.antv.vision/zh/examples/candlestick/basic

- L7（地图，支持全球，全国（目前只支持中国），省，市，）
  L7地址 https://l7.antv.vision/zh/examples/gallery 

## 安装使用 

```sh
npm i  @antv/l7-maps @antv/l7
```

- 如果你需要卫星地图，可能还需要装个包：

```sh
@antv/l7-draw
```

## 例子

https://codesandbox.io/s/laughing-fermat-fjy5y?file=/index.html:491-499