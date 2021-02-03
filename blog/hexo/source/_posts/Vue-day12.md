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

### 模板项目的结构

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