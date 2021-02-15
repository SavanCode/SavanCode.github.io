---
title: webpack
top: false
cover: false
toc: true
mathjax: true
date: 2021-02-10 14:23:30
password:
summary:
tags: [ Vue , webpack]
categories: [ Vue , webpack]
---

## webpack的重要性

1. Webpack要帮我们压缩、合并常见的静态资源文件；
2. 处理文件的前后依赖关系；
   - webpack如何处理这些依赖关系；
   - webpack内部实现了模块化的机制；（实现模块化的方式，和 Node 中差不多，也是创建了一个模块包装器，把所有的代码都包装起来；）
3. webpack-dev-server：作用帮我们实现在开发阶段中的实时打包编译和刷新浏览器；
4. html-webpack-plugin：把HTML首页自动托管到内存中，自动把打包好的bundle.js路径，以 script 标签 注入到页面中；

## 在网页中会引用哪些常见的静态资源

1. 样式表
   - .css .less .sass .scss
2. Javascript脚本文件
   - .js .ts .coffee
3. 图片
   - .jpg .gif .png .bmp
4. 字体文件（Fonts）
   - .eot .svg .ttf .woff .woff2
5. 模板文件
   - .ejs .vue .jade

## [网页中引入的静态资源多了以后有什么问题？？？](http://doc.cms.liulongbin.top/#/md/day4?id=网页中引入的静态资源多了以后有什么问题？？？)

1. 加载慢：当静态资源多了以后，会发起很多的二次资源请求，这时候，我们的网页加载速度就慢了；
2. 会出现静态资源的前后依赖关系问题；

## [如何解决上述两个问题](http://doc.cms.liulongbin.top/#/md/day4?id=如何解决上述两个问题)

1. 把 图片合并成精灵图、把 CSS 或 JS 合并、压缩 一下；
2. 把图片转为 base64 的编码格式；
3. 可以使用即将学到的webpack去解决静态资源的依赖问题；

## [什么是webpack?](http://doc.cms.liulongbin.top/#/md/day4?id=什么是webpack)

- webpack 是前端项目的构建工具，将来，我们开发的项目，如果想要提高维护性和可控制性的话，尽量选择 webpack 进行构建；
- webpack 非常适合与单页面应用程序结合使用；不太适合与多页面的普通网站结合使用；
- 项目中使用 webpack 有什么好处：
  - 能够处理静态资源的 依赖关系；
  - 能够优化项目代码，比如：压缩合并文件，把图片转为base64编码格式；
  - 能够把高级的语法转为低级的语法；
  - webpack 能够转换一些模板文件； .vue
- 根据官网的图片介绍webpack打包的过程
- [webpack官网](http://webpack.github.io/)



## 	Reference

https://www.bilibili.com/video/BV1cx41147tu

http://doc.cms.liulongbin.top/#/md/day4