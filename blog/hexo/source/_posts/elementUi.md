---
title: elementUi 的踩坑
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-25 23:57:22
password:
summary: elementUI练习以及问题总结
tags: [elementUI,Vue,scss]
categories: Vue
---

记录一下个人练习遇到的问题~ 不是完整的学习笔记

## 基本的使用

安装并使用Element UI

```sh
npm i element-ui -S
```

修改 /src/main.js 为：

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
```

[Element for Vue 安装文档](https://element.eleme.cn/#/zh-CN/component/installation)

基于 Vue.js

步骤: 先布局 -> 然后插入模板 -> 注意下面的值

[基础教程](https://wdd.js.org/vue-vue-router-elementui-stupid-simple-dashboard.html)

## 关于组件之间的布局

要注意利用本身的el-col 以及el-row 还有span来控制组合宽度(这里默认是24)

## 整体布局

善于利用[布局容器](https://element.eleme.cn/#/zh-CN/component/container)进行快速布局

## 关于elementUI Vue scss的全局引入方法

1. styles文件夹内声明一个your.scss文件

2. 添加依赖

```
   npm install sass-resources-loader --save-dev
```
3. 修改build/utils.js

```js
scss: generateLoaders('sass').concat(
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/styles/your.scss')
        }
      }
    )
```

4. 记得一定要重新运行文件~~

## element UI icon

[手册](https://www.elementscss.com/css.aspx?css=icons)
[官方](https://element.eleme.cn/#/zh-CN/component/icon)

## 推荐练习

https://github.com/PanJiaChen/vue-admin-template

## Reference

[vue中引入scss样式变量，并在全局使用](https://blog.csdn.net/m0_46156566/article/details/111387130)