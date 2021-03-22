---
title: uniapp 实操总结
top: false
cover: false
toc: true
mathjax: true
date: 2021-03-22 19:07:36
password:
summary:  uniapp 实操总结
tags: uniapp 
categories: uniapp 
---

## 将view做成正圆形

uni本身已经有专门获取dom元素的API了，官方文档在此 [节点信息](https://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery)。

```
<view class="photo-user" :style="{ height: photoStyleHeight }"></view>
```

```js
export default {
 data() {
  return {
   photoStyleHeight: ''
  };
 },
 onLoad() {

 },
onReady:function(){
  //返回一个SelectorQuery对象实例。可以在这个实例上使用select等方法选择节点，并使用boundingClientRect等方法选择需要查询的信息。
  const query = uni.createSelectorQuery();
  let that = this;
  /*
  select()方法：在当前页面下选择第一个匹配选择器selector的节点，返回一个节点对象实例，可以用于获取节点信息。
  boundingClientRect()方法：添加节点的布局位置的查询请求，返回参数为该节点的所有信息
  */
  query.select('.class').boundingClientRect(data=>{ //这里必须写成data=>，而不能写成function(data)
   console.log(data.width);
   that.photoStyleHeight=data.width+'px';
  }).exec();
 },
 methods: {

 }
};
```