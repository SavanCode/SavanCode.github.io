---
title: Vue day12 Vue脚手架
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-03 13:15:02
password:
summary: Vue脚手架
tags: Vue
categories: Vue
---

## 使用vue-cli 创建模板项目

###  说明
vue-cli 是vue 官方提供的脚手架工具
github: https://github.com/vuejs/vue-cli
作用: 从 https://github.com/vuejs-templates 下载模板项目

### 创建vue 项目
npm install -g vue-cli
vue init webpack myvue
cd myvue
npm install
npm run dev
访问: http://localhost:8080/

注释：

"vue init webpack vue_demo"中的"webpack"为固定的，即使使用webpack作为模板，提供六套模板。"vue_demo"为自起的项目名称，不可以包含大写字母。
官方文档：https://github.com/vuejs/vue-cli/tree/master

### 创建项目的选择

![](Vue-day12/image-20210206222511498.png)



### 拓展 关于选项中  render函数的使用 & npm run build 详解执行意义  & npm run dev 执行意义 

这里可以参考资料 https://blog.csdn.net/weixin_43342105/article/details/106248521

|-- build : webpack 相关的配置文件夹(基本不需要修改)
|-- dev-server.js : 通过express 启动后台服务器
|-- config: webpack 相关的配置文件夹(基本不需要修改)
|-- index.js: 指定的后台服务的端口号和静态资源文件夹
|-- node_modules
|-- src : 源码文件夹
|-- components: vue 组件及其相关资源文件夹
|-- App.vue: 应用根主组件
|-- main.js: 应用入口js
|-- static: 静态资源文件夹
|-- .babelrc: babel 的配置文件
|-- .eslintignore: eslint 检查忽略的配置
|-- .eslintrc.js: eslint 检查的配置
|-- .gitignore: git 版本管制忽略的配置
|-- index.html: 主页面文件
|-- package.json: 应用包配置文件
|-- [README.md](http://readme.md/): 应用描述说明的readme 文件

## 理解架构的链接运行

> 如果学过react的基本这里就很好理解，因为是一样的组件式开发，然后通过 export import ，main.js内引用好，index.html就可以直接用

![](Vue-day12/image-20210207133744445.png)

![](Vue-day12/image-20210207133844473.png)

所以整个结构是很清晰的， 如果还是蒙，那先滚回去把component看明白

**从前面到这里，就可以开始做两到三个基本的练习： 类似todo App 或者带有 删减增的网页**

## 补充说明的命令行

### vue serve

启动一个服务并运行原型

```sh
vue serve Hello.vue
```

## 处理资源路径

**转换规则**

如果 URL 是一个绝对路径 (例如 /images/foo.png )，它将会被保留不变。

```html
<img alt="Vue logo" src="/assets/logo.png"> 
<img alt="Vue logo" src="http://image.xx.com/logo.png">
```

如果 URL 以 . 开头会作为一个相对模块请求被解释并基于文件系统相对路径

```html
<img alt="Vue logo" src="./assets/logo.png">
```

如果 URL 以 ~ 开头会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源

```html
<img src="~some-npm-package/foo.png">
```

如果 URL 以 @ 开头会作为一个模块请求被解析。Vue CLI 默认会设置一个指向 src 的别名 @ 

```js
import Hello from '@/components/Hello.vue'
```



## 何时使用public 文件夹

### 通过 webpack 的处理并获得如下好处

脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。

文件丢失会直接在编译时报错，而不是到了用户端才产生 404 错误。

最终生成的文件名包含了内容哈希，因此你不必担心浏览器会缓存它们的老版本。

### 如下情况考虑使用public文件夹

你需要在构建输出中指定一个固定的文件名字。

你有上千个图片，需要动态引用它们的路径。

有些库可能和 webpack 不兼容，除了将其用一个独立的` <script>` 标签引入没有别的选择。

### 使用public文件夹的注意事项

如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀

```js
// vue.config.js 
module.exports = { 
publicPath: process.env.NODE_ENV === 'production' ? '/cart/' : '/' 
}
```

在 public/index.html 等通过 html-webpack-plugin 用作模板的 HTML 文件中，你需要通过`<%= BASE_URL %>` 设置链接前缀

``` html
<link rel="icon" href="<%= BASE_URL %>favicon.ico"> 
```

在模板中，先向组件传入`BASE_URL`

```js
data () { 
    return { 
    	publicPath: process.env.BASE_URL 
    } 
}
```

```html
<img :src="`${publicPath}my-image.png`">
```

## Vue CSS相关

### 引入外部CSS文件

#### @import引入外部css

##### 步骤一：在入口js文件main.js中引入

```js
import Vue from 'vue'
import App from './App' // 引入App这个组件
import router from './router' /* 引入路由配置 */
import axios from 'axios'
import '../static/css/global.css' /*引入公共样式*/
```

##### 步骤二：作用域是全局

```css
<style scoped>
/*这里仍然全局！！！！*/
/*如果在app.vue中引入，但是这样引入有一个问题，就是在 index.html的HEADH上会多出一个空的<style></style>*/
@import "../static/css/user.css";
@import url("cssLink");
.user-content{
  background-color: #3982e5;
}
</style>
```

##### 步骤二：作用域是组件

```css
/*这里就是局部的了*/
<style scoped src="../static/css/user.css">
<style scoped>
.user-content{
  background-color: #3982e5;
}
</style>
```

> 在生产环境中不要使用@import引入css，因为在请求到的css中含有@import引入css的话，会发起请求把@import的css引进来，多次请求浪费不必要的资源。

#### 使用link来调用外部的css文件

head放置`<link rel="stylesheet" href="wcss.css" type="text/css" />`来调用外部的wcss.css文件来实现html引用css文件




### 使用预处理器

如果创建项目时没有选择需要的预处理器（Sass/Less/Stylus），则需手动安装相应loader

```sh
# Sass 
npm install -D sass-loader node-sass 
# Less 
npm install -D less-loader less 
# Stylus 
npm install -D stylus-loader stylus
```

```css
<style scoped lang="scss"> 
    $color: #42b983; 
    a { 
    color: $color; 
    } 
</style>
```

### 自动化导入样式

自动化导入样式文件 (用于颜色、变量、mixin等)，可以使用 style-resources-loader

```sh
npm i -D style-resources-loader
```

```js
const path = require('path') 
function addStyleResource(rule) { 
rule.use('style-resource') 
    .loader('style-resources-loader') 
    .options({ 
    patterns: [ 
    	path.resolve(__dirname, './src/styles/imports.scss'), 
    	], 
	})
}
module.exports = { 
    chainWebpack: config => { 
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'] 	
        types.forEach(type =>     
                      addStyleResource(config.module.rule('scss').oneOf(type))) 	}, 
}
```

### Scoped CSS

当 `<style> `标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。

```css
<style scoped> 
.red { 
	color: red; 
}</style>
```

其原理是通过使用 PostCSS 来实现以下转换

```html
<template> 
<div class="red" data-v-f3f3eg9>hi</div> 
</template> 
<style> 
.red[data-v-f3f3eg9] { 
	color: red; 
}</style>
```

### 混用本地和全局

```css
<style> 
/* 全局样式 */ 
</style> 
<style scoped> 
/* 本地样式 */ 
</style>
```

### 深度作用选择器

使用 `>>>` 操作符可以使 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响

子组件

```css
<style scoped> 
#app >>> a { color: red }
</style>
```

Sass 之类的预处理器无法正确解析 >>> 。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符

取而代之

```css
<style scoped lang="scss"> 
#app { 
	/deep/ a { 
		color: rgb(196, 50, 140) 
	}
	::v-deep a { 
		color: rgb(196, 50, 140) 
	} 
}</style>
```

### CSS Module

CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。 vue-loader 提供了与 CSS Modules 的

一流集成，可以作为模拟 scoped CSS 的替代方案。

添加module

```css
<style module lang="scss"> 
.red { 
	color: #f00; 
}
.bold { 
	font-weight: bold; 
}
</style>
```

模板中通过$style.xx访问

```html
<a :class="$style.red">awesome-vue</a> 
<a :class="{[$style.red]:isRed}">awesome-vue</a> 
<a :class="[$style.red, $style.bold]">awesome-vue</a>
```

JS中访问

```html
<script> 
export default { 
	created () { 
	// -> "red_1VyoJ-uZ" 
	// 一个基于文件名和类名生成的标识符 
	console.log(this.$style.red) 
		} 
	}
</script>
```

### 数据访问相关 

#### 数据模拟

使用开发服务器配置before选项，可以编写接口，提供模拟数据。

```js
devServer:{ 
	before(app) { 
		app.get('/api/courses', (req, res) => { 
			res.json([{ name: 'web全栈', price: 8999 }, { name: 'web高级', price: 8999 }])
		}) 
	} 
}
```

调用

```js
import axios from 'axios' 
export function getCourses() { 
    return axios.get('/api/courses').then(res => res.data) 
}
```

#### 代理

设置开发服务器代理选项可以有效避免调用接口时出现的跨域问题

```
devServer: { proxy: 'http://localhost:3000' }
```

测试接口

```js
// 需要安装express：npm i express 
const express = require('express') 
const app = express() 
app.get('/api/courses', (req, res) => { 
	res.json([{ name: 'web全栈', price: 8999 }, { name: 'web高级', price: 8999 }]) })
app.listen(3000)
```





## 拓展 

无意中发现的 [vue.js examples](https://vuejsexamples.com/) 



## Reference

 https://blog.csdn.net/weixin_43342105/article/details/106248594